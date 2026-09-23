"use client";

import React, { useState, useEffect, useActionState, createContext, useContext } from "react";
import { adminLoginAction, adminLogoutAction, isServerAdminAuthenticated, AuthState } from "@/app/actions/auth";
import { ShieldCheck, Lock, ArrowRight, KeyRound, LogOut, Loader2, AlertCircle } from "lucide-react";

interface AdminAuthContextType {
  onLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  onLogout: () => {},
});

export const useAdminAuth = () => useContext(AdminAuthContext);

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const [state, formAction, isPending] = useActionState<AuthState | null, FormData>(
    adminLoginAction,
    null
  );

  useEffect(() => {
    async function checkAuth() {
      const isAuthed = await isServerAdminAuthenticated();
      setIsAuthenticated(isAuthed);
      setIsChecking(false);
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if (state?.success) {
      setIsAuthenticated(true);
    }
  }, [state]);

  const handleLogout = async () => {
    await adminLogoutAction();
    setIsAuthenticated(false);
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#0A0F1A] text-white flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#00E5FF] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0F1A] text-white pt-36 pb-24 flex items-center justify-center px-4 relative z-10">
        {/* Glow Backdrop */}
        <div className="absolute w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-md w-full glass-card p-8 sm:p-10 rounded-[32px] border border-[#00E5FF]/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[#1E3A8A]/50 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.3)]">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block mb-1">
              EXO ADVANCE // ENTERPRISE SECURITY
            </span>
            <h1 className="text-2xl font-black text-white font-sans tracking-tight">
              CRM Access Portal
            </h1>
            <p className="text-xs text-[#64748B] font-mono mt-2">
              Enter secure server admin passcode to authenticate your CRM session.
            </p>
          </div>

          <form action={formAction} className="w-full space-y-4">
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#00E5FF] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="passcode"
                placeholder="Enter Access Passcode..."
                required
                className={`w-full bg-[#0A0F1A]/90 border ${
                  state?.error ? "border-red-500 text-red-400" : "border-white/10 focus:border-[#00E5FF]"
                } rounded-xl pl-11 pr-4 py-3.5 text-sm text-white font-mono placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all`}
              />
            </div>

            {state?.error && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs font-mono flex items-start gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{state.error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/80 border border-[#00E5FF] text-white py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 text-[#00E5FF] animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <>
                  <span>Authenticate Portal</span>
                  <ArrowRight className="w-4 h-4 text-[#00E5FF] group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 w-full flex items-center justify-between text-[10px] font-mono text-[#64748B]">
            <div className="flex items-center gap-1.5 text-[#00E5FF]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SERVER SESSION ENCRYPTED</span>
            </div>
            <span className="text-slate-500">HTTP-ONLY COOKIES</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ onLogout: handleLogout }}>
      <div className="relative z-10">
        {/* Admin Session Top Bar below fixed Navbar */}
        <div className="pt-24 bg-[#0A0F1A]/95 border-b border-white/10 px-6 py-2.5 flex items-center justify-between font-mono text-xs text-[#64748B] relative z-40">
          <div className="flex items-center gap-2 text-[#00E5FF]">
            <ShieldCheck className="w-4 h-4" />
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              Exo Advance // Authenticated Admin Session
            </span>
          </div>
          <button
            onClick={handleLogout}
            type="button"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-red-400 transition-colors bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/40 px-3 py-1.5 rounded-lg cursor-pointer active:scale-95 font-mono"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
        {children}
      </div>
    </AdminAuthContext.Provider>
  );
}
