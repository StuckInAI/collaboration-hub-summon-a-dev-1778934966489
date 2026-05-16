import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import styles from './Navbar.module.css';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <header className={cn(styles.header, scrolled && styles.scrolled)}>
      <div className={cn('container', styles.inner)}>
        <a href="#" className={styles.logo}>
          <Code2 size={22} />
          <span>devfolio</span>
        </a>

        <nav className={cn(styles.nav, menuOpen && styles.navOpen)}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.navLink}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <Link to="/admin" className={styles.adminLink}>
            Admin
          </Link>
        </nav>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
