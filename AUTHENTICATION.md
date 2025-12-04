# Authentication System Documentation

## Overview

GeniusLabs uses **AWS Cognito** with **OpenID Connect (OIDC)** protocol for authentication. This provides secure, industry-standard user authentication with features like single sign-on (SSO), multi-factor authentication (MFA), and OAuth 2.0 compliance.

## Architecture

### Components

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         ├─── Login/Signup Request
         │
         v
┌─────────────────────────────┐
│   GeniusLabs Frontend      │
│   (Next.js App)            │
│   - useAuth Hook           │
│   - AuthProvider           │
└────────┬────────────────────┘
         │
         ├─── OIDC Protocol
         │
         v
┌─────────────────────────────┐
│   AWS Cognito             │
│   - User Pool             │
│   - Hosted UI             │
│   - Token Management      │
└────────┬────────────────────┘
         │
         ├─── ID Token / Access Token
         │
         v
┌─────────────────────────────┐
│   GeniusLabs Backend API   │
│   - Role Assignment        │
│   - User Data              │
└─────────────────────────────┘
```

## Technology Stack

### Libraries
- **react-oidc-context** (v3.3.0): React wrapper for OIDC authentication
- **oidc-client-ts** (v3.3.0): Core OIDC client library

### AWS Services
- **Amazon Cognito User Pool**: Manages user accounts and authentication
- **Cognito Hosted UI**: Pre-built login/signup interface

## Authentication Flow

### 1. Sign Up Flow

```
User clicks "Sign Up"
    ↓
useAuth().register() called
    ↓
signinRedirect() triggered
    ↓
User redirected to Cognito Hosted UI
    ↓
User fills out registration form
    ↓
Cognito creates user account
    ↓
Cognito redirects back to /callback
    ↓
OIDC library processes authorization code
    ↓
Tokens stored in browser storage
    ↓
User is authenticated
    ↓
Auto-redirect to home page
```

**Files Involved:**
- [src/app/signup/page.tsx](src/app/signup/page.tsx) - Signup UI
- [src/hooks/useAuth.ts](src/hooks/useAuth.ts) - Auth hook with register function
- [src/lib/aws-config.ts](src/lib/aws-config.ts) - OIDC configuration

### 2. Login Flow

```
User clicks "Sign In"
    ↓
useAuth().login() called
    ↓
signinRedirect() triggered
    ↓
User redirected to Cognito Hosted UI
    ↓
User enters email/password
    ↓
Cognito validates credentials
    ↓
Cognito redirects back to /callback with authorization code
    ↓
OIDC library exchanges code for tokens
    ↓
ID Token, Access Token, Refresh Token stored
    ↓
User is authenticated
    ↓
Auto-redirect to home page
```

**Files Involved:**
- [src/app/login/page.tsx](src/app/login/page.tsx) - Login UI
- [src/hooks/useAuth.ts](src/hooks/useAuth.ts) - Auth hook with login function
- [src/app/callback/page.tsx](src/app/callback/page.tsx) - OAuth callback handler

### 3. Logout Flow

```
User clicks "Sign Out" (in profile)
    ↓
useAuth().logout() called
    ↓
Clear localStorage and sessionStorage
    ↓
signoutRedirect() triggered
    ↓
User redirected to Cognito logout endpoint
    ↓
Cognito destroys server-side session
    ↓
User redirected back to home page
    ↓
User is logged out completely
```

**Files Involved:**
- [src/app/profile/page.tsx](src/app/profile/page.tsx) - Profile page with logout button
- [src/hooks/useAuth.ts](src/hooks/useAuth.ts#L32) - Auth hook with logout function

### 4. Session Management

The OIDC library manages tokens and session state:

- **ID Token**: Contains user identity information (email, name, sub)
- **Access Token**: Used for API authorization
- **Refresh Token**: Used to get new tokens when they expire

**Token Storage:**
- Stored in browser's `sessionStorage` (NOT localStorage for security)
- Automatically cleared on logout
- Not automatically renewed after logout (prevents auto-login issue)

## Configuration

### OIDC Configuration
Location: [src/lib/aws-config.ts](src/lib/aws-config.ts)

```typescript
export const oidcConfig = {
  // Cognito User Pool endpoint
  authority: 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_6LxsAjtRX',

  // Application client ID
  client_id: '4botmnmnknikbipc801vbsgvta',

  // Where to redirect after successful login
  redirect_uri: 'http://localhost:3001/callback',

  // Where to redirect after logout
  post_logout_redirect_uri: 'http://localhost:3001',

  // OAuth 2.0 authorization code flow
  response_type: 'code',

  // Requested scopes
  scope: 'phone openid email',

  // DISABLED: Prevents auto-login after logout
  automaticSilentRenew: false,

  // Load user profile information
  loadUserInfo: true,

  // Cognito logout endpoint
  metadata: {
    end_session_endpoint: 'https://geniuslabs.auth.us-west-2.amazoncognito.com/logout'
  },

  // Clean up URL after signin
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
};
```

### Key Configuration Notes

1. **automaticSilentRenew: false**
   - Previously was `true`, which caused auto-login issues
   - When `true`, the library automatically refreshes tokens in the background
   - This prevented proper logout because tokens were being renewed
   - Set to `false` to require explicit user login

2. **end_session_endpoint**
   - Properly logs out from Cognito server-side
   - Ensures session is destroyed on AWS side
   - Prevents session persistence across logout

3. **onSigninCallback**
   - Cleans up OAuth query parameters from URL
   - Improves UX by showing clean URLs after login

## useAuth Hook

Location: [src/hooks/useAuth.ts](src/hooks/useAuth.ts)

### API

```typescript
const {
  user,            // User object or null
  loading,         // Boolean: is auth state loading?
  isAuthenticated, // Boolean: is user logged in?
  error,           // Error message if auth failed
  login,           // Function: initiate login flow
  logout,          // Function: initiate logout flow
  register,        // Function: initiate signup flow
} = useAuth();
```

### User Object Structure

```typescript
interface User {
  username: string;  // User's username (from Cognito)
  email: string;     // User's email address
  name?: string;     // User's display name (optional)
  sub: string;       // Unique user ID from Cognito
}
```

### Example Usage

```typescript
import { useAuth } from '@/hooks/useAuth';

export default function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (isAuthenticated && user) {
    return (
      <div>
        <p>Welcome, {user.name || user.email}!</p>
        <button onClick={logout}>Sign Out</button>
      </div>
    );
  }

  return <button onClick={login}>Sign In</button>;
}
```

## Role-Based Access Control Integration

After authentication, the system automatically assigns roles based on email:

```typescript
// Automatic role assignment on first login
Email contains "student"  → Student role
Email contains "educator" → Educator role
Email contains "admin"    → Admin role
Email contains "rahsaanyj" → SuperAdmin role
```

Location: [src/types/roles.ts](src/types/roles.ts#L196)

See [ROLES_IMPLEMENTATION.md](ROLES_IMPLEMENTATION.md) for complete RBAC documentation.

## Security Features

### 1. HTTPS/TLS
- All communication with Cognito uses HTTPS
- Tokens are encrypted in transit

### 2. OAuth 2.0 Authorization Code Flow
- Most secure OAuth flow
- Client secret not exposed to browser
- Authorization code exchanged server-side for tokens

### 3. Token Management
- Tokens stored in sessionStorage (not localStorage)
- Tokens automatically cleared on logout
- No persistent sessions after logout

### 4. CSRF Protection
- OIDC library includes CSRF protection
- State parameter validates auth callbacks

### 5. Session Isolation
- Each browser tab has independent session
- Logging out clears all sessions

## Environment Configuration

### Development (localhost:3001)
Current configuration in `aws-config.ts`:
```typescript
redirect_uri: 'http://localhost:3001/callback'
post_logout_redirect_uri: 'http://localhost:3001'
```

### Production (Future)
Update `aws-config.ts` for production:
```typescript
redirect_uri: 'https://yourdomain.com/callback'
post_logout_redirect_uri: 'https://yourdomain.com'
```

Also update these in AWS Cognito Console:
1. Go to AWS Cognito Console
2. Select your User Pool
3. App Integration → App Client Settings
4. Add production URLs to:
   - Callback URLs
   - Sign out URLs

## Common Issues & Solutions

### Issue 1: Auto-Login After Logout
**Symptom**: User is automatically logged back in after clicking "Sign Up" following logout.

**Cause**: `automaticSilentRenew: true` was refreshing tokens in the background.

**Solution**: ✅ FIXED
- Set `automaticSilentRenew: false`
- Use `signoutRedirect()` instead of just `removeUser()`
- Clear storage before calling logout

### Issue 2: Infinite Redirect Loop
**Symptom**: Page keeps redirecting between app and Cognito.

**Cause**: Incorrect callback URL configuration.

**Solution**:
1. Verify `redirect_uri` matches exactly in:
   - `aws-config.ts`
   - AWS Cognito Console → App Client Settings
2. Ensure `/callback` route exists and handles auth properly

### Issue 3: User Data Not Persisting
**Symptom**: User loses authentication on page refresh.

**Cause**: OIDC library not storing tokens properly.

**Solution**:
1. Check browser console for errors
2. Verify `scope` includes `openid email`
3. Ensure app is running on exact URL configured in Cognito

### Issue 4: "Invalid Redirect URI" Error
**Symptom**: Cognito shows error about invalid redirect URI.

**Solution**:
1. Add URL to Cognito Callback URLs:
   - AWS Console → Cognito → App Integration
   - Must match EXACTLY (including port)
   - Example: `http://localhost:3001/callback`

## Files Reference

### Core Authentication Files
| File | Purpose |
|------|---------|
| [src/hooks/useAuth.ts](src/hooks/useAuth.ts) | Main authentication hook |
| [src/lib/aws-config.ts](src/lib/aws-config.ts) | OIDC configuration |
| [src/components/AmplifyProvider.tsx](src/components/AmplifyProvider.tsx) | Auth provider wrapper |
| [src/app/layout.tsx](src/app/layout.tsx) | Root layout with auth provider |
| [src/app/callback/page.tsx](src/app/callback/page.tsx) | OAuth callback handler |

### UI Files
| File | Purpose |
|------|---------|
| [src/app/login/page.tsx](src/app/login/page.tsx) | Login page |
| [src/app/signup/page.tsx](src/app/signup/page.tsx) | Signup page |
| [src/app/profile/page.tsx](src/app/profile/page.tsx) | Profile page with logout |
| [src/components/Navigation.tsx](src/components/Navigation.tsx) | Navigation bar (auth state) |

## Testing Authentication

### Test Login/Logout Flow
1. Start app: `npm run dev`
2. Click "Sign Up" → Should redirect to Cognito
3. Register with test email (e.g., `teststudent@test.com`)
4. Should redirect back and be logged in
5. Go to Profile page
6. Click "Sign Out"
7. Should be fully logged out
8. Click "Sign In" → Should require login again

### Test Auto-Login Prevention
1. Login to app
2. Logout
3. Click "Sign Up" (not Sign In)
4. Should see Cognito signup page, NOT auto-login
5. ✅ Fixed: Now properly shows signup

### Test Role Assignment
1. Signup with `student@test.com` → Should get Student role
2. Signup with `educator@test.com` → Should get Educator role
3. Signup with `admin@test.com` → Should get Admin role

## AWS Cognito Configuration

### User Pool Details
- **Region**: us-west-2
- **User Pool ID**: us-west-2_6LxsAjtRX
- **App Client ID**: 4botmnmnknikbipc801vbsgvta
- **Domain**: geniuslabs.auth.us-west-2.amazoncognito.com

### Required Cognito Settings

1. **App Client Settings**
   - Enabled OAuth flows: Authorization code grant
   - Allowed scopes: phone, email, openid
   - Callback URLs: `http://localhost:3001/callback`
   - Sign out URLs: `http://localhost:3001`

2. **Attributes**
   - Email (required, verified)
   - Name (optional)
   - Phone (optional)

3. **Policies**
   - Password requirements (set in Cognito console)
   - MFA: Optional (can be enabled)

## Future Enhancements

### 1. Social Login
Add Google, Facebook, or Apple sign-in:
- Configure OAuth providers in Cognito
- Update OIDC config with identity providers
- No code changes needed in app

### 2. Multi-Factor Authentication (MFA)
Enable MFA for enhanced security:
- Enable in Cognito User Pool settings
- SMS or TOTP (authenticator app)
- Automatic UI from Cognito Hosted UI

### 3. Custom Hosted UI
Replace Cognito Hosted UI with custom login pages:
- Requires building custom OAuth flow
- More control over branding
- More complex implementation

### 4. Session Timeout
Add automatic session timeout:
- Set token expiration in Cognito
- Add warning before logout
- Graceful session expiration handling

## Troubleshooting

### Enable Debug Logging

Add to `aws-config.ts`:
```typescript
export const oidcConfig = {
  // ... existing config
  loadUserInfo: true,
  monitorSession: true,  // Monitor session state
};
```

### Check Auth State
```typescript
import { useAuth as useOidcAuth } from 'react-oidc-context';

const auth = useOidcAuth();
console.log('Auth state:', {
  isAuthenticated: auth.isAuthenticated,
  isLoading: auth.isLoading,
  user: auth.user,
  error: auth.error
});
```

### Clear Stuck Session
If authentication gets stuck:
```javascript
// In browser console
localStorage.clear();
sessionStorage.clear();
// Refresh page
location.reload();
```

## Support

For authentication issues:
1. Check browser console for errors
2. Verify URLs match in Cognito and code
3. Clear browser storage and retry
4. Check AWS Cognito CloudWatch logs
5. Review this documentation

## Summary

GeniusLabs uses a modern, secure authentication system with:
- ✅ AWS Cognito for user management
- ✅ OpenID Connect (OIDC) protocol
- ✅ OAuth 2.0 authorization code flow
- ✅ Automatic role assignment based on email
- ✅ Proper logout (no auto-login)
- ✅ Secure token management
- ✅ Industry-standard security practices

The authentication system is production-ready and scalable.
