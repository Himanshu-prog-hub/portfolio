'use client';

import React, { useState } from 'react';
import { FaLocationArrow, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './ui/FadeIn';

type FormState = { name: string; email: string; message: string };

interface FieldProps {
  label: string;
  id: keyof FormState;
  type?: string;
  rows?: number;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder?: string;
}

function Field({ label, id, type = 'text', rows, value, onChange, error, placeholder }: FieldProps) {
  const base = [
    "w-full rounded-xl bg-white/[0.04] border px-4 py-3",
    "text-sm text-white/80 placeholder:text-white/20 outline-none",
    "transition-all duration-200 focus:border-purple/60 focus:bg-purple/[0.06] focus:shadow-[0_0_14px_rgba(124,58,237,0.14)]",
    error ? 'border-red-500/50' : 'border-white/[0.05]',
  ].join(' ');
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-white/40 uppercase tracking-widest">
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`${base} resize-none`}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={base}
          placeholder={placeholder}
        />
      )}
      {error && <span className="text-[10px] text-red-400">{error}</span>}
    </div>
  );
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

function ContactForm() {
  const [form, setForm]     = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const set = (key: keyof FormState) => (val: string) =>
    setForm(f => ({ ...f, [key]: val }));

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())                                e.name    = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email   = 'Valid email required';
    if (form.message.trim().length < 10)                  e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ message: data.error ?? 'Something went wrong. Please try again.' });
        setStatus('error');
        return;
      }
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setErrors({ message: 'Network error. Please check your connection and try again.' });
      setStatus('error');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'sent' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 py-10"
        >
          <div className="w-14 h-14 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-2xl">
            ✓
          </div>
          <p className="text-emerald-400 font-semibold">Message sent!</p>
          <p className="text-white/40 text-sm">I&apos;ll get back to you within 24 hours.</p>
          <button
            onClick={() => setStatus('idle')}
            className="text-xs text-white/30 hover:text-white/60 transition-colors mt-2"
          >
            Send another →
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="w-full max-w-lg mx-auto px-4 sm:px-0 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name"  id="name"  value={form.name}  onChange={set('name')}  error={errors.name}  placeholder="John Doe" />
            <Field label="Email" id="email" type="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="john@example.com" />
          </div>
          <Field
            label="Message" id="message" rows={4}
            value={form.message} onChange={set('message')}
            error={errors.message}
            placeholder="Hi Himanshu, I'd love to work together on..."
          />
          <motion.button
            type="submit"
            disabled={status === 'sending'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-purple py-3.5 text-sm font-semibold text-black disabled:opacity-60 transition-all duration-200 hover:bg-amber-400 hover:shadow-[0_0_24px_rgba(232,54,106,0.35)]"
          >
            {status === 'sending' ? (
              <>
                <motion.div
                  className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <FaLocationArrow className="w-3 h-3" />
              </>
            )}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

const Footer = () => {
  const socialLinks = [
    { icon: <FaGithub   className="w-4 h-4" />, href: 'https://github.com/Himanshu-prog-hub',    label: 'GitHub'   },
    { icon: <FaLinkedin className="w-4 h-4" />, href: 'https://www.linkedin.com/in/himanshu-mishra-0b2795191/', label: 'LinkedIn' },
    { icon: <FaTwitter  className="w-4 h-4" />, href: 'https://x.com/manshu_1100',                               label: 'X'        },
  ];

  return (
    <footer className="w-full pb-10 mb-[100px] md:mb-5" id="contact">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

      <FadeIn direction="up" duration={0.6}>
        <div className="flex flex-col items-center gap-3 mb-12">
          <h2 className="heading">
            Let&apos;s <span className="text-purple">Connect</span>
          </h2>
          <p className="text-white/65 text-sm md:text-base text-center max-w-md">
            Have a project in mind, or just want to say hi? Drop me a message.
          </p>
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.15} duration={0.55}>
        <ContactForm />
      </FadeIn>

      <FadeIn direction="up" delay={0.1} duration={0.5}>
        <div className="flex mt-16 md:flex-row flex-col justify-between items-center gap-4">
          <p className="text-sm text-white/30">
            &copy; 2026 Himanshu Mishra &middot; Built with Next.js &amp; coffee
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                className="w-11 h-11 flex items-center justify-center rounded-lg border border-white/[0.05] text-white/40 hover:text-white hover:border-purple/40 hover:bg-purple/10 transition-all duration-200"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </FadeIn>
    </footer>
  );
};

export default Footer;
