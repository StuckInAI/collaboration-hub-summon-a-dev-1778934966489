import type { Project, Skill, AboutData } from '@/types';

const PROJECTS_KEY = 'portfolio_projects';
const SKILLS_KEY = 'portfolio_skills';
const ABOUT_KEY = 'portfolio_about';
const AUTH_KEY = 'portfolio_admin_auth';

const DEFAULT_ABOUT: AboutData = {
  name: 'Alex Morgan',
  tagline: 'Full-Stack Developer & Creative Technologist',
  bio: "I'm a passionate software developer with 5+ years of experience building scalable web applications. I love crafting elegant solutions to complex problems, blending clean code with beautiful design. When I'm not coding, you'll find me contributing to open-source projects or exploring the latest in web technology.",
  profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  resumeUrl: '#',
  email: 'alex@devportfolio.io',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
};

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with real-time inventory, payment processing, and an admin dashboard. Built for scale with microservices architecture.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'Docker'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    order: 1,
    featured: true,
  },
  {
    id: '2',
    title: 'AI Content Generator',
    description: 'An AI-powered SaaS tool that generates blog posts, social media captions, and marketing copy. Integrated with GPT-4 and features a subscription billing system.',
    techStack: ['Next.js', 'OpenAI', 'Prisma', 'TypeScript', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    order: 2,
    featured: true,
  },
  {
    id: '3',
    title: 'Real-Time Collaboration Tool',
    description: 'A Figma-inspired collaborative whiteboard supporting live multi-user editing, video chat, and export to PDF/PNG. WebSocket-powered with CRDT conflict resolution.',
    techStack: ['React', 'WebSockets', 'Canvas API', 'Express', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    order: 3,
    featured: false,
  },
  {
    id: '4',
    title: 'DevOps Dashboard',
    description: 'A centralized monitoring dashboard aggregating metrics from multiple cloud providers, CI/CD pipelines, and error tracking services into a single unified view.',
    techStack: ['Vue.js', 'Go', 'Prometheus', 'Grafana', 'Kubernetes'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    order: 4,
    featured: false,
  },
  {
    id: '5',
    title: 'Mobile Fitness App',
    description: 'Cross-platform fitness tracking app with workout planning, progress analytics, and social challenges. Integrates with Apple Health and Google Fit.',
    techStack: ['React Native', 'Expo', 'Firebase', 'TypeScript'],
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=500&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    order: 5,
    featured: false,
  },
  {
    id: '6',
    title: 'Blockchain Voting System',
    description: 'A decentralized voting platform built on Ethereum. Features transparent audit trails, anonymous ballots, and real-time result aggregation.',
    techStack: ['Solidity', 'React', 'Ethers.js', 'Hardhat', 'IPFS'],
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    order: 6,
    featured: false,
  },
];

const DEFAULT_SKILLS: Skill[] = [
  { id: '1', name: 'React', category: 'Frontend', proficiency: 95 },
  { id: '2', name: 'TypeScript', category: 'Frontend', proficiency: 90 },
  { id: '3', name: 'Next.js', category: 'Frontend', proficiency: 88 },
  { id: '4', name: 'Vue.js', category: 'Frontend', proficiency: 75 },
  { id: '5', name: 'CSS / SCSS', category: 'Frontend', proficiency: 92 },
  { id: '6', name: 'Node.js', category: 'Backend', proficiency: 88 },
  { id: '7', name: 'Express', category: 'Backend', proficiency: 85 },
  { id: '8', name: 'Python', category: 'Backend', proficiency: 80 },
  { id: '9', name: 'GraphQL', category: 'Backend', proficiency: 78 },
  { id: '10', name: 'Go', category: 'Backend', proficiency: 65 },
  { id: '11', name: 'PostgreSQL', category: 'Database', proficiency: 85 },
  { id: '12', name: 'MongoDB', category: 'Database', proficiency: 80 },
  { id: '13', name: 'Redis', category: 'Database', proficiency: 75 },
  { id: '14', name: 'Docker', category: 'DevOps', proficiency: 82 },
  { id: '15', name: 'Kubernetes', category: 'DevOps', proficiency: 70 },
  { id: '16', name: 'AWS', category: 'DevOps', proficiency: 78 },
  { id: '17', name: 'CI/CD', category: 'DevOps', proficiency: 80 },
  { id: '18', name: 'Figma', category: 'Other', proficiency: 72 },
  { id: '19', name: 'Git', category: 'Other', proficiency: 95 },
];

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
  localStorage.setItem(key, JSON.stringify(value));
}

export function getProjects(): Project[] {
  return load<Project[]>(PROJECTS_KEY, DEFAULT_PROJECTS);
}

export function saveProjects(projects: Project[]): void {
  save(PROJECTS_KEY, projects);
}

export function getSkills(): Skill[] {
  return load<Skill[]>(SKILLS_KEY, DEFAULT_SKILLS);
}

export function saveSkills(skills: Skill[]): void {
  save(SKILLS_KEY, skills);
}

export function getAbout(): AboutData {
  return load<AboutData>(ABOUT_KEY, DEFAULT_ABOUT);
}

export function saveAbout(about: AboutData): void {
  save(ABOUT_KEY, about);
}

export function checkAdminAuth(email: string, password: string): boolean {
  // Default credentials — admin can change in dashboard
  const stored = load<{ email: string; password: string } | null>(AUTH_KEY, null);
  if (stored) {
    return stored.email === email && stored.password === password;
  }
  return email === 'admin@portfolio.io' && password === 'admin123';
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem('portfolio_admin_session') === 'true';
}

export function setAdminSession(): void {
  sessionStorage.setItem('portfolio_admin_session', 'true');
}

export function clearAdminSession(): void {
  sessionStorage.removeItem('portfolio_admin_session');
}
