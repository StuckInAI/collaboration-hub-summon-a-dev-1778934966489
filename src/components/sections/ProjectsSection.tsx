import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { getProjects } from '@/lib/storage';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import styles from './ProjectsSection.module.css';

const ALL_FILTER = 'All';

export default function ProjectsSection() {
  const projects = getProjects();
  const [filter, setFilter] = useState<string>(ALL_FILTER);

  const allTech = Array.from(new Set(projects.flatMap((p) => p.techStack))).slice(0, 8);
  const filters = [ALL_FILTER, ...allTech];

  const filtered =
    filter === ALL_FILTER
      ? projects
      : projects.filter((p) => p.techStack.includes(filter));

  return (
    <SectionWrapper id="projects">
      <div className="container">
        <SectionHeader
          label="Portfolio"
          title="Featured Projects"
          description="A selection of projects I've built — from full-stack apps to open-source tools."
        />

        <div className={styles.filters}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((project, index) => (
            <div
              key={project.id}
              className={styles.card}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className={styles.cardImage}>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                />
                {project.featured && (
                  <span className={styles.featuredBadge}>Featured</span>
                )}
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <div className={styles.techStack}>
                  {project.techStack.map((tech) => (
                    <Badge key={tech} label={tech} variant="primary" />
                  ))}
                </div>
              </div>
              <div className={styles.cardFooter}>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                  >
                    <Github size={15} />
                    Source
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
