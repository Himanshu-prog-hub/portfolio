'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lldProblems, type LLDProblem, type LLDFile } from '@/data/lldData';
import {
  FaCode, FaRobot, FaChevronRight, FaPlay, FaQuestionCircle,
  FaBolt, FaProjectDiagram, FaLayerGroup,
} from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';

// ─── Tiny syntax highlighter — proper single-pass tokeniser ──────────────────
// Processes each token exactly once so later passes can't corrupt earlier spans.
const JAVA_KEYWORDS = new Set([
  'public','private','protected','class','interface','extends','implements',
  'import','package','new','return','if','else','while','for','do','switch',
  'case','break','continue','throw','throws','try','catch','finally',
  'void','static','final','abstract','default','synchronized','volatile',
  'transient','native','strictfp','instanceof','this','super','enum','assert',
]);
const JAVA_TYPES = new Set([
  'String','int','long','double','float','boolean','byte','char','short',
  'Map','List','Set','ArrayList','HashMap','LinkedHashMap','ConcurrentHashMap',
  'PriorityQueue','Queue','Deque','LinkedList','HashSet','TreeMap','TreeSet',
  'Optional','Thread','Object','Integer','Long','Double','Boolean','Number',
  'null','true','false','var',
]);

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlight(raw: string): string {
  const out: string[] = [];
  let i = 0;

  while (i < raw.length) {
    // ── Line comment ──
    if (raw[i] === '/' && raw[i + 1] === '/') {
      let j = i;
      while (j < raw.length && raw[j] !== '\n') j++;
      out.push(`<span style="color:#616161;font-style:italic">${esc(raw.slice(i, j))}</span>`);
      i = j;
      continue;
    }
    // ── Block comment ──
    if (raw[i] === '/' && raw[i + 1] === '*') {
      let j = i + 2;
      while (j < raw.length - 1 && !(raw[j] === '*' && raw[j + 1] === '/')) j++;
      j += 2; // consume */
      out.push(`<span style="color:#616161;font-style:italic">${esc(raw.slice(i, j))}</span>`);
      i = j;
      continue;
    }
    // ── String literal ──
    if (raw[i] === '"') {
      let j = i + 1;
      while (j < raw.length && raw[j] !== '"' && raw[j] !== '\n') {
        if (raw[j] === '\\') j++; // skip escaped char
        j++;
      }
      if (j < raw.length) j++; // consume closing "
      out.push(`<span style="color:#f9a825">${esc(raw.slice(i, j))}</span>`);
      i = j;
      continue;
    }
    // ── Annotation (@Override etc.) ──
    if (raw[i] === '@') {
      let j = i + 1;
      while (j < raw.length && /[a-zA-Z0-9_]/.test(raw[j])) j++;
      out.push(`<span style="color:#cf6679">${esc(raw.slice(i, j))}</span>`);
      i = j;
      continue;
    }
    // ── Identifier / keyword / type ──
    if (/[a-zA-Z_$]/.test(raw[i])) {
      let j = i;
      while (j < raw.length && /[a-zA-Z0-9_$]/.test(raw[j])) j++;
      const word = raw.slice(i, j);
      if (JAVA_KEYWORDS.has(word)) {
        out.push(`<span style="color:#bb86fc">${esc(word)}</span>`);
      } else if (JAVA_TYPES.has(word)) {
        out.push(`<span style="color:#03dac6">${esc(word)}</span>`);
      } else {
        out.push(esc(word));
      }
      i = j;
      continue;
    }
    // ── Number ──
    if (/[0-9]/.test(raw[i])) {
      let j = i;
      while (j < raw.length && /[0-9._xXbBfFlL]/.test(raw[j])) j++;
      out.push(`<span style="color:#cf6679">${esc(raw.slice(i, j))}</span>`);
      i = j;
      continue;
    }
    // ── Everything else (operators, punctuation, whitespace) ──
    out.push(esc(raw[i]));
    i++;
  }

  return out.join('');
}

// ─── Chat bubble ─────────────────────────────────────────────────────────────
interface Message { role: 'user' | 'ai'; text: string; timestamp: Date; }

function ChatBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
        ${isUser ? 'bg-purple/30 text-purple' : 'bg-cyan-500/20 text-cyan-400'}`}>
        {isUser ? 'You' : <FaRobot className="w-3.5 h-3.5" />}
      </div>
      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed
        ${isUser
          ? 'bg-purple/15 border border-purple/25 text-white/85 rounded-tr-sm'
          : 'bg-[#141020] border border-white/[0.08] text-white/80 rounded-tl-sm'}`}>
        {msg.text.split('\n').map((line, i) => {
          const formatted = esc(line).replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
          return <p key={i} className={i > 0 ? 'mt-1.5' : ''} dangerouslySetInnerHTML={{ __html: formatted }} />;
        })}
      </div>
    </motion.div>
  );
}

// ─── Execution flow bar ───────────────────────────────────────────────────────
function FlowBar({ problem, onClassClick }: { problem: LLDProblem; onClassClick: (cls: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {problem.flowSteps.map((step, i) => (
        <React.Fragment key={i}>
          <button
            onClick={() => onClassClick(step.classes[0])}
            className="group relative flex flex-col items-start px-3 py-2 rounded-xl border border-white/[0.08]
                       bg-[#141020] hover:border-purple/40 hover:bg-purple/[0.06] transition-all duration-200 text-left"
          >
            <span className="text-[9px] uppercase tracking-widest text-white/30 font-semibold mb-0.5">Step {i + 1}</span>
            <span className="text-xs text-white/70 font-medium">{step.label}</span>
            <span className="text-[10px] text-white/35 mt-0.5">{step.detail.slice(0, 45)}…</span>
          </button>
          {i < problem.flowSteps.length - 1 && (
            <FaChevronRight className="text-purple/30 w-3 h-3 shrink-0" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Main Playground Component ───────────────────────────────────────────────
export default function LLDPlayground() {
  const [selectedProblem, setSelectedProblem] = useState<LLDProblem>(lldProblems[0]);
  const [activeFile, setActiveFile]           = useState<LLDFile>(lldProblems[0].files[0]);
  const [messages, setMessages]               = useState<Message[]>([]);
  const [input, setInput]                     = useState('');
  const [loading, setLoading]                 = useState(false);
  const [activeTab, setActiveTab]             = useState<'chat' | 'flow' | 'patterns'>('chat');
  const [mode, setMode]                       = useState<'explain' | 'interview' | 'whatif'>('explain');
  const [inView, setInView]                   = useState(false);
  const sectionRef      = useRef<HTMLDivElement>(null);
  const chatScrollRef   = useRef<HTMLDivElement>(null); // the scrollable messages container

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Scroll only the chat box — NOT the whole page
  useEffect(() => {
    const el = chatScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  function changeProblem(p: LLDProblem) {
    setSelectedProblem(p);
    setActiveFile(p.files[0]);
    setMessages([]);
    setInput('');
  }

  function handleClassClick(className: string) {
    const file = selectedProblem.files.find(f => f.name.replace('.java', '') === className);
    if (file) setActiveFile(file);
  }

  async function sendMessage(question?: string) {
    const q = (question ?? input).trim();
    if (!q || loading) return;
    setInput('');

    const userMsg: Message = { role: 'user', text: q, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/lld', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemId: selectedProblem.id, question: q, mode }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.answer || data.error, timestamp: new Date() }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Network error. Please try again.', timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  }

  const diffColor = { Medium: 'text-amber-400 border-amber-400/30 bg-amber-400/8', Hard: 'text-rose-400 border-rose-400/30 bg-rose-400/8' };

  return (
    <section ref={sectionRef} id="lld" className="py-20 relative overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* ── Header ── */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-purple font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-purple animate-pulse" />
            Design Thinking · Live Code Walkthrough
          </span>
          <h2 className="heading">
            LLD <span className="text-purple">Playground</span>
          </h2>
          <p className="text-white/40 text-sm mt-3 max-w-xl mx-auto">
            My actual Java LLD implementations. Ask questions, trace execution flows,
            and dig into design decisions. All backed by real code.
          </p>
        </div>

        {/* ── Problem selector ── */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8 px-4">
          {lldProblems.map(p => (
            <motion.button
              key={p.id}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => changeProblem(p)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-semibold transition-all duration-200
                ${selectedProblem.id === p.id
                  ? 'border-purple bg-purple/20 text-white'
                  : 'border-white/[0.05] text-white/50 hover:border-purple/40 hover:text-white/80'}`}
            >
              <FaCode className="w-3 h-3" />
              {p.name.split(' ').slice(0, 3).join(' ')}
              <span className={`text-[9px] px-1.5 py-0.5 rounded border ${diffColor[p.difficulty]}`}>
                {p.difficulty}
              </span>
            </motion.button>
          ))}
        </div>

        {/* ── Main split view ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">

          {/* ── LEFT — Chat panel ── */}
          <div className="flex flex-col gap-4">
            {/* Problem info */}
            <div className="rounded-2xl border border-white/[0.05] bg-[#0D0A18] p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{selectedProblem.name}</h3>
                  <p className="text-white/40 text-xs">{selectedProblem.tagline}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProblem.patterns.map(pat => (
                    <span key={pat} className="text-[9px] px-2 py-0.5 rounded-full border border-purple/25 text-purple/80 bg-purple/5 font-medium">
                      {pat}
                    </span>
                  ))}
                </div>
              </div>
              {/* Key classes quick list */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {selectedProblem.keyClasses.map(kc => (
                  <button
                    key={kc.name}
                    onClick={() => handleClassClick(kc.name)}
                    title={kc.role}
                    className="text-[10px] px-2.5 py-1 rounded-lg border border-white/[0.05] bg-white/[0.03]
                               text-white/50 hover:border-cyan-400/40 hover:text-cyan-400/80 transition-all duration-150 font-mono"
                  >
                    {kc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode selector */}
            <div className="flex gap-2" role="group" aria-label="Response mode">
              {([
                { id: 'explain',   label: 'Explain',   icon: <FaCode className="w-3 h-3" /> },
                { id: 'interview', label: 'Interview',  icon: <FaQuestionCircle className="w-3 h-3" /> },
                { id: 'whatif',    label: 'What If?',  icon: <FaBolt className="w-3 h-3" /> },
              ] as const).map(m => (
                <button
                  key={m.id}
                  aria-pressed={mode === m.id}
                  onClick={() => setMode(m.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                    ${mode === m.id ? 'bg-purple/20 border border-purple/40 text-white' : 'border border-white/[0.05] text-white/40 hover:text-white/60'}`}
                >
                  {m.icon}{m.label}
                </button>
              ))}
            </div>

            {/* Tabs: Chat / Flow / Patterns */}
            <div role="tablist" className="flex gap-1 border-b border-white/[0.05]">
              {([
                { id: 'chat',     label: 'AI Chat',         icon: <FaRobot className="w-3 h-3" /> },
                { id: 'flow',     label: 'Execution Flow',  icon: <FaProjectDiagram className="w-3 h-3" /> },
                { id: 'patterns', label: 'Patterns',        icon: <FaLayerGroup className="w-3 h-3" /> },
              ] as const).map(t => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={activeTab === t.id}
                  aria-controls={`${t.id}-panel`}
                  tabIndex={activeTab === t.id ? 0 : -1}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-all duration-200 border-b-2 -mb-px
                    ${activeTab === t.id ? 'border-purple text-white' : 'border-transparent text-white/35 hover:text-white/60'}`}
                >
                  {t.icon}{t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === 'chat' && (
                <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col gap-4">
                  {/* Starter questions */}
                  {messages.length === 0 && (
                    <div className="flex flex-col gap-2">
                      <p className="text-[10px] text-white/25 uppercase tracking-widest">Quick questions</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProblem.interviewQuestions.slice(0, 3).map(q => (
                          <button key={q} onClick={() => sendMessage(q)}
                            className="text-left text-xs px-3 py-2 rounded-xl border border-white/[0.05] bg-[#0D0A18]
                                       text-white/50 hover:border-purple/40 hover:text-white/75 hover:bg-purple/[0.04]
                                       transition-all duration-200 max-w-xs">
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Messages */}
                  <div ref={chatScrollRef} className="flex flex-col gap-3 max-h-[200px] sm:max-h-[280px] md:max-h-[320px] lg:max-h-[420px] overflow-y-auto pr-1">
                    {messages.map((m, i) => <ChatBubble key={i} msg={m} />)}
                    {loading && (
                      <div className="flex gap-3">
                        <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                          <FaRobot className="w-3.5 h-3.5" />
                        </div>
                        <div className="bg-[#141020] border border-white/[0.08] rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                          {[0, 0.15, 0.3].map(d => (
                            <motion.div key={d} className="w-1.5 h-1.5 rounded-full bg-white/30"
                              animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: d }} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="flex gap-2">
                    <input
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                      placeholder={
                        mode === 'interview' ? 'Ask like an interviewer…' :
                        mode === 'whatif'    ? 'What if 10k concurrent users?' :
                        'Ask about design, patterns, tradeoffs…'
                      }
                      className="flex-1 bg-[#0D0A18] border border-white/[0.08] rounded-xl px-4 py-2.5
                                 text-sm text-white/80 placeholder:text-white/25 outline-none
                                 focus:border-purple/40 transition-colors duration-200"
                    />
                    <button
                      onClick={() => sendMessage()}
                      disabled={loading || !input.trim()}
                      className="px-4 py-2.5 rounded-xl bg-purple/20 hover:bg-purple/30 border border-purple/40
                                 text-white/80 text-sm font-semibold transition-all duration-200
                                 disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none flex items-center gap-2"
                    >
                      <HiOutlineSparkles className="w-4 h-4" />
                      Ask
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'flow' && (
                <motion.div key="flow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-[10px] text-white/30 mb-3">Click a step to view its class implementation →</p>
                  <FlowBar problem={selectedProblem} onClassClick={handleClassClick} />
                  {/* Complexity table */}
                  <div className="mt-5 rounded-xl border border-white/[0.05] bg-[#0D0A18] overflow-hidden">
                    <div className="border-b border-white/[0.06] px-4 py-2">
                      <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">Key Classes</span>
                    </div>
                    {selectedProblem.keyClasses.map((kc, i) => (
                      <button key={kc.name} onClick={() => handleClassClick(kc.name)}
                        className="w-full flex items-start gap-3 px-4 py-3 border-b border-white/[0.04] last:border-0
                                   hover:bg-purple/[0.04] transition-colors duration-150 text-left">
                        <span className="text-[10px] text-white/20 font-mono w-4 shrink-0 pt-0.5">{i + 1}</span>
                        <div>
                          <span className="text-xs font-mono text-cyan-400/80">{kc.name}</span>
                          <span className="text-[10px] text-white/35 ml-2">{kc.role}</span>
                          {kc.pattern && (
                            <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded border border-purple/20 text-purple/70">{kc.pattern}</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'patterns' && (
                <motion.div key="patterns" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col gap-3">
                  {selectedProblem.interviewQuestions.map((q, i) => (
                    <button key={i} onClick={() => { setActiveTab('chat'); sendMessage(q); }}
                      className="flex items-start gap-3 text-left px-4 py-3 rounded-xl border border-white/[0.05]
                                 bg-[#0D0A18] hover:border-purple/40 hover:bg-purple/[0.04] transition-all duration-200 group">
                      <FaPlay className="w-2.5 h-2.5 text-purple/50 group-hover:text-purple shrink-0 mt-0.5 transition-colors" />
                      <span className="text-xs text-white/60 group-hover:text-white/85 transition-colors">{q}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT — Code viewer ── */}
          <div className="flex flex-col gap-3">
            {/* File selector tabs */}
            <div className="flex flex-wrap gap-1.5">
              {selectedProblem.files.map(f => (
                <button
                  key={f.name}
                  onClick={() => setActiveFile(f)}
                  className={`text-[10px] font-mono px-3 py-1.5 rounded-lg border transition-all duration-150
                    ${activeFile.name === f.name
                      ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-400'
                      : 'border-white/[0.05] text-white/35 hover:border-white/20 hover:text-white/60'}`}
                >
                  {f.name}
                </button>
              ))}
            </div>

            {/* File info */}
            <div className="flex items-center gap-2 px-1">
              <span className="text-[10px] text-white/25 font-mono">{activeFile.name}</span>
              <span className="text-[10px] text-white/20">·</span>
              <span className="text-[10px] text-white/30 italic">{activeFile.role}</span>
            </div>

            {/* Code block */}
            <div className="relative rounded-2xl border border-white/[0.05] bg-[#0D0A18] overflow-hidden flex-1 min-w-0">
              {/* Top bar */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06]">
                {['#ff5f56', '#ffbd2e', '#27c93f'].map(c => (
                  <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
                ))}
                <span className="text-[10px] text-white/25 font-mono ml-2">{activeFile.name}</span>
                <span className="ml-auto text-[9px] text-white/15 font-mono">java</span>
              </div>
              {/* Code */}
              <div className="overflow-auto max-h-[280px] sm:max-h-[400px] lg:max-h-[540px]">
                <pre className="p-5 text-[11px] leading-relaxed font-mono text-white/70 whitespace-pre min-w-0">
                  <code dangerouslySetInnerHTML={{ __html: highlight(activeFile.content) }} />
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom note ── */}
        <p className="text-center text-white/15 text-[10px] mt-8 font-mono">
          Real Java implementations · OOP · Design Patterns · System Design
        </p>
      </motion.div>
    </section>
  );
}
