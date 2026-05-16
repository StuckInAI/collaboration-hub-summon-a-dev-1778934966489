import { useState } from 'react';
import { Plus, Pencil, Trash2, ExternalLink, Github } from 'lucide-react';
import { getProjects, saveProjects } from '@/lib/storage';
import type { Project } from '@/types';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';

const EMPTY: Omit<Project, 'id'> = {
  title: '',
  description: '',
  techStack: [],
  imageUrl: '',
  liveUrl: '',
  githubUrl: '',
  featured: false,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Omit<Project, 'id'>>(EMPTY);
  const [techInput, setTechInput] = useState('');

  function openAdd() {
    setEditing(null);
    setForm(EMPTY);
    setTechInput('');
    setModalOpen(true);
  }

  function openEdit(project: Project) {
    setEditing(project);
    setForm({ ...project });
    setTechInput(project.techStack.join(', '));
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    const updated = projects.filter((p) => p.id !== id);
    saveProjects(updated);
    setProjects(updated);
  }

  function handleSave() {
    const techStack = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    if (!form.title.trim()) return;
    if (editing) {
      const updated = projects.map((p) =>
        p.id === editing.id ? { ...editing, ...form, techStack } : p
      );
      saveProjects(updated);
      setProjects(updated);
    } else {
      const newProject: Project = {
        ...form,
        techStack,
        id: Date.now().toString(),
      };
      const updated = [newProject, ...projects];
      saveProjects(updated);
      setProjects(updated);
    }
    setModalOpen(false);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Projects</h1>
        <Button onClick={openAdd}>
          <Plus size={16} />
          Add Project
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
            }}
          >
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                style={{ width: 80, height: 54, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
              />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 700 }}>{project.title}</span>
                {project.featured && <Badge label="Featured" variant="primary" />}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                {project.techStack.map((t) => (
                  <Badge key={t} label={t} variant="secondary" />
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="Live">
                  <ExternalLink size={16} style={{ color: 'var(--color-text-muted)' }} />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub">
                  <Github size={16} style={{ color: 'var(--color-text-muted)' }} />
                </a>
              )}
              <button onClick={() => openEdit(project)} title="Edit" style={{ color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                <Pencil size={16} />
              </button>
              <button onClick={() => handleDelete(project.id)} title="Delete" style={{ color: 'var(--color-error)', cursor: 'pointer' }}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Project' : 'Add Project'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {([
            { label: 'Title', key: 'title', type: 'text', placeholder: 'Project title' },
            { label: 'Image URL', key: 'imageUrl', type: 'text', placeholder: 'https://...' },
            { label: 'Live URL', key: 'liveUrl', type: 'text', placeholder: 'https://...' },
            { label: 'GitHub URL', key: 'githubUrl', type: 'text', placeholder: 'https://github.com/...' },
          ] as const).map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>{label}</label>
              <input
                type={type}
                value={form[key] as string}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                style={{ width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.5rem 0.75rem', color: 'var(--color-text)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          ))}

          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Short project description"
              rows={3}
              style={{ width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.5rem 0.75rem', color: 'var(--color-text)', fontSize: '0.9rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Tech Stack (comma-separated)</label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="React, TypeScript, Node.js"
              style={{ width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.5rem 0.75rem', color: 'var(--color-text)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              id="featured"
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
            />
            <label htmlFor="featured" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Featured project</label>
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
