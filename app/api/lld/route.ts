import { NextRequest, NextResponse } from 'next/server';
import { lldProblems } from '@/data/lldData';

// Rate limit (5 req/min per IP)
const hits = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip) ?? { count: 0, reset: now + 60_000 };
  if (now > entry.reset) { entry.count = 0; entry.reset = now + 60_000; }
  entry.count++;
  hits.set(ip, entry);
  return entry.count > 5;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'local';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Rate limit reached. Try again in a minute.' }, { status: 429 });
  }

  const { problemId, question, mode } = await req.json();
  if (!problemId || !question) {
    return NextResponse.json({ error: 'problemId and question required.' }, { status: 400 });
  }

  const problem = lldProblems.find(p => p.id === problemId);
  if (!problem) {
    return NextResponse.json({ error: 'Problem not found.' }, { status: 404 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Graceful fallback: return a canned answer
    return NextResponse.json({ answer: generateFallbackAnswer(problem, question, mode), fallback: true });
  }

  // Build code context (all files)
  const codeContext = problem.files
    .map(f => `// ── ${f.name} (${f.role}) ──\n${f.content}`)
    .join('\n\n// ─────────────────────────────────────────────\n\n');

  const systemPrompt = `You are an expert software architect reviewing Himanshu Mishra's Low Level Design implementation.
You have the actual source code of his "${problem.name}" implementation.
Your job: answer questions about design decisions, patterns, trade-offs, and implementation details. Always ground your answer in the specific class names, method names, and code patterns from the provided code.
Be concise (3-6 sentences per point), technically precise, and reference actual code symbols.
${mode === 'interview' ? 'You are now in INTERVIEW MODE: ask probing follow-up questions after answering, like a real interviewer would.' : ''}
${mode === 'whatif' ? 'You are in WHAT-IF MODE: propose concrete code-level changes, not just high-level ideas.' : ''}`;

  const userMsg = `Here is the full implementation:\n\n${codeContext}\n\n---\nQuestion: ${question}`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 600,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMsg }],
      }),
    });

    if (!res.ok) throw new Error(`Anthropic error ${res.status}`);
    const data = await res.json();
    const answer = data.content?.[0]?.text ?? 'No response from AI.';
    return NextResponse.json({ answer });
  } catch (err) {
    console.error('LLD AI error:', err);
    return NextResponse.json({ answer: generateFallbackAnswer(problem, question, mode), fallback: true });
  }
}

// ── Smart fallback answers when no API key is set ──────────────────────────
function generateFallbackAnswer(problem: (typeof lldProblems)[0], question: string, _mode?: string): string {
  const q = question.toLowerCase();
  const patternList = problem.patterns.join(', ');

  if (q.includes('pattern') || q.includes('design')) {
    return `This ${problem.name} implementation uses ${patternList}. ${problem.keyClasses.filter(c => c.pattern).map(c => `**${c.name}** demonstrates the ${c.pattern}: ${c.role}.`).join(' ')} The key insight is that each class has a single responsibility, making the system extensible without modification.`;
  }
  if (q.includes('class') || q.includes('explain')) {
    return `The core classes are: ${problem.keyClasses.map(c => `**${c.name}** (${c.role})`).join(', ')}. The execution flow starts at ${problem.flowSteps[0]?.label} and terminates at ${problem.flowSteps[problem.flowSteps.length - 1]?.label}. Each class encapsulates exactly one concern.`;
  }
  if (q.includes('scale') || q.includes('concurrent') || q.includes('thread')) {
    return `For scaling ${problem.name}: the current design is single-node. To distribute, you'd shard data by a consistent hash key, add a write-ahead log for durability, and introduce a coordinator to manage membership. The ${patternList} patterns used here align well with a microservice decomposition.`;
  }
  if (q.includes('tradeoff') || q.includes('why')) {
    return `The design trade-off here is **simplicity vs extensibility**. By programming to interfaces (${patternList}), adding new behaviour requires only a new concrete class, not modifying existing ones. The downside is more classes upfront. This aligns with Open/Closed Principle.`;
  }
  return `${problem.name} uses ${patternList}. The execution flow: ${problem.flowSteps.map(s => s.label).join(' → ')}. Key design decision: ${problem.keyClasses[0]?.name} acts as the ${problem.keyClasses[0]?.pattern ?? 'entry point'}, keeping client code decoupled from implementation details.`;
}
