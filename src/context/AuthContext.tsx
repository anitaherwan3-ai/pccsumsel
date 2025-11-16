import React, { createContext, useState, useContext, ReactNode } from "react";
import { AuthUser, PetugasRole } from "@/types";
import { getPetugasByLoginId } from "@/data/crud";

interface AuthContextType {
  user: AuthUser | null;
  login: (idPetugas: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isPetugas: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (idPetugas: string, password: string): boolean => {
    const foundPetugas = getPetugasByLoginId(idPetugas);
    if (foundPetugas && foundPetugas.password === password) {
      setUser({
        id: foundPetugas.id,
        idPetugas: foundPetugas.idPetugas,
        role: foundPetugas.role,
        nama: foundPetugas.nama,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const isPetugas = user?.role === "petugas"; // This includes admin as well, if needed, refine later

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isAdmin, isPetugas }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};