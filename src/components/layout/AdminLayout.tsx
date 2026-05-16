import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Zap,
  User,
  LogOut,
  Menu,
  X,
  Code2,
} from 'lucide-react';
import { clearAdminSession } from '@/lib/storage';
import styles from './AdminLayout.module.css';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban, end: false },
  { label: 'Skills', href: '/admin/skills', icon: Zap, end: false },
  { label: 'About', href: '/admin/about', icon: User, end: false },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    clearAdminSession();
    navigate('/admin/login');
  }

  return (
    <div className={styles.wrapper}>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <Code2 size={22} />
          <span>Admin Panel</span>
          <button
            className={styles.closeBtn}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.end}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>
          <span className={styles.topbarTitle}>Portfolio Admin</span>
          <a href="/" target="_blank" rel="noopener noreferrer" className={styles.viewSite}>
            View Site ↗
          </a>
        </header>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
