import React from 'react';
import styles from './Sidebar.module.css';
import { Link, NavLink } from 'react-router-dom'; // Use NavLink for active styling

const Sidebar: React.FC = () => {
  const getNavLinkClassName = ({ isActive }: { isActive: boolean }) => {
    return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
  };

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink to="/dashboard" className={getNavLinkClassName}>
              Dashboard
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/event-bookings" className={getNavLinkClassName}>
              Event Bookings
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/users" className={getNavLinkClassName}>
              Users Management
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/refund-logs" className={getNavLinkClassName}>
              Refund Logs
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/content-management" className={getNavLinkClassName}>
              Content Management
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/reports" className={getNavLinkClassName}>
              Reports
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/admin-settings" className={getNavLinkClassName}>
              Admin Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
