"use client";

import { AuthProvider } from "@/contexts/auth-context";
import { Header } from "@/components/header";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      {children}
    </AuthProvider>
  );
}
