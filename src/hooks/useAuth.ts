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
      // First, completely logout any existing session
      if (auth.isAuthenticated) {
        await auth.signoutRedirect({ post_logout_redirect_uri: window.location.origin + '/signup' });
        return { success: true };
      }

      // Clear all storage
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

      // Redirect to Cognito hosted UI for signup
      // Use direct URL to ensure clean state
      if (typeof window !== 'undefined') {
        const cognitoDomain = 'https://us-west-2-6lxsajtrx.auth.us-west-2.amazoncognito.com';
        const clientId = '4botmnmnknikbipc801vbsgvta';
        const redirectUri = encodeURIComponent(window.location.origin + '/callback');
        const signupUrl = `${cognitoDomain}/oauth2/authorize?client_id=${clientId}&response_type=code&scope=phone+openid+email&redirect_uri=${redirectUri}`;

        window.location.href = signupUrl;
      }

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