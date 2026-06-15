"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Swords, Loader2, User } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn(username);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/matches");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600/30 to-indigo-600/30 border border-blue-500/20 shadow-lg shadow-blue-500/10 backdrop-blur-sm">
            <Swords className="h-12 w-12 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            PichaCup
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Adivina los resultados del Mundial 2026
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-xl shadow-2xl shadow-black/20"
        >
          <label
            htmlFor="username"
            className="mb-3 block text-sm font-medium text-slate-300"
          >
            Tu nombre en el grupo
          </label>
          <div className="relative mb-5">
            <User className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Escribe tu nombre..."
              maxLength={20}
              autoFocus
              className="w-full rounded-2xl border border-slate-600/50 bg-slate-900/60 py-3.5 pl-11 pr-4 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {error && (
            <p className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || username.trim().length < 2}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white transition-all hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/25"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-slate-500">
          Sin contraseña. Solo entra con tu nombre.
        </p>
      </div>
    </div>
  );
}
