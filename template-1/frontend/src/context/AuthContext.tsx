"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "patient" | "doctor" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location?: string;
  bloodGroup?: string;
  age?: number;
  healthHistory?: string[];
  emergencyContact?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: UserRole, location?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("cc_token");
    const savedUser  = localStorage.getItem("cc_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    if (!email || !password) { setIsLoading(false); return false; }

    const mockUser: AuthUser = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      email,
      role,
      location: "Barabanki, UP",
      bloodGroup: "O+",
      age: 28,
      healthHistory: ["No known allergies"],
      emergencyContact: "+91 98765 43210",
    };
    const mockToken = "cc_jwt_" + Date.now();

    localStorage.setItem("cc_token", mockToken);
    localStorage.setItem("cc_user", JSON.stringify(mockUser));
    setToken(mockToken);
    setUser(mockUser);
    setIsLoading(false);
    router.push("/dashboard");
    return true;
  };

  const signup = async (
    name: string, email: string, password: string,
    role: UserRole, location?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    if (!name || !email || !password) { setIsLoading(false); return false; }

    const mockUser: AuthUser = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      name, email, role,
      location: location || "India",
      bloodGroup: "",
      age: 0,
      healthHistory: [],
      emergencyContact: "",
    };
    const mockToken = "cc_jwt_" + Date.now();

    localStorage.setItem("cc_token", mockToken);
    localStorage.setItem("cc_user", JSON.stringify(mockUser));
    setToken(mockToken);
    setUser(mockUser);
    setIsLoading(false);
    router.push("/dashboard");
    return true;
  };

  const logout = () => {
    localStorage.removeItem("cc_token");
    localStorage.removeItem("cc_user");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
