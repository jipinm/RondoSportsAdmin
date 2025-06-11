import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './MainLayout.module.css';

const MainLayout: React.FC = () => {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <div className={styles.contentWrapper}>
        <Sidebar />
        <main className={styles.mainContent}>
          <Outlet /> {/* Child routes will render here */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
