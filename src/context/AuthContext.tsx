import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from '@/src/lib/appwrite';
import { Models } from 'appwrite';

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  finishLogin: (userId: string, secret: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string) => {
    // Appwrite Magic Link Auth
    await account.createMagicURLToken('unique()', email, window.location.origin + '/auth-callback');
  };

  const finishLogin = async (userId: string, secret: string) => {
    try {
      // If there happens to be an active session, Appwrite will throw an error when we try to updateMagicURLSession
      // We first try to verify the session
      await account.updateMagicURLSession(userId, secret);
    } catch (error: any) {
      if (error?.message?.includes('prohibited when a session is active')) {
        // User is already logged in or has an active session
        // We can just proceed and check the user
        console.log('Session already active, proceeding...');
      } else {
        throw error;
      }
    }
    await checkUser();
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, finishLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
