import type { Project, Skill, AboutData } from '@/types';

const KEYS = {
  projects: 'portfolio_projects',
  skills: 'portfolio_skills',
  about: 'portfolio_about',
  adminSession: 'portfolio_admin_session',
} as const;

// ── Default data ────────────────────────────────────────────────────────────

const DEFAULT_ABOUT: AboutData = {
  name: 'Alex Johnson',
  tagline: 'Full-Stack Developer & Creative Technologist',
  bio: 'I build fast, accessible, and beautiful web applications. Passionate about clean code, great UX, and solving real problems with technology.',
  email: 'alex@example.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  resumeUrl: '#',
  profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
};

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory, Stripe payments, and an admin dashboard.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=338&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: '2',
    title: 'AI Chat Application',
    description: 'Real-time chat app powered by OpenAI GPT with conversation history and user authentication.',
    techStack: ['Next.js', 'OpenAI', 'Socket.io', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=338&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: '3',
    title: 'DevOps Dashboard',
    description: 'Monitoring dashboard for CI/CD pipelines with real-time metrics and alerting.',
    techStack: ['React', 'Python', 'Docker', 'Grafana'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=338&fit=crop',
    githubUrl: 'https://github.com',
    featured: false,
  },
];

const DEFAULT_SKILLS: Skill[] = [
  { name: 'React', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  { name: 'Node.js', level: 88, category: 'Backend' },
  { name: 'PostgreSQL', level: 82, category: 'Backend' },
  { name: 'Docker', level: 78, category: 'DevOps' },
  { name: 'AWS', level: 74, category: 'DevOps' },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

// ── Projects ────────────────────────────────────────────────────────────────

export function getProjects(): Project[] {
  return load(KEYS.projects, DEFAULT_PROJECTS);
}

export function saveProjects(projects: Project[]): void {
  save(KEYS.projects, projects);
}

// ── Skills ──────────────────────────────────────────────────────────────────

export function getSkills(): Skill[] {
  return load(KEYS.skills, DEFAULT_SKILLS);
}

export function saveSkills(skills: Skill[]): void {
  save(KEYS.skills, skills);
}

// ── About ───────────────────────────────────────────────────────────────────

export function getAbout(): AboutData {
  return load(KEYS.about, DEFAULT_ABOUT);
}

export function saveAbout(about: AboutData): void {
  save(KEYS.about, about);
}

// ── Admin session ────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = 'admin123';

export function checkAdminAuth(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function setAdminSession(): void {
  save(KEYS.adminSession, { loggedIn: true, ts: Date.now() });
}

export function clearAdminSession(): void {
  try {
    localStorage.removeItem(KEYS.adminSession);
  } catch {
    // ignore
  }
}

export function isAdminLoggedIn(): boolean {
  const session = load<{ loggedIn?: boolean; ts?: number } | null>(KEYS.adminSession, null);
  if (!session?.loggedIn) return false;
  // Session expires after 24 hours
  const age = Date.now() - (session.ts ?? 0);
  return age < 24 * 60 * 60 * 1000;
}
