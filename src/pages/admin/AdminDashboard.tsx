import { getProjects, getSkills } from '@/lib/storage';
import { FolderKanban, Zap, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const projects = getProjects();
  const skills = getSkills();

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: FolderKanban, href: '/admin/projects', color: 'var(--color-primary)' },
    { label: 'Total Skills', value: skills.length, icon: Zap, href: '/admin/skills', color: 'var(--color-accent)' },
    { label: 'Featured', value: projects.filter((p) => p.featured).length, icon: User, href: '/admin/projects', color: '#a78bfa' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageSubtitle}>Welcome back! Here's an overview of your portfolio.</p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.href} className={styles.statCard}>
            <div className={styles.statIcon} style={{ color: stat.color, background: `${stat.color}18` }}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
            <ArrowRight size={16} className={styles.statArrow} />
          </Link>
        ))}
      </div>

      <div className={styles.quickActions}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionGrid}>
          <Link to="/admin/projects" className={styles.actionCard}>
            <FolderKanban size={24} />
            <span>Manage Projects</span>
          </Link>
          <Link to="/admin/skills" className={styles.actionCard}>
            <Zap size={24} />
            <span>Manage Skills</span>
          </Link>
          <Link to="/admin/about" className={styles.actionCard}>
            <User size={24} />
            <span>Edit About</span>
          </Link>
          <a href="/" target="_blank" rel="noopener noreferrer" className={styles.actionCard}>
            <ArrowRight size={24} />
            <span>View Portfolio</span>
          </a>
        </div>
      </div>

      <div className={styles.recentProjects}>
        <h2 className={styles.sectionTitle}>Recent Projects</h2>
        <div className={styles.projectList}>
          {projects.slice(0, 4).map((project) => (
            <div key={project.id} className={styles.projectRow}>
              <div className={styles.projectInfo}>
                <p className={styles.projectName}>{project.title}</p>
                <p className={styles.projectTech}>{project.techStack.slice(0, 3).join(', ')}</p>
              </div>
              {project.featured && <span className={styles.featuredTag}>Featured</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
