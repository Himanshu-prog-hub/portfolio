import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ─── Rate limiting (in-memory, resets on cold start) ─────────────────────
const RATE_LIMIT = 5;            // max requests
const WINDOW_MS  = 60_000;       // per 60 seconds per IP
const ipMap      = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now  = Date.now();
  const entry = ipMap.get(ip);

  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// ─── POST /api/contact ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Rate limit
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
  }

  // 2. Parse body
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, message } = body;

  // 3. Server-side validation
  if (!name?.trim()) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  }
  if (!email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
  }
  if (!message?.trim() || message.trim().length < 10) {
    return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 });
  }

  // 4. Check env vars
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.error('[contact] Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars.');
    return NextResponse.json({ error: 'Email service not configured. Please try again later.' }, { status: 503 });
  }

  // 5. Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailPass },
  });

  // 6. Send notification email TO Himanshu
  try {
    await transporter.sendMail({
      from:    `"Portfolio Contact" <${gmailUser}>`,
      to:      'mishra00.11himanshu@gmail.com',
      replyTo: `"${name}" <${email}>`,
      subject: `📬 New message from ${name} — Portfolio`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0c1e; color: #e2e8f0; padding: 32px; max-width: 560px; margin: 0 auto; border-radius: 16px;">
            <div style="border-bottom: 1px solid rgba(124,58,237,0.3); padding-bottom: 20px; margin-bottom: 24px;">
              <h1 style="margin: 0; font-size: 20px; color: #a78bfa;">📬 New Portfolio Message</h1>
              <p style="margin: 6px 0 0; font-size: 13px; color: #64748b;">Someone reached out through your portfolio</p>
            </div>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-size: 12px; color: #64748b; width: 80px; vertical-align: top;">FROM</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #e2e8f0;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 12px; color: #64748b; vertical-align: top;">EMAIL</td>
                <td style="padding: 8px 0;">
                  <a href="mailto:${escapeHtml(email)}" style="font-size: 14px; color: #22d3ee; text-decoration: none;">${escapeHtml(email)}</a>
                </td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding: 20px; background: rgba(124,58,237,0.08); border: 1px solid rgba(124,58,237,0.2); border-radius: 12px;">
              <p style="margin: 0; font-size: 12px; color: #64748b; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
              <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #cbd5e1; white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>

            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${escapeHtml(email)}"
                 style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #7c3aed, #4f46e5); color: white; text-decoration: none; border-radius: 50px; font-size: 14px; font-weight: 600;">
                Reply to ${escapeHtml(name)} →
              </a>
            </div>

            <p style="margin-top: 28px; font-size: 11px; color: #334155; text-align: center;">
              Sent via himanshu.dev portfolio contact form
            </p>
          </body>
        </html>
      `,
    });

    // 7. Send confirmation email TO the sender
    await transporter.sendMail({
      from:    `"Himanshu Mishra" <${gmailUser}>`,
      to:      `"${name}" <${email}>`,
      subject: `Got your message, ${name.split(' ')[0]}! 👋`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0c1e; color: #e2e8f0; padding: 32px; max-width: 520px; margin: 0 auto; border-radius: 16px;">
            <h2 style="color: #a78bfa; margin-top: 0;">Hey ${escapeHtml(name.split(' ')[0])}, thanks for reaching out! 👋</h2>
            <p style="color: #94a3b8; line-height: 1.7; font-size: 15px;">
              I've received your message and will get back to you within 24 hours.
              In the meantime, feel free to check out my work or music on the links below.
            </p>

            <div style="margin: 24px 0; padding: 16px; border-left: 3px solid #7c3aed; background: rgba(124,58,237,0.06); border-radius: 4px;">
              <p style="margin: 0; font-size: 13px; color: #64748b;">Your message</p>
              <p style="margin: 8px 0 0; font-size: 14px; color: #94a3b8; white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>

            <div style="display: flex; gap: 12px; margin-top: 20px;">
              <a href="https://github.com/Himanshu-prog-hub" style="color: #22d3ee; font-size: 13px; text-decoration: none;">GitHub →</a>
              <span style="color: #334155;">·</span>
              <a href="https://www.youtube.com/@himanshumishra8864" style="color: #22d3ee; font-size: 13px; text-decoration: none;">YouTube →</a>
              <span style="color: #334155;">·</span>
              <a href="https://www.instagram.com/himanshumishra4257/" style="color: #22d3ee; font-size: 13px; text-decoration: none;">Instagram →</a>
            </div>

            <p style="margin-top: 28px; font-size: 12px; color: #334155;">
              — Himanshu Mishra · Fullstack Developer & Classical Vocalist · Bengaluru
            </p>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('[contact] Nodemailer error:', err);
    return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
