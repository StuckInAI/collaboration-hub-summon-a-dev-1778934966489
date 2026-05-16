import { Download, MapPin, Coffee, Code } from 'lucide-react';
import { getAbout } from '@/lib/storage';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import styles from './AboutSection.module.css';

const STATS = [
  { icon: Code, label: 'Projects Built', value: '40+' },
  { icon: Coffee, label: 'Cups of Coffee', value: '∞' },
  { icon: MapPin, label: 'Years Experience', value: '5+' },
];

export default function AboutSection() {
  const about = getAbout();

  return (
    <SectionWrapper id="about">
      <div className="container">
        <SectionHeader
          label="About Me"
          title="Passionate Builder"
          description="A glimpse into who I am and what drives me."
        />
        <div className={styles.grid}>
          <div className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <img
                src={about.profileImageUrl}
                alt={about.name}
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.imageBorder} />
            </div>
          </div>

          <div className={styles.textCol}>
            <h3 className={styles.name}>{about.name}</h3>
            <p className={styles.tagline}>{about.tagline}</p>
            <p className={styles.bio}>{about.bio}</p>

            <div className={styles.stats}>
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.statCard}>
                  <stat.icon size={20} className={styles.statIcon} />
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              {about.resumeUrl && about.resumeUrl !== '#' ? (
                <a href={about.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Button>
                    <Download size={16} />
                    Download Resume
                  </Button>
                </a>
              ) : (
                <Button disabled>
                  <Download size={16} />
                  Resume (Coming Soon)
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
