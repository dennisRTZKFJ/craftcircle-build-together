
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { authService } from '@/services/auth.service';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Initialize auth state from localStorage
    const initializeAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        // Clear potentially corrupted auth data
        authService.logout();
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);
  
  // Login handler
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await authService.login({ email, password });
      setUser(user);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };
  
  // Register handler
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const user = await authService.register({ name, email, password });
      setUser(user);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };
  
  // Logout handler
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };
  
  // Reset password handler
  const resetPassword = async (email: string) => {
    await authService.resetPassword(email);
  };
  
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    resetPassword,
    isAuthenticated,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

