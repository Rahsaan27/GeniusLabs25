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

  const user: User | null = auth.user ? {
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
      await auth.signoutRedirect();
      return { success: true };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Logout failed';
      return { success: false, error: message };
    }
  };

  const register = () => {
    // For Cognito hosted UI, registration is handled through the login flow
    // Users will be redirected to Cognito's hosted UI which includes registration
    return login();
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