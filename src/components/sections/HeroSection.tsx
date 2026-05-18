import { Github, Linkedin, ArrowDown, Sparkles, Download } from 'lucide-react';
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
      {/* Animated particle/grid background */}
      <div className={styles.gridBg} aria-hidden="true" />

      {/* Glow orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.orb3} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        {/* Avatar */}
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarRing} />
          <img
            src={about.profileImageUrl}
            alt={about.name}
            className={styles.avatar}
            loading="eager"
          />
          <span className={styles.avatarOnline} aria-label="Available" />
        </div>

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
          {about.resumeUrl && about.resumeUrl !== '#' && (
            <a href={about.resumeUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="ghost">
                <Download size={16} />
                Resume
              </Button>
            </a>
          )}
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.socialsRow}>
          <span className={styles.socialsLabel}>Find me on</span>
          <div className={styles.socials}>
            <a href={about.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialLink}>
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a href={about.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialLink}>
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <button className={styles.scroll} onClick={scrollToProjects} aria-label="Scroll down">
          <ArrowDown size={20} />
        </button>
      </div>
    </section>
  );
}
