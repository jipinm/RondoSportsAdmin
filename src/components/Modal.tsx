import React, { useEffect } from 'react';
import styles from './Modal.module.css';
import { X } from 'lucide-react'; // Using lucide-react for a close icon

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl'; // Optional size prop
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto'; // Restore background scroll
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modalPanel} ${styles[size]}`}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
        {/* Optional: Footer for actions like Save, Cancel buttons */}
        {/* <div className={styles.modalFooter}>
          <button onClick={onClose}>Close</button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
