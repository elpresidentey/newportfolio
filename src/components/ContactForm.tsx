'use client';

import { useState, FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const reduceMotion = useReducedMotion();
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      if (!res.ok) throw new Error('Failed');
      setState('sent');
      setName(''); setEmail(''); setMessage('');
    } catch {
      setState('error');
    }
  }

  const ease = [0.22, 1, 0.36, 1] as const;

  if (state === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 py-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <CheckCircle className="w-10 h-10 text-accent" />
        </motion.div>
        <p className="text-base font-medium text-foreground">Message sent!</p>
        <p className="text-sm text-foreground-muted">I&apos;ll get back to you as soon as possible.</p>
        <button
          onClick={() => setState('idle')}
          className="mt-2 text-xs text-accent hover:text-accent-hover transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduceMotion ? 0.01 : 0.6, ease, delay: 0.15 }}
      className="space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-foreground-muted mb-1.5">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
            className="w-full px-3.5 py-2.5 text-sm bg-card border border-border/60 rounded-lg text-foreground placeholder:text-foreground-subtle/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-foreground-muted mb-1.5">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full px-3.5 py-2.5 text-sm bg-card border border-border/60 rounded-lg text-foreground placeholder:text-foreground-subtle/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-medium text-foreground-muted mb-1.5">Message</label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Tell me about your project..."
          className="w-full px-3.5 py-2.5 text-sm bg-card border border-border/60 rounded-lg text-foreground placeholder:text-foreground-subtle/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200 resize-y"
        />
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          type="submit"
          disabled={state === 'sending'}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn btn-primary"
        >
          {state === 'sending' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          {state === 'sending' ? 'Sending...' : 'Send Message'}
        </motion.button>
        {state === 'error' && (
          <span className="text-xs text-red-500">Something went wrong. Try again.</span>
        )}
      </div>
    </motion.form>
  );
}
