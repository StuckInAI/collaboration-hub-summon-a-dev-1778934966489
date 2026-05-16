import { useState } from 'react';
import { Save } from 'lucide-react';
import type { AboutData } from '@/types';
import { getAbout, saveAbout } from '@/lib/storage';
import Button from '@/components/ui/Button';

const FIELDS: { key: keyof AboutData; label: string; multiline?: boolean }[] = [
  { key: 'name', label: 'Name' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'bio', label: 'Bio', multiline: true },
  { key: 'email', label: 'Email' },
  { key: 'github', label: 'GitHub URL' },
  { key: 'linkedin', label: 'LinkedIn URL' },
  { key: 'twitter', label: 'Twitter URL' },
  { key: 'resumeUrl', label: 'Resume URL' },
  { key: 'profileImageUrl', label: 'Profile Image URL' },
];

export default function AdminAbout() {
  const [form, setForm] = useState<AboutData>(getAbout);
  const [saved, setSaved] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveAbout(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.4rem', fontWeight: 700 }}>About Settings</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {FIELDS.map(({ key, label, multiline }) => (
          <div key={key}>
            <label
              htmlFor={key}
              style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}
            >
              {label}
            </label>
            {multiline ? (
              <textarea
                id={key}
                name={key}
                value={form[key]}
                onChange={handleChange}
                rows={4}
                style={{
                  width: '100%',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.6rem 0.9rem',
                  color: 'var(--color-text)',
                  fontSize: '0.9rem',
                  resize: 'vertical',
                  outline: 'none',
                }}
              />
            ) : (
              <input
                id={key}
                name={key}
                type="text"
                value={form[key]}
                onChange={handleChange}
                style={{
                  width: '100%',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.6rem 0.9rem',
                  color: 'var(--color-text)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            )}
          </div>
        ))}
        <div>
          <Button type="submit">
            <Save size={16} />
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
