import { useState, useCallback } from 'react';
import type { Project, Skill, AboutData } from '@/types';
import {
  getProjects,
  saveProjects,
  getSkills,
  saveSkills,
  getAbout,
  saveAbout,
} from '@/lib/storage';
import { generateId } from '@/lib/utils';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() => getProjects());

  const addProject = useCallback((project: Omit<Project, 'id'>) => {
    const newProject: Project = { ...project, id: generateId() };
    setProjects((prev) => {
      const updated = [...prev, newProject];
      saveProjects(updated);
      return updated;
    });
  }, []);

  const updateProject = useCallback((id: string, data: Partial<Project>) => {
    setProjects((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...data } : p));
      saveProjects(updated);
      return updated;
    });
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveProjects(updated);
      return updated;
    });
  }, []);

  return { projects, addProject, updateProject, deleteProject };
}

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>(() => getSkills());

  const addSkill = useCallback((skill: Omit<Skill, 'id'>) => {
    const newSkill: Skill = { ...skill, id: generateId() };
    setSkills((prev) => {
      const updated = [...prev, newSkill];
      saveSkills(updated);
      return updated;
    });
  }, []);

  const updateSkill = useCallback((id: string, data: Partial<Skill>) => {
    setSkills((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, ...data } : s));
      saveSkills(updated);
      return updated;
    });
  }, []);

  const deleteSkill = useCallback((id: string) => {
    setSkills((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      saveSkills(updated);
      return updated;
    });
  }, []);

  return { skills, addSkill, updateSkill, deleteSkill };
}

export function useAbout() {
  const [about, setAbout] = useState<AboutData>(() => getAbout());

  const updateAbout = useCallback((data: Partial<AboutData>) => {
    setAbout((prev) => {
      const updated = { ...prev, ...data };
      saveAbout(updated);
      return updated;
    });
  }, []);

  return { about, updateAbout };
}
