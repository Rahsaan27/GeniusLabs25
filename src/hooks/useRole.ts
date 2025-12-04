import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { UserRole, UserPermissions, getPermissions, DEFAULT_ROLE, getRoleFromEmail } from '@/types/roles';

interface UseRoleReturn {
  role: UserRole;
  permissions: UserPermissions;
  loading: boolean;
  isAdmin: boolean;
  isEducator: boolean;
  isStudent: boolean;
  isGenius: boolean;
  isSuperAdmin: boolean;
  hasPermission: (permission: keyof UserPermissions) => boolean;
  refetchRole: () => Promise<void>;
}

/**
 * Custom hook to manage user roles and permissions
 */
export function useRole(): UseRoleReturn {
  const { user, isAuthenticated } = useAuth();
  const [role, setRole] = useState<UserRole>(DEFAULT_ROLE);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async () => {
    if (!isAuthenticated || !user?.email) {
      setRole(DEFAULT_ROLE);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/roles?email=${encodeURIComponent(user.email)}`);

      if (response.ok) {
        const data = await response.json();
        setRole(data.role || DEFAULT_ROLE);
      } else {
        // Fallback to email-based detection
        const detectedRole = getRoleFromEmail(user.email);
        setRole(detectedRole);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      // Fallback to email-based detection
      if (user?.email) {
        const detectedRole = getRoleFromEmail(user.email);
        setRole(detectedRole);
      } else {
        setRole(DEFAULT_ROLE);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, [isAuthenticated, user?.email]);

  const permissions = getPermissions(role);

  return {
    role,
    permissions,
    loading,
    isAdmin: role === 'admin',
    isEducator: role === 'educator',
    isStudent: role === 'student',
    isGenius: role === 'genius',
    isSuperAdmin: role === 'superadmin',
    hasPermission: (permission: keyof UserPermissions) => permissions[permission],
    refetchRole: fetchUserRole
  };
}
