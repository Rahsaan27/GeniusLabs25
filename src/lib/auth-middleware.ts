import { NextRequest, NextResponse } from 'next/server';
import { getUserRole } from '@/services/user-roles';
import { UserRole, getPermissions } from '@/types/roles';

/**
 * Middleware helper to check if user has required role
 */
export async function requireRole(
  email: string | null,
  requiredRoles: UserRole[]
): Promise<{ authorized: boolean; role?: UserRole; error?: string }> {
  if (!email) {
    return { authorized: false, error: 'Email is required' };
  }

  try {
    const userRole = await getUserRole(email);

    if (requiredRoles.includes(userRole)) {
      return { authorized: true, role: userRole };
    }

    return {
      authorized: false,
      error: `Insufficient permissions. Required role: ${requiredRoles.join(' or ')}`
    };
  } catch (error) {
    console.error('Error checking user role:', error);
    return { authorized: false, error: 'Failed to verify permissions' };
  }
}

/**
 * Middleware helper to check if user has specific permission
 */
export async function requirePermission(
  email: string | null,
  permission: string
): Promise<{ authorized: boolean; error?: string }> {
  if (!email) {
    return { authorized: false, error: 'Email is required' };
  }

  try {
    const userRole = await getUserRole(email);
    const permissions = getPermissions(userRole);

    if (permissions[permission as keyof typeof permissions]) {
      return { authorized: true };
    }

    return {
      authorized: false,
      error: `Insufficient permissions. Missing permission: ${permission}`
    };
  } catch (error) {
    console.error('Error checking user permission:', error);
    return { authorized: false, error: 'Failed to verify permissions' };
  }
}

/**
 * Helper to extract email from request headers or body
 */
export function getEmailFromRequest(request: NextRequest): string | null {
  // Try to get from query params
  const email = request.nextUrl.searchParams.get('userEmail');
  if (email) return email;

  // Could add support for JWT token validation here in the future
  return null;
}

/**
 * Create unauthorized response
 */
export function unauthorizedResponse(message: string = 'Unauthorized') {
  return NextResponse.json(
    { error: message },
    { status: 403 }
  );
}

/**
 * Check if user can access a cohort
 * Admins and superadmins can access all cohorts
 * Educators can access their assigned cohorts
 * Students need to be members of the cohort
 */
export async function canAccessCohort(
  email: string,
  cohortId: string,
  isMember: boolean = false
): Promise<boolean> {
  const userRole = await getUserRole(email);

  // Admins and superadmins can access all cohorts
  if (userRole === 'admin' || userRole === 'superadmin') {
    return true;
  }

  // Educators can access cohorts they manage
  if (userRole === 'educator') {
    // TODO: Check if educator is assigned to this cohort
    // For now, allow educators to access all cohorts
    return true;
  }

  // Students need to be members
  return isMember;
}
