import type { Project, Skill, About } from '@/types';

const KEYS = {
  projects: 'portfolio_projects',
  skills: 'portfolio_skills',
  about: 'portfolio_about',
  adminSession: 'portfolio_admin_session',
};

// ── Admin Auth ────────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = 'admin123';

export function checkAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function setAdminSession(): void {
  localStorage.setItem(KEYS.adminSession, 'true');
}

export function clearAdminSession(): void {
  localStorage.removeItem(KEYS.adminSession);
}

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(KEYS.adminSession) === 'true';
}

// ── Projects ──────────────────────────────────────────────────────────────────

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with real-time inventory management, payment processing, and an admin dashboard.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    order: 0,
  },
  {
    id: '2',
    title: 'AI Task Manager',
    description: 'A smart task management app that uses AI to prioritise your to-dos and suggest optimal work schedules.',
    techStack: ['Next.js', 'OpenAI', 'Prisma', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    order: 1,
  },
  {
    id: '3',
    title: 'Real-time Chat App',
    description: 'WebSocket-powered chat application with rooms, direct messages, file sharing, and end-to-end encryption.',
    techStack: ['React', 'Socket.io', 'Express', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
    order: 2,
  },
];

export function getProjects(): Project[] {
  try {
    const raw = localStorage.getItem(KEYS.projects);
    if (!raw) return DEFAULT_PROJECTS;
    return JSON.parse(raw) as Project[];
  } catch {
    return DEFAULT_PROJECTS;
  }
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem(KEYS.projects, JSON.stringify(projects));
}

// ── Skills ────────────────────────────────────────────────────────────────────

const DEFAULT_SKILLS: Skill[] = [
  { id: '1', name: 'React', category: 'Frontend', proficiency: 95 },
  { id: '2', name: 'TypeScript', category: 'Frontend', proficiency: 90 },
  { id: '3', name: 'Node.js', category: 'Backend', proficiency: 85 },
  { id: '4', name: 'PostgreSQL', category: 'Database', proficiency: 80 },
  { id: '5', name: 'Docker', category: 'DevOps', proficiency: 75 },
  { id: '6', name: 'Next.js', category: 'Frontend', proficiency: 88 },
];

export function getSkills(): Skill[] {
  try {
    const raw = localStorage.getItem(KEYS.skills);
    if (!raw) return DEFAULT_SKILLS;
    return JSON.parse(raw) as Skill[];
  } catch {
    return DEFAULT_SKILLS;
  }
}

export function saveSkills(skills: Skill[]): void {
  localStorage.setItem(KEYS.skills, JSON.stringify(skills));
}

// ── About ─────────────────────────────────────────────────────────────────────

const DEFAULT_ABOUT: About = {
  name: 'Alex Johnson',
  tagline: 'Full-Stack Developer & Open Source Enthusiast',
  bio: 'I build performant, accessible, and delightful web experiences. With 5+ years of experience across the full stack, I love turning complex problems into elegant solutions.',
  email: 'alex@example.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  resumeUrl: '#',
  profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
};

export function getAbout(): About {
  try {
    const raw = localStorage.getItem(KEYS.about);
    if (!raw) return DEFAULT_ABOUT;
    return JSON.parse(raw) as About;
  } catch {
    return DEFAULT_ABOUT;
  }
}

export function saveAbout(about: About): void {
  localStorage.setItem(KEYS.about, JSON.stringify(about));
}
