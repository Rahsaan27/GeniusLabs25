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
      // If user is authenticated, we need to logout from Cognito first
      // This clears the Cognito session cookies on the Cognito domain
      if (auth.isAuthenticated) {
        // Store a flag that we're trying to signup
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('pendingSignup', 'true');
        }

        // Logout from Cognito - this will clear Cognito's session
        // After logout, it will redirect back to our app
        await auth.signoutRedirect();
        return { success: true };
      }

      // If we get here, user is not authenticated
      // Check if we just came back from a logout for signup
      const pendingSignup = typeof window !== 'undefined' ? sessionStorage.getItem('pendingSignup') : null;

      if (pendingSignup) {
        sessionStorage.removeItem('pendingSignup');
      }

      // Clear all local data
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();

        // Clear all cookies
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
      }

      // Remove user from OIDC storage
      await auth.removeUser();

      // Now redirect to Cognito hosted UI
      await auth.signinRedirect();

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