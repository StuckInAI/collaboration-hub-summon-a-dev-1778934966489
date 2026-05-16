import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { getProjects, saveProjects } from '@/lib/storage';
import type { Project } from '@/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import styles from './AdminDashboard.module.css';

const EMPTY: Omit<Project, 'id'> = {
  title: '',
  description: '',
  techStack: [],
  imageUrl: '',
  liveUrl: '',
  githubUrl: '',
  featured: false,
  order: 0,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>(getProjects);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Project, 'id'>>(EMPTY);
  const [techInput, setTechInput] = useState('');

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY);
    setTechInput('');
    setModalOpen(true);
  }

  function openEdit(project: Project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      imageUrl: project.imageUrl,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      featured: project.featured,
      order: project.order,
    });
    setTechInput('');
    setModalOpen(true);
  }

  function handleSave() {
    if (!form.title.trim()) return;
    let updated: Project[];
    if (editingId) {
      updated = projects.map((p) =>
        p.id === editingId ? { ...form, id: editingId } : p
      );
    } else {
      const newProject: Project = {
        ...form,
        id: crypto.randomUUID(),
        order: projects.length,
      };
      updated = [...projects, newProject];
    }
    saveProjects(updated);
    setProjects(updated);
    setModalOpen(false);
  }

  function handleDelete(id: string) {
    const updated = projects.filter((p) => p.id !== id);
    saveProjects(updated);
    setProjects(updated);
  }

  function addTech() {
    const t = techInput.trim();
    if (t && !form.techStack.includes(t)) {
      setForm((prev) => ({ ...prev, techStack: [...prev.techStack, t] }));
    }
    setTechInput('');
  }

  function removeTech(t: string) {
    setForm((prev) => ({ ...prev, techStack: prev.techStack.filter((x) => x !== t) }));
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Projects</h1>
        <Button onClick={openCreate}>
          <Plus size={16} /> Add Project
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {projects.length === 0 && (
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem' }}>No projects yet. Add one!</p>
        )}
        {projects.map((project) => (
          <div
            key={project.id}
            className={styles.statCard}
            style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '1rem 1.25rem' }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{project.title}</span>
                {project.featured && <Badge label="Featured" variant="accent" />}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: 6 }}>
                {project.description.slice(0, 100)}{project.description.length > 100 ? '…' : ''}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {project.techStack.map((t) => (
                  <Badge key={t} label={t} variant="primary" />
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button
                onClick={() => openEdit(project)}
                style={{ color: 'var(--color-text-muted)', padding: 4 }}
                title="Edit"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                style={{ color: 'var(--color-error)', padding: 4 }}
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Project' : 'Add Project'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Title */}
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              style={{ width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px', color: 'var(--color-text)', fontSize: '0.9rem' }}
              placeholder="Project title"
            />
          </div>
          {/* Description */}
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              style={{ width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px', color: 'var(--color-text)', fontSize: '0.9rem', resize: 'vertical' }}
              placeholder="Short description"
            />
          </div>
          {/* Image URL */}
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Image URL</label>
            <input
              value={form.imageUrl}
              onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
              style={{ width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px', color: 'var(--color-text)', fontSize: '0.9rem' }}
              placeholder="https://..."
            />
          </div>
          {/* Live URL */}
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Live URL</label>
            <input
              value={form.liveUrl}
              onChange={(e) => setForm((p) => ({ ...p, liveUrl: e.target.value }))}
              style={{ width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px', color: 'var(--color-text)', fontSize: '0.9rem' }}
              placeholder="https://..."
            />
          </div>
          {/* GitHub URL */}
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>GitHub URL</label>
            <input
              value={form.githubUrl}
              onChange={(e) => setForm((p) => ({ ...p, githubUrl: e.target.value }))}
              style={{ width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px', color: 'var(--color-text)', fontSize: '0.9rem' }}
              placeholder="https://github.com/..."
            />
          </div>
          {/* Tech Stack */}
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Tech Stack</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
                style={{ flex: 1, background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px', color: 'var(--color-text)', fontSize: '0.9rem' }}
                placeholder="e.g. React"
              />
              <button onClick={addTech} style={{ padding: '8px 12px', background: 'var(--color-primary)', color: 'white', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600 }}>
                <Check size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {form.techStack.map((t) => (
                <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(99,102,241,0.15)', color: 'var(--color-primary-light)', borderRadius: 999, padding: '2px 10px', fontSize: '0.8rem', fontWeight: 600 }}>
                  {t}
                  <button onClick={() => removeTech(t)} style={{ color: 'var(--color-primary-light)', lineHeight: 1 }}><X size={12} /></button>
                </span>
              ))}
            </div>
          </div>
          {/* Featured */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
            />
            Featured project
          </label>
          {/* Order */}
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Order</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))}
              style={{ width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px', color: 'var(--color-text)', fontSize: '0.9rem' }}
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
