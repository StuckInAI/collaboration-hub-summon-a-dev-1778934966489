import type { Project, Skill, AboutData } from '@/types';

// ─── Storage Keys ────────────────────────────────────────────────────────────
const KEYS = {
  projects: 'portfolio_projects',
  skills: 'portfolio_skills',
  about: 'portfolio_about',
  adminSession: 'portfolio_admin_session',
} as const;

// ─── Default Data ────────────────────────────────────────────────────────────
const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with real-time inventory management, payment processing, and admin dashboard.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: '2',
    title: 'AI Chat Application',
    description: 'Real-time chat application with AI-powered responses, markdown support, and conversation history.',
    techStack: ['Next.js', 'OpenAI', 'TypeScript', 'Redis'],
    imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: '3',
    title: 'Developer Portfolio CMS',
    description: 'A headless CMS built specifically for developer portfolios with markdown support and GitHub integration.',
    techStack: ['React', 'GraphQL', 'MongoDB', 'Tailwind'],
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
];

const DEFAULT_SKILLS: Skill[] = [
  { id: '1', name: 'React', category: 'Frontend', proficiency: 95 },
  { id: '2', name: 'TypeScript', category: 'Frontend', proficiency: 90 },
  { id: '3', name: 'Node.js', category: 'Backend', proficiency: 88 },
  { id: '4', name: 'PostgreSQL', category: 'Database', proficiency: 82 },
  { id: '5', name: 'Docker', category: 'DevOps', proficiency: 78 },
  { id: '6', name: 'Next.js', category: 'Frontend', proficiency: 85 },
  { id: '7', name: 'GraphQL', category: 'Backend', proficiency: 75 },
  { id: '8', name: 'AWS', category: 'DevOps', proficiency: 70 },
];

const DEFAULT_ABOUT: AboutData = {
  name: 'Alex Johnson',
  tagline: 'Full-Stack Developer & Open Source Enthusiast',
  bio: 'I build scalable web applications and love contributing to open source. With 5+ years of experience across the full stack, I specialise in React, Node.js, and cloud infrastructure. When I\'m not coding, you\'ll find me hiking or experimenting with new technologies.',
  email: 'alex@example.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  resumeUrl: '#',
  profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
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
    // storage quota exceeded or unavailable
  }
}

// ─── Projects ────────────────────────────────────────────────────────────────
export function getProjects(): Project[] {
  return load(KEYS.projects, DEFAULT_PROJECTS);
}

export function saveProjects(projects: Project[]): void {
  save(KEYS.projects, projects);
}

// ─── Skills ──────────────────────────────────────────────────────────────────
export function getSkills(): Skill[] {
  return load(KEYS.skills, DEFAULT_SKILLS);
}

export function saveSkills(skills: Skill[]): void {
  save(KEYS.skills, skills);
}

// ─── About ───────────────────────────────────────────────────────────────────
export function getAbout(): AboutData {
  return load(KEYS.about, DEFAULT_ABOUT);
}

export function saveAbout(about: AboutData): void {
  save(KEYS.about, about);
}

// ─── Admin Session ───────────────────────────────────────────────────────────
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
  try {
    const raw = localStorage.getItem(KEYS.adminSession);
    if (!raw) return false;
    const data = JSON.parse(raw) as { loggedIn: boolean; ts: number };
    // Session expires after 24 hours
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    return data.loggedIn === true && Date.now() - data.ts < TWENTY_FOUR_HOURS;
  } catch {
    return false;
  }
}
