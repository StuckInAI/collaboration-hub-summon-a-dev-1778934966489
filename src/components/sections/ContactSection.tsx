import { useState } from 'react';
import { Send, Mail, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';
import { getAbout } from '@/lib/storage';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import styles from './ContactSection.module.css';
import type { ContactMessage } from '@/types';

export default function ContactSection() {
  const about = getAbout();
  const [form, setForm] = useState<ContactMessage>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    // Simulate sending (no backend)
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }, 1200);
  }

  return (
    <SectionWrapper id="contact">
      <div className="container">
        <SectionHeader
          label="Contact"
          title="Let's Work Together"
          description="Have a project in mind? I'd love to hear about it. Drop me a message and I'll get back to you within 24 hours."
        />

        <div className={styles.grid}>
          {/* Info */}
          <div className={styles.info}>
            <div className={styles.infoCard}>
              <Mail size={22} className={styles.infoIcon} />
              <div>
                <p className={styles.infoLabel}>Email</p>
                <a href={`mailto:${about.email}`} className={styles.infoValue}>
                  {about.email}
                </a>
              </div>
            </div>
            <div className={styles.infoCard}>
              <Github size={22} className={styles.infoIcon} />
              <div>
                <p className={styles.infoLabel}>GitHub</p>
                <a href={about.github} target="_blank" rel="noopener noreferrer" className={styles.infoValue}>
                  github.com
                </a>
              </div>
            </div>
            <div className={styles.infoCard}>
              <Linkedin size={22} className={styles.infoIcon} />
              <div>
                <p className={styles.infoLabel}>LinkedIn</p>
                <a href={about.linkedin} target="_blank" rel="noopener noreferrer" className={styles.infoValue}>
                  linkedin.com
                </a>
              </div>
            </div>

            <div className={styles.availability}>
              <span className={styles.dot} />
              <span>Available for freelance & full-time roles</span>
            </div>
          </div>

          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            {status === 'success' && (
              <div className={styles.successMsg}>
                <CheckCircle size={20} />
                <span>Message sent! I'll be in touch soon.</span>
              </div>
            )}
            {status === 'error' && (
              <div className={styles.errorMsg}>
                <AlertCircle size={20} />
                <span>Something went wrong. Please try again.</span>
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className={styles.input}
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className={styles.textarea}
                placeholder="Tell me about your project…"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={status === 'sending'}
            >
              <Send size={16} />
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
}
