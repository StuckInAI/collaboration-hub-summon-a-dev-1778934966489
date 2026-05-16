export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

export interface About {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  profileImageUrl: string;
  resumeUrl: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}
