// src/hooks/useAuth.ts
// Enkel hook som läser Supabase-session och roll från user_metadata

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { User, Session } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'teamleader' | 'teammember';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  platform?: 'styrelsekorkortet' | 'naringsklivet';
}

interface AuthState {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
}

const parseUser = (supabaseUser: User): AuthUser => ({
  id: supabaseUser.id,
  email: supabaseUser.email ?? '',
  role: (supabaseUser.user_metadata?.role as UserRole) ?? 'teammember',
  name: supabaseUser.user_metadata?.name,
  platform: supabaseUser.user_metadata?.platform,
});

export function useAuth(): AuthState & { signOut: () => Promise<void> } {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    // Hämta befintlig session vid mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({
        user: session?.user ? parseUser(session.user) : null,
        session,
        loading: false,
      });
    });

    // Lyssna på auth-ändringar (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: session?.user ? parseUser(session.user) : null,
        session,
        loading: false,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { ...state, signOut };
}