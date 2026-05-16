import { useState, useCallback } from 'react';
import type { Project, Skill, AboutData } from '@/types';
import { getProjects, saveProjects, getSkills, saveSkills, getAbout, saveAbout } from '@/lib/storage';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(getProjects);

  const add = useCallback((project: Project) => {
    setProjects((prev) => {
      const next = [...prev, project];
      saveProjects(next);
      return next;
    });
  }, []);

  const update = useCallback((project: Project) => {
    setProjects((prev) => {
      const next = prev.map((p) => (p.id === project.id ? project : p));
      saveProjects(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== id);
      saveProjects(next);
      return next;
    });
  }, []);

  return { projects, add, update, remove };
}

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>(getSkills);

  const add = useCallback((skill: Skill) => {
    setSkills((prev) => {
      const next = [...prev, skill];
      saveSkills(next);
      return next;
    });
  }, []);

  const update = useCallback((skill: Skill) => {
    setSkills((prev) => {
      const next = prev.map((s) => (s.name === skill.name ? skill : s));
      saveSkills(next);
      return next;
    });
  }, []);

  const remove = useCallback((name: string) => {
    setSkills((prev) => {
      const next = prev.filter((s) => s.name !== name);
      saveSkills(next);
      return next;
    });
  }, []);

  return { skills, add, update, remove };
}

export function useAbout() {
  const [about, setAbout] = useState<AboutData>(getAbout);

  const update = useCallback((data: AboutData) => {
    setAbout(data);
    saveAbout(data);
  }, []);

  return { about, update };
}
