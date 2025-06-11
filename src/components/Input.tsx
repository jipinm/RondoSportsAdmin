import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({ type, value, onChange, placeholder, name }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      className={styles.input}
    />
  );
};

export default Input;
