/**
 * Authentication Hook
 * Manages user authentication state and operations
 */

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthContextType, LoginCredentials, RegisterData } from '../types/index.ts';
import { loginUser, registerUser } from '../services/api.ts';
import { getUserFromStorage, saveUserToStorage, removeUserFromStorage, saveTokenToStorage } from '../utils/index.ts';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  /**
   * Initialize auth state from storage
   */
  useEffect(() => {
    const storedUser = getUserFromStorage();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  /**
   * Login function
   */
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      const { token, user: userData } = await loginUser(credentials);
      saveTokenToStorage(token);
      saveUserToStorage(userData);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register function
   */
  const register = async (data: RegisterData): Promise<void> => {
    try {
      setIsLoading(true);
      const { token, user: userData } = await registerUser(data);
      saveTokenToStorage(token);
      saveUserToStorage(userData);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout function
   */
  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    removeUserFromStorage();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth hook
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
