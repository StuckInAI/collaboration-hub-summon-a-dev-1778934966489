export type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  order: number;
  featured: boolean;
};

export type Skill = {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Other';
  proficiency: number; // 1–100
};

export type AboutData = {
  name: string;
  tagline: string;
  bio: string;
  profileImageUrl: string;
  resumeUrl: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
};

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

export type AdminCredentials = {
  email: string;
  password: string;
};
