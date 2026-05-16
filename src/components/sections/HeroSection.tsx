import { Github, Linkedin, ArrowDown, Sparkles } from 'lucide-react';
import { getAbout } from '@/lib/storage';
import Button from '@/components/ui/Button';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const about = getAbout();

  function scrollToProjects() {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  function scrollToContact() {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className={styles.hero}>
      {/* Glow orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <div className={styles.badge}>
          <Sparkles size={14} />
          <span>Available for new opportunities</span>
        </div>

        <h1 className={styles.heading}>
          <span className={styles.greeting}>Hi, I'm</span>
          <span className={styles.name}>{about.name}</span>
        </h1>

        <p className={styles.tagline}>{about.tagline}</p>
        <p className={styles.bio}>{about.bio.slice(0, 160)}…</p>

        <div className={styles.actions}>
          <Button size="lg" onClick={scrollToProjects}>
            View My Work
          </Button>
          <Button size="lg" variant="secondary" onClick={scrollToContact}>
            Get In Touch
          </Button>
        </div>

        <div className={styles.socials}>
          <a href={about.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href={about.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
        </div>

        <button className={styles.scroll} onClick={scrollToProjects} aria-label="Scroll down">
          <ArrowDown size={20} />
        </button>
      </div>
    </section>
  );
}
