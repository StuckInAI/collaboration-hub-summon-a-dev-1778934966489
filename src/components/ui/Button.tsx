import { cn } from '@/lib/utils';
import styles from './Button.module.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  type = 'button',
  disabled = false,
  className,
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className
      )}
    >
      {children}
    </button>
  );
}
