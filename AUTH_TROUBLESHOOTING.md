# Authentication Troubleshooting Guide

## Issue: Stuck on Loading Animation During Login/Signup

### Symptoms
- Click "Sign In" or "Sign Up" button
- See loading animation indefinitely
- Never redirected to Cognito login page
- Page doesn't respond

### Root Cause
This is typically caused by cached authentication state in the browser after configuration changes.

### Solutions

## Solution 1: Clear Browser Cache (Recommended)

### Option A: Hard Refresh
1. **Close all browser tabs** with the app open
2. **Open browser DevTools** (F12 or Right-click → Inspect)
3. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
4. In the left sidebar, find:
   - **Local Storage** → `http://localhost:3001` → Right-click → **Clear**
   - **Session Storage** → `http://localhost:3001` → Right-click → **Clear**
5. **Close DevTools**
6. **Hard refresh** the page:
   - **Mac**: Cmd + Shift + R
   - **Windows/Linux**: Ctrl + Shift + R
7. Try login again

### Option B: Browser Console Method
1. Open browser console (F12 → Console tab)
2. Paste this code and press Enter:
   ```javascript
   localStorage.clear();
   sessionStorage.clear();
   location.reload();
   ```
3. Try login again

### Option C: Incognito/Private Window
1. Open a **new incognito/private window**
2. Navigate to `http://localhost:3001`
3. Try login - should work immediately

## Solution 2: Reset Auth State via Callback Page

If you can access the app:

1. Navigate to: `http://localhost:3001/callback`
2. Click the **"Reset Auth State"** button
3. You'll be redirected to login
4. Try again

## Solution 3: Complete Browser Reset

If above solutions don't work:

1. **Close browser completely**
2. **Clear all browsing data**:
   - Chrome: Settings → Privacy → Clear browsing data → All time
   - Firefox: Settings → Privacy → Clear Data
   - Check: Cookies, Cached files, Local storage
3. **Restart browser**
4. Navigate to `http://localhost:3001`
5. Try login

## Solution 4: Development Server Restart

Sometimes the dev server needs a restart:

```bash
# Stop the development server (Ctrl+C)
npm run dev
```

## Prevention: Avoiding This Issue

### After Making Auth Changes
When authentication configuration changes are made:

1. **Always clear browser cache** immediately
2. **Use incognito window** for testing
3. **Restart dev server** after config changes

### For Development
Add this bookmark to quickly clear cache:

```javascript
javascript:(function(){localStorage.clear();sessionStorage.clear();alert('Cache cleared! Refreshing...');location.reload();})();
```

1. Create a new bookmark
2. Name it "Clear Auth Cache"
3. Paste the above code as the URL
4. Click it anytime you have auth issues

## Common Error Messages

### "Authentication timeout reached"
- **Cause**: OIDC library couldn't complete auth flow
- **Solution**: Clear cache + hard refresh

### "Infinite loading spinner"
- **Cause**: Cached tokens conflicting with new config
- **Solution**: Clear localStorage and sessionStorage

### "Cannot read properties of undefined"
- **Cause**: Auth state inconsistency
- **Solution**: Reset auth state via callback page

## Verification Steps

After clearing cache, verify auth is working:

1. ✅ Login button should redirect to Cognito
2. ✅ Cognito login page should load
3. ✅ After login, should redirect back to app
4. ✅ User should be logged in
5. ✅ Navigation should show Profile

## Technical Details

### What Changed
Recent updates to fix auto-login issue:

1. **Disabled automaticSilentRenew**
   - Prevents background token refresh
   - Stops auto-login after logout

2. **Updated logout flow**
   - Now uses `signoutRedirect()` instead of `removeUser()`
   - Properly clears Cognito server-side session

3. **Removed onSigninCallback**
   - Was interfering with OAuth callback processing

### Why Cache Clearing is Needed

The OIDC library (`react-oidc-context`) stores tokens in `sessionStorage`:
- `oidc.user:{authority}:{client_id}`
- Old tokens can conflict with new config
- Clearing forces fresh authentication

## Still Having Issues?

### Check Browser Console
1. Open DevTools → Console
2. Look for red error messages
3. Common issues:
   - CORS errors → Check Cognito callback URLs
   - Network errors → Check internet connection
   - Config errors → Verify `aws-config.ts`

### Verify Cognito Configuration
1. Go to AWS Cognito Console
2. Check App Client Settings:
   - Callback URL: `http://localhost:3001/callback`
   - Sign out URL: `http://localhost:3001`
   - Enabled OAuth flows: **Authorization code grant**
   - Scopes: **phone, email, openid**

### Check Dev Server
```bash
# Ensure server is running on correct port
npm run dev

# Should show:
# - Local: http://localhost:3001
```

### Environment Variables
Verify `.env.local` exists (shouldn't be needed for auth, but good to check):
```env
# Auth is configured in src/lib/aws-config.ts
# No environment variables needed for OIDC
```

## Quick Fix Summary

**Most Common Solution:**
1. Clear browser storage (localStorage + sessionStorage)
2. Hard refresh (Cmd/Ctrl + Shift + R)
3. Try again

**Still stuck?**
1. Use incognito window
2. Or restart browser completely

## For Deployment

When deploying to production:

1. **Update callback URLs** in `aws-config.ts`:
   ```typescript
   redirect_uri: 'https://yourdomain.com/callback',
   post_logout_redirect_uri: 'https://yourdomain.com',
   ```

2. **Update Cognito Console**:
   - Add production URLs to callback/signout URLs
   - Keep localhost URLs for development

3. **Clear user sessions** if changing config:
   - Notify users to clear cache
   - Or increment app version to force refresh

## Contact Support

If none of these solutions work:
1. Check browser console for errors
2. Verify AWS Cognito is running
3. Confirm network connectivity
4. Review [AUTHENTICATION.md](AUTHENTICATION.md) for detailed flow
