'use client';

import { AuthProvider } from 'react-oidc-context';
import { useMemo } from 'react';

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  // Get the base URL dynamically - use useMemo to avoid recreation
  const config = useMemo(() => {
    // Only run in browser
    if (typeof window === 'undefined') {
      return null;
    }

    const baseUrl = window.location.origin;

    return {
      authority: 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_6LxsAjtRX',
      client_id: '4botmnmnknikbipc801vbsgvta',
      redirect_uri: `${baseUrl}/callback`,
      post_logout_redirect_uri: baseUrl,
      response_type: 'code',
      scope: 'phone openid email',
      automaticSilentRenew: false,
      loadUserInfo: true,
    };
  }, []);

  // Don't render AuthProvider until config is ready (browser only)
  if (!config) {
    return <div style={{ display: 'contents' }}>{children}</div>;
  }

  return (
    <AuthProvider {...config}>
      {children}
    </AuthProvider>
  );
}