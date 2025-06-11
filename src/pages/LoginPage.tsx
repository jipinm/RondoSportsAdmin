import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import styles from './LoginPage.module.css';
import { useAuth } from '../hooks/useAuth'; // Import useAuth

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const { login } = useAuth(); // Use the useAuth hook

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError('Email is required.');
      return false;
    }
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format.');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('Password is required.');
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const handleLogin = async () => {
    // Clear previous login error
    setLoginError(null);

    // Validate inputs
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return; // Stop if validation fails
    }

    try {
      const success = await login(email, password);
      if (success) {
        console.log('Login successful! User role:', /* userRole will be available via useAuth() if needed here */ );
        // Navigation will be handled in a later step
      } else {
        setLoginError('Invalid email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <h2>Login</h2>
        {loginError && <p className={styles.errorSummary}>{loginError}</p>}
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) validateEmail(e.target.value); // Re-validate on change if there was an error
          }}
          placeholder="Email"
          name="email"
        />
        {emailError && <p className={styles.errorField}>{emailError}</p>}
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) validatePassword(e.target.value); // Re-validate on change if there was an error
          }}
          placeholder="Password"
          name="password"
        />
        {passwordError && <p className={styles.errorField}>{passwordError}</p>}
        <Button onClick={handleLogin} type="submit" variant="primary">
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
