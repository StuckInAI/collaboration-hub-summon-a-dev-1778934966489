import { useState } from 'react';
import { Save } from 'lucide-react';
import { getAbout, saveAbout } from '@/lib/storage';
import type { AboutData } from '@/types';
import Button from '@/components/ui/Button';

export default function AdminAbout() {
  const [form, setForm] = useState<AboutData>(getAbout());
  const [saved, setSaved] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveAbout(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const textareaFields: (keyof AboutData)[] = ['bio'];
  const inputFields: (keyof AboutData)[] = [
    'name',
    'tagline',
    'email',
    'github',
    'linkedin',
    'twitter',
    'resumeUrl',
    'profileImageUrl',
    'location',
  ];

  return (
    <div style={{ maxWidth: 640 }}>
      <h2 style={{ marginBottom: '1.5rem', fontWeight: 700, fontSize: '1.4rem' }}>Edit About</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {textareaFields.map((key) => (
          <div key={String(key)}>
            <label
              htmlFor={String(key)}
              style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600 }}
            >
              {String(key).charAt(0).toUpperCase() + String(key).slice(1)}
            </label>
            <textarea
              id={String(key)}
              name={String(key)}
              value={form[key] as string ?? ''}
              onChange={handleChange}
              rows={4}
              style={{
                width: '100%',
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem 0.75rem',
                color: 'var(--color-text)',
                fontSize: '0.9rem',
                resize: 'vertical',
              }}
            />
          </div>
        ))}

        {inputFields.map((key) => (
          <div key={String(key)}>
            <label
              htmlFor={String(key)}
              style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600 }}
            >
              {String(key).charAt(0).toUpperCase() + String(key).slice(1)}
            </label>
            <input
              id={String(key)}
              name={String(key)}
              type="text"
              value={form[key] as string ?? ''}
              onChange={handleChange}
              style={{
                width: '100%',
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem 0.75rem',
                color: 'var(--color-text)',
                fontSize: '0.9rem',
              }}
            />
          </div>
        ))}

        <div style={{ marginTop: '0.5rem' }}>
          <Button type="submit">
            <Save size={16} />
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
