import { getSkills } from '@/lib/storage';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './SkillsSection.module.css';

type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Other';
const CATEGORIES: SkillCategory[] = ['Frontend', 'Backend', 'Database', 'DevOps', 'Other'];

export default function SkillsSection() {
  const skills = getSkills();

  const grouped = CATEGORIES.reduce<Record<SkillCategory, typeof skills>>(
    (acc, cat) => ({ ...acc, [cat]: skills.filter((s) => s.category === cat) }),
    {} as Record<SkillCategory, typeof skills>
  );

  return (
    <SectionWrapper id="skills">
      <div className="container">
        <SectionHeader
          label="Skills"
          title="Tech Stack"
          description="Technologies and tools I work with on a daily basis."
        />
        <div className={styles.grid}>
          {CATEGORIES.filter((cat) => grouped[cat].length > 0).map((cat) => (
            <div key={cat} className={styles.category}>
              <h3 className={styles.categoryTitle}>{cat}</h3>
              <div className={styles.skillList}>
                {grouped[cat].map((skill) => (
                  <div key={skill.id} className={styles.skill}>
                    <div className={styles.skillHeader}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillPct}>{skill.proficiency}%</span>
                    </div>
                    <div className={styles.bar}>
                      <div
                        className={styles.barFill}
                        style={{ width: `${skill.proficiency}%` }}
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
