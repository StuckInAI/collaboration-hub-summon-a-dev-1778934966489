import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { getSkills, saveSkills } from '@/lib/storage';
import type { Skill } from '@/types';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';

const EMPTY: Omit<Skill, 'id'> = {
  name: '',
  category: '',
  level: 80,
  icon: '',
};

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>(getSkills());
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState<Omit<Skill, 'id'>>(EMPTY);

  const categories = Array.from(new Set(skills.map((s) => s.category)));

  function openAdd() {
    setEditing(null);
    setForm(EMPTY);
    setModalOpen(true);
  }

  function openEdit(skill: Skill) {
    setEditing(skill);
    setForm({ name: skill.name, category: skill.category, level: skill.level, icon: skill.icon ?? '' });
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    const updated = skills.filter((s) => s.id !== id);
    saveSkills(updated);
    setSkills(updated);
  }

  function handleSave() {
    if (!form.name.trim()) return;
    if (editing) {
      const updated = skills.map((s) =>
        s.id === editing.id ? { ...editing, ...form } : s
      );
      saveSkills(updated);
      setSkills(updated);
    } else {
      const newSkill: Skill = { ...form, id: Date.now().toString() };
      const updated = [...skills, newSkill];
      saveSkills(updated);
      setSkills(updated);
    }
    setModalOpen(false);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Skills</h1>
        <Button onClick={openAdd}>
          <Plus size={16} />
          Add Skill
        </Button>
      </div>

      {categories.map((cat) => (
        <div key={cat} style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>{cat}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {skills.filter((s) => s.category === cat).map((skill) => (
              <div
                key={skill.id}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <span style={{ flex: 1, fontWeight: 600, fontSize: '0.9rem' }}>{skill.name}</span>
                <Badge label={`${skill.level}%`} variant="primary" />
                <div style={{ width: 100, height: 6, background: 'var(--color-border)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${skill.level}%`, height: '100%', background: 'var(--color-primary)', borderRadius: 999 }} />
                </div>
                <button onClick={() => openEdit(skill)} title="Edit" style={{ color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(skill.id)} title="Delete" style={{ color: 'var(--color-error)', cursor: 'pointer' }}>
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Skill' : 'Add Skill'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {([
            { label: 'Name', key: 'name' as const, placeholder: 'e.g. React' },
            { label: 'Category', key: 'category' as const, placeholder: 'e.g. Frontend' },
            { label: 'Icon (emoji or text)', key: 'icon' as const, placeholder: '⚛️' },
          ]).map(({ label, key, placeholder }) => (
            <div key={key}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>{label}</label>
              <input
                type="text"
                value={form[key] as string}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                style={{ width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.5rem 0.75rem', color: 'var(--color-text)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          ))}

          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Level: {form.level}%</label>
            <input
              type="range"
              min={0}
              max={100}
              value={form.level}
              onChange={(e) => setForm((f) => ({ ...f, level: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
