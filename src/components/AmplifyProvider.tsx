'use client';

import { AuthProvider } from 'react-oidc-context';
import { oidcConfig } from '@/lib/aws-config';

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider {...oidcConfig}>
      {children}
    </AuthProvider>
  );
}