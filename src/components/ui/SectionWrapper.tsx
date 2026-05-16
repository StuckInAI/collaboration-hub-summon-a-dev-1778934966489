import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import styles from './SectionWrapper.module.css';

type SectionWrapperProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

export default function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id={id}
      ref={ref}
      className={cn(styles.section, isVisible && styles.visible, className)}
    >
      {children}
    </section>
  );
}
