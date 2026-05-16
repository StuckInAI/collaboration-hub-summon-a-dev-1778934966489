export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order?: number;
}

export interface Skill {
  id: string;
  name: string;
  level?: number;
  proficiency?: number;
  category: string;
  icon?: string;
}

export interface AboutData {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  resumeUrl: string;
  profileImageUrl: string;
  location?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}
