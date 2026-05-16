import type { Project, Skill, AboutData } from '@/types';

const STORAGE_KEYS = {
  projects: 'portfolio_projects',
  skills: 'portfolio_skills',
  about: 'portfolio_about',
  adminSession: 'portfolio_admin_session',
};

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory, Stripe payments, and an admin dashboard.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: '2',
    title: 'AI Task Manager',
    description: 'A smart task management app with AI-powered prioritization and natural language input.',
    techStack: ['Next.js', 'TypeScript', 'OpenAI', 'Prisma'],
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: '3',
    title: 'Dev Blog Engine',
    description: 'A markdown-based blogging engine with syntax highlighting, RSS feeds, and SEO optimisation.',
    techStack: ['Astro', 'MDX', 'Tailwind'],
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    githubUrl: 'https://github.com',
    featured: false,
  },
];

const DEFAULT_SKILLS: Skill[] = [
  { id: '1', name: 'React', level: 95, category: 'Frontend' },
  { id: '2', name: 'TypeScript', level: 90, category: 'Frontend' },
  { id: '3', name: 'Node.js', level: 88, category: 'Backend' },
  { id: '4', name: 'PostgreSQL', level: 82, category: 'Backend' },
  { id: '5', name: 'Docker', level: 78, category: 'DevOps' },
  { id: '6', name: 'AWS', level: 74, category: 'DevOps' },
];

const DEFAULT_ABOUT: AboutData = {
  name: 'Alex Morgan',
  tagline: 'Full-Stack Developer & Open Source Enthusiast',
  bio: 'I craft performant, accessible web applications with a focus on clean code and delightful user experiences. Passionate about developer tooling, open source, and pushing the web forward.',
  email: 'alex@example.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  resumeUrl: '#',
  profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  location: 'San Francisco, CA',
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function getProjects(): Project[] {
  return load(STORAGE_KEYS.projects, DEFAULT_PROJECTS);
}

export function saveProjects(projects: Project[]): void {
  save(STORAGE_KEYS.projects, projects);
}

export function getSkills(): Skill[] {
  return load(STORAGE_KEYS.skills, DEFAULT_SKILLS);
}

export function saveSkills(skills: Skill[]): void {
  save(STORAGE_KEYS.skills, skills);
}

export function getAbout(): AboutData {
  return load(STORAGE_KEYS.about, DEFAULT_ABOUT);
}

export function saveAbout(about: AboutData): void {
  save(STORAGE_KEYS.about, about);
}

const ADMIN_PASSWORD = 'admin123';

export function checkAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function setAdminSession(): void {
  save(STORAGE_KEYS.adminSession, true);
}

export function clearAdminSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.adminSession);
  } catch {
    // ignore
  }
}

export function isAdminLoggedIn(): boolean {
  return load(STORAGE_KEYS.adminSession, false);
}
