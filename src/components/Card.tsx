import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  value?: string | number;
  children?: React.ReactNode; // For more complex content than just a value
}

const Card: React.FC<CardProps> = ({ title, value, children }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      {value !== undefined && <p className={styles.cardValue}>{value}</p>}
      {children && <div className={styles.cardContent}>{children}</div>}
    </div>
  );
};

export default Card;
