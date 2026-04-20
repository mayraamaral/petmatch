import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";
import { SupabaseAuthRepository } from "../infrastructure/supabase-auth.repository";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  isBootstrapping: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const authRepository = new SupabaseAuthRepository();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (!isMountedRef.current) return;
      setSession(data.session);
      setIsBootstrapping(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMountedRef.current) return;
      setSession(nextSession);
    });

    return () => {
      isMountedRef.current = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const logout = useCallback(async () => {
    await authRepository.logout();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      isBootstrapping,
      logout,
    }),
    [session, isBootstrapping, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
