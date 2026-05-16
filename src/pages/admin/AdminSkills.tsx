import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { getSkills, saveSkills } from '@/lib/storage';
import type { Skill } from '@/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import styles from './AdminDashboard.module.css';

type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Other';

const CATEGORIES: SkillCategory[] = ['Frontend', 'Backend', 'Database', 'DevOps', 'Other'];

const EMPTY: Omit<Skill, 'id'> = {
  name: '',
  category: 'Frontend',
  proficiency: 80,
};

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>(getSkills);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Skill, 'id'>>(EMPTY);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY);
    setModalOpen(true);
  }

  function openEdit(skill: Skill) {
    setEditingId(skill.id);
    setForm({ name: skill.name, category: skill.category, proficiency: skill.proficiency });
    setModalOpen(true);
  }

  function handleSave() {
    if (!form.name.trim()) return;
    let updated: Skill[];
    if (editingId) {
      updated = skills.map((s) =>
        s.id === editingId ? { ...form, id: editingId } : s
      );
    } else {
      const newSkill: Skill = { ...form, id: crypto.randomUUID() };
      updated = [...skills, newSkill];
    }
    saveSkills(updated);
    setSkills(updated);
    setModalOpen(false);
  }

  function handleDelete(id: string) {
    const updated = skills.filter((s) => s.id !== id);
    saveSkills(updated);
    setSkills(updated);
  }

  const grouped = CATEGORIES.reduce<Record<SkillCategory, Skill[]>>(
    (acc, cat) => ({ ...acc, [cat]: skills.filter((s) => s.category === cat) }),
    {} as Record<SkillCategory, Skill[]>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Skills</h1>
        <Button onClick={openCreate}>
          <Plus size={16} /> Add Skill
        </Button>
      </div>

      {CATEGORIES.map((cat) => (
        grouped[cat].length > 0 && (
          <div key={cat} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cat}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {grouped[cat].map((skill) => (
                <div
                  key={skill.id}
                  className={styles.statCard}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0.75rem 1rem' }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{skill.name}</span>
                      <Badge label={`${skill.proficiency}%`} variant="primary" />
                    </div>
                    <div style={{ background: 'var(--color-bg)', borderRadius: 999, height: 6, overflow: 'hidden' }}>
                      <div style={{ width: `${skill.proficiency}%`, height: '100%', background: 'var(--color-primary)', borderRadius: 999 }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button onClick={() => openEdit(skill)} style={{ color: 'var(--color-text-muted)', padding: 4 }} title="Edit">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(skill.id)} style={{ color: 'var(--color-error)', padding: 4 }} title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}

      {skills.length === 0 && (
        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem' }}>No skills yet. Add one!</p>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Skill' : 'Add Skill'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Name */}
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Name *</label>
            <input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              style={{ width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px', color: 'var(--color-text)', fontSize: '0.9rem' }}
              placeholder="e.g. React"
            />
          </div>
          {/* Category */}
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as SkillCategory }))}
              style={{ width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px', color: 'var(--color-text)', fontSize: '0.9rem' }}
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {/* Proficiency */}
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Proficiency: {form.proficiency}%</label>
            <input
              type="range"
              min={0}
              max={100}
              value={form.proficiency}
              onChange={(e) => setForm((p) => ({ ...p, proficiency: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
