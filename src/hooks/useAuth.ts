'use client';

import { useAuth as useOidcAuth } from 'react-oidc-context';

export interface User {
  username: string;
  email: string;
  name?: string;
  sub: string;
}

export function useAuth() {
  const auth = useOidcAuth();

  // Handle case when auth context is undefined (during SSR/build)
  if (!auth) {
    return {
      user: null,
      loading: false,
      login: async () => ({ success: false, error: 'Auth not initialized' }),
      logout: async () => ({ success: false, error: 'Auth not initialized' }),
      register: async () => ({ success: false, error: 'Auth not initialized' }),
      isAuthenticated: false,
      error: undefined,
    };
  }

  const user: User | null = auth.user?.profile ? {
    username: auth.user.profile.preferred_username || auth.user.profile.email || '',
    email: auth.user.profile.email || '',
    name: auth.user.profile.name,
    sub: auth.user.profile.sub
  } : null;

  const login = async () => {
    try {
      await auth.signinRedirect();
      return { success: true };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Login failed';
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      // Remove user from OIDC storage
      await auth.removeUser();

      // Clear all browser storage
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }

      return { success: true };
    } catch (error: unknown) {
      console.error('Logout error:', error);

      // Even on error, try to clear storage
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }

      const message = error instanceof Error ? error.message : 'Logout failed';
      return { success: false, error: message };
    }
  };

  const register = async () => {
    try {
      // First, logout any existing session
      await auth.removeUser();

      // Clear storage
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }

      // Redirect to Cognito hosted UI with signup hint
      // This tells Cognito to show the signup form instead of login
      await auth.signinRedirect({
        extraQueryParams: {
          signup: 'true' // This parameter can be used to customize the UI
        }
      });
      return { success: true };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      return { success: false, error: message };
    }
  };

  return {
    user,
    loading: auth.isLoading,
    login,
    logout,
    register,
    isAuthenticated: auth.isAuthenticated,
    error: auth.error?.message,
  };
}