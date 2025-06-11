import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock credentials
    const MOCK_EMAIL = 'admin@example.com';
    const MOCK_PASSWORD = 'password';

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      setIsAuthenticated(true);
      setUserRole('Super Admin');
      return true;
    }
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
