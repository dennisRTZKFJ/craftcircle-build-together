
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { authService, User } from '@/services/auth.service';

/**
 * Authentication context for managing user authentication state
 * Integrates with Spring Security JWT token authentication
 */

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (role: 'diy' | 'creator' | 'partner' | 'admin') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Initialize auth state from localStorage and validate token
    const initializeAuth = async () => {
      try {
        // 🔧 INTEGRATION: This will validate JWT token with Spring Security
        // If token is expired, it will attempt to refresh using refresh token
        const isValid = await authService.isAuthenticated();
        
        if (isValid) {
          // 🔧 INTEGRATION: User data from JWT token or stored user data
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          // Clear potentially invalid auth data
          authService.logout();
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        // Clear potentially corrupted auth data
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);
  
  // Login handler - integrates with Spring Security login endpoint
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // 🔧 INTEGRATION: This will call Spring Security login endpoint
      // and receive JWT token with user data
      const user = await authService.login({ email, password });
      setUser(user);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };
  
  // Register handler - integrates with Spring Security register endpoint
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // 🔧 INTEGRATION: This will call Spring Security register endpoint
      // and receive JWT token with user data
      const user = await authService.register({ name, email, password });
      setUser(user);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };
  
  // Logout handler - clears JWT token and user data
  const logout = () => {
    // 🔧 INTEGRATION: No backend call needed, just clear local tokens
    // Some implementations may want to invalidate the token on the server
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };
  
  // Reset password handler - integrates with Spring Security reset password endpoint
  const resetPassword = async (email: string) => {
    // 🔧 INTEGRATION: This will call Spring Security reset password endpoint
    await authService.resetPassword(email);
  };
  
  // Check if user has a specific role
  // Used for role-based access control with Spring Security
  const hasRole = (role: 'diy' | 'creator' | 'partner' | 'admin'): boolean => {
    if (!user) return false;
    return user.role === role;
  };
  
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    resetPassword,
    isAuthenticated,
    hasRole,
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
