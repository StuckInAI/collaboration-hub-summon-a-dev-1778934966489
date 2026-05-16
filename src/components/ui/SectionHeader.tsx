import styles from './SectionHeader.module.css';

type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
};

export default function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
