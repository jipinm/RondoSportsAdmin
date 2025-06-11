import React from 'react';
import styles from './Header.module.css';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button'; // Assuming Button component can be used here

const Header: React.FC = () => {
  const { isAuthenticated, logout, userRole } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span>Admin Dashboard</span>
      </div>
      <div className={styles.userInfo}>
        {isAuthenticated ? (
          <>
            <span className={styles.userRole}>{userRole}</span>
            <Button onClick={logout} variant="secondary" type="button">Logout</Button>
          </>
        ) : (
          <span>Guest</span>
        )}
      </div>
    </header>
  );
};

export default Header;
