import { getSkills } from '@/lib/storage';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import type { Skill } from '@/types';
import styles from './SkillsSection.module.css';

const CATEGORY_ORDER: Skill['category'][] = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Other',
];

const CATEGORY_COLORS: Record<Skill['category'], string> = {
  Frontend: 'var(--color-primary)',
  Backend: 'var(--color-accent)',
  Database: '#a78bfa',
  DevOps: '#34d399',
  Other: '#fb923c',
};

export default function SkillsSection() {
  const skills = getSkills();

  const grouped = CATEGORY_ORDER.reduce<Record<string, Skill[]>>((acc, cat) => {
    const catSkills = skills.filter((s) => s.category === cat);
    if (catSkills.length > 0) acc[cat] = catSkills;
    return acc;
  }, {});

  return (
    <SectionWrapper id="skills">
      <div className="container">
        <SectionHeader
          label="Skills"
          title="My Tech Stack"
          description="Technologies and tools I work with on a daily basis."
        />
        <div className={styles.categories}>
          {Object.entries(grouped).map(([category, catSkills]) => (
            <div key={category} className={styles.categoryBlock}>
              <h3
                className={styles.categoryTitle}
                style={{ color: CATEGORY_COLORS[category as Skill['category']] }}
              >
                {category}
              </h3>
              <div className={styles.skillList}>
                {catSkills.map((skill) => (
                  <div key={skill.id} className={styles.skillItem}>
                    <div className={styles.skillHeader}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillPct}>{skill.proficiency}%</span>
                    </div>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{
                          width: `${skill.proficiency}%`,
                          background: CATEGORY_COLORS[skill.category],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
