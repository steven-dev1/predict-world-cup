"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Trophy, LogOut, Swords, Users } from "lucide-react";
import clsx from "clsx";

export function Header() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <Link href="/matches" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-600/20">
            <Swords className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white hidden sm:inline tracking-tight">
            PichaCup
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/matches"
            className={clsx(
              "rounded-xl px-3 py-2 text-sm font-medium transition-all",
              pathname === "/matches"
                ? "bg-blue-600/20 text-blue-300 shadow-sm"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            Predicciones
          </Link>
          <Link
            href="/today"
            className={clsx(
              "flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all",
              pathname === "/today"
                ? "bg-blue-600/20 text-blue-300 shadow-sm"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Grupo</span>
          </Link>
          <Link
            href="/leaderboard"
            className={clsx(
              "flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all",
              pathname === "/leaderboard"
                ? "bg-blue-600/20 text-blue-300 shadow-sm"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">Ranking</span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400 hidden sm:inline">
            {user.username}
          </span>
          <button
            onClick={signOut}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-800 hover:text-white transition-all"
            title="Cerrar sesion"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
