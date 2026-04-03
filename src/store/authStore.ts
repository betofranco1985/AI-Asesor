import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;

  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string, fullName: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  initialized: false,

  initialize: async () => {
    if (!isSupabaseConfigured) {
      // No credentials — skip and mark as initialized so the app renders
      set({ initialized: true });
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ user: session?.user ?? null, initialized: true });

      supabase.auth.onAuthStateChange((_event, session) => {
        set({ user: session?.user ?? null });
      });
    } catch {
      // If Supabase call fails for any reason, still mark initialized
      set({ initialized: true });
    }
  },

  signIn: async (email, password) => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      set({ loading: false });
      if (error) return error.message;
      return null;
    } catch {
      set({ loading: false });
      return 'Error de conexión. Verifica tu configuración de Supabase.';
    }
  },

  signUp: async (email, password, fullName) => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      set({ loading: false });
      if (error) return error.message;
      return null;
    } catch {
      set({ loading: false });
      return 'Error de conexión. Verifica tu configuración de Supabase.';
    }
  },

  signOut: async () => {
    try { await supabase.auth.signOut(); } catch { /* ignore */ }
    set({ user: null });
  },
}));
