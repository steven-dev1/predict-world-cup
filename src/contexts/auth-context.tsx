"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabase/client";
import type { Profile } from "@/types/database";

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  signIn: (username: string) => Promise<{ error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredUser(): Profile | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("wc_user");
  if (stored) {
    try {
      return JSON.parse(stored) as Profile;
    } catch {
      localStorage.removeItem("wc_user");
    }
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setUser(getStoredUser());
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async (username: string) => {
    const trimmed = username.trim();
    if (trimmed.length < 2) {
      return { error: "El nombre debe tener al menos 2 caracteres" };
    }
    if (trimmed.length > 20) {
      return { error: "El nombre debe tener máximo 20 caracteres" };
    }

    const { data: existing } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", trimmed)
      .single();

    if (existing) {
      setUser(existing);
      localStorage.setItem("wc_user", JSON.stringify(existing));
      return {};
    }

    const { data, error } = await supabase
      .from("profiles")
      .insert({ username: trimmed })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return { error: "Ese nombre ya está en uso" };
      }
      return { error: "Error al crear el perfil" };
    }

    setUser(data);
    localStorage.setItem("wc_user", JSON.stringify(data));
    return {};
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem("wc_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
