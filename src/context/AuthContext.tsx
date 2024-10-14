"use client"; // Add this at the very top of the file

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import api from '@/services/api';

export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  payloadData: JwtPayload | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payloadData, setPayloadData] = useState<JwtPayload | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = jwtDecode<JwtPayload>(token);
      setPayloadData(decodedToken);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    const decodedToken = jwtDecode<JwtPayload>(token);

    setPayloadData(decodedToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    api.delete('/tokens');
    localStorage.removeItem('authToken');
    setPayloadData(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, payloadData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
