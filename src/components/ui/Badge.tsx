import styles from './Badge.module.css';

type BadgeProps = {
  label: string;
  variant?: 'default' | 'primary' | 'accent';
};

export default function Badge({ label, variant = 'default' }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{label}</span>;
}
