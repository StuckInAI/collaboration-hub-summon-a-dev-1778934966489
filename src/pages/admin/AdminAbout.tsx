import { useState } from 'react';
import { Save } from 'lucide-react';
import { getAbout, saveAbout } from '@/lib/storage';
import type { AboutData } from '@/types';
import Button from '@/components/ui/Button';

export default function AdminAbout() {
  const [form, setForm] = useState<AboutData>(getAbout());
  const [saved, setSaved] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setSaved(false);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    saveAbout(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const fields: { label: string; name: keyof AboutData; type?: string; multiline?: boolean }[] = [
    { label: 'Full Name', name: 'name' },
    { label: 'Tagline', name: 'tagline' },
    { label: 'Bio', name: 'bio', multiline: true },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'GitHub URL', name: 'github' },
    { label: 'LinkedIn URL', name: 'linkedin' },
    { label: 'Twitter URL', name: 'twitter' },
    { label: 'Profile Image URL', name: 'profileImageUrl' },
    { label: 'Resume URL', name: 'resumeUrl' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem' }}>About</h1>
      <form onSubmit={handleSave} style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        {fields.map(({ label, name, type = 'text', multiline }) => (
          <div key={name}>
            <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>{label}</label>
            {multiline ? (
              <textarea
                name={name}
                value={form[name] as string}
                onChange={handleChange}
                rows={4}
                style={{ width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.5rem 0.75rem', color: 'var(--color-text)', fontSize: '0.9rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
              />
            ) : (
              <input
                type={type}
                name={name}
                value={form[name] as string}
                onChange={handleChange}
                style={{ width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.5rem 0.75rem', color: 'var(--color-text)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
              />
            )}
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Button type="submit">
            <Save size={16} />
            Save Changes
          </Button>
          {saved && <span style={{ color: 'var(--color-success)', fontSize: '0.9rem', fontWeight: 600 }}>✓ Saved!</span>}
        </div>
      </form>
    </div>
  );
}
