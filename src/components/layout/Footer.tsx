import { Github, Linkedin, Twitter, Code2 } from 'lucide-react';
import { getAbout } from '@/lib/storage';
import styles from './Footer.module.css';

export default function Footer() {
  const about = getAbout();

  return (
    <footer className={styles.footer}>
      <div className={cn('container', styles.inner)}>
        <div className={styles.brand}>
          <Code2 size={20} />
          <span>devfolio</span>
        </div>
        <p className={styles.copy}>© {new Date().getFullYear()} {about.name}. Crafted with passion.</p>
        <div className={styles.socials}>
          <a href={about.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href={about.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href={about.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function cn(...classes: (string | undefined | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}
