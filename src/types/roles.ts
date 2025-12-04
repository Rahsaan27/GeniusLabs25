/**
 * GeniusLabs Role-Based Access Control (RBAC)
 *
 * This file defines the role types and permissions for the GeniusLabs platform.
 */

export type UserRole = 'student' | 'genius' | 'educator' | 'admin' | 'superadmin';

export interface UserPermissions {
  // Learning Material Access
  canAccessLearningMaterial: boolean;

  // Cohort Permissions
  canAccessCohort: boolean;
  canChatInCohort: boolean;
  canMakeAnnouncements: boolean;
  canEditUserList: boolean;
  canAccessAllCohorts: boolean;
  requiresCohortPassword: boolean; // Students need password, admins/educators don't

  // Content Management
  canEditLessons: boolean;
  canEditModules: boolean;
  canManageContent: boolean;

  // User Management
  canManageUsers: boolean;
  canAssignRoles: boolean;

  // Admin Features
  canAccessAdminPanel: boolean;
  canViewAnalytics: boolean;
}

export interface RoleDefinition {
  role: UserRole;
  displayName: string;
  description: string;
  permissions: UserPermissions;
}

/**
 * Role Definitions with Permissions
 */
export const ROLE_DEFINITIONS: Record<UserRole, RoleDefinition> = {
  student: {
    role: 'student',
    displayName: 'Student',
    description: 'Student with access to learning materials only (no cohort access)',
    permissions: {
      // Learning Material Access
      canAccessLearningMaterial: true,

      // Cohort Permissions - STUDENTS CANNOT ACCESS COHORTS
      canAccessCohort: false,
      canChatInCohort: false,
      canMakeAnnouncements: false,
      canEditUserList: false,
      canAccessAllCohorts: false,
      requiresCohortPassword: true,

      // Content Management
      canEditLessons: false,
      canEditModules: false,
      canManageContent: false,

      // User Management
      canManageUsers: false,
      canAssignRoles: false,

      // Admin Features
      canAccessAdminPanel: false,
      canViewAnalytics: false,
    }
  },

  genius: {
    role: 'genius',
    displayName: 'Genius',
    description: 'Genius Labs student with cohort access and learning materials',
    permissions: {
      // Learning Material Access
      canAccessLearningMaterial: true,

      // Cohort Permissions - GENIUS HAS COHORT ACCESS
      canAccessCohort: true,
      canChatInCohort: true,
      canMakeAnnouncements: false,
      canEditUserList: false,
      canAccessAllCohorts: false,
      requiresCohortPassword: true, // Genius needs password to join cohorts

      // Content Management
      canEditLessons: false,
      canEditModules: false,
      canManageContent: false,

      // User Management
      canManageUsers: false,
      canAssignRoles: false,

      // Admin Features
      canAccessAdminPanel: false,
      canViewAnalytics: false,
    }
  },

  educator: {
    role: 'educator',
    displayName: 'Educator',
    description: 'Teacher with cohort management capabilities',
    permissions: {
      // Learning Material Access
      canAccessLearningMaterial: true,

      // Cohort Permissions
      canAccessCohort: true,
      canChatInCohort: true,
      canMakeAnnouncements: true,
      canEditUserList: true,
      canAccessAllCohorts: false, // Only their assigned cohorts
      requiresCohortPassword: true, // Educators need password for cohorts they don't manage

      // Content Management
      canEditLessons: false,
      canEditModules: false,
      canManageContent: false,

      // User Management
      canManageUsers: false,
      canAssignRoles: false,

      // Admin Features
      canAccessAdminPanel: false,
      canViewAnalytics: true, // Can view analytics for their cohorts
    }
  },

  admin: {
    role: 'admin',
    displayName: 'Administrator',
    description: 'Full system access and control',
    permissions: {
      // Learning Material Access
      canAccessLearningMaterial: true,

      // Cohort Permissions
      canAccessCohort: true,
      canChatInCohort: true,
      canMakeAnnouncements: true,
      canEditUserList: true,
      canAccessAllCohorts: true,
      requiresCohortPassword: false, // Admins bypass password requirement

      // Content Management
      canEditLessons: true,
      canEditModules: true,
      canManageContent: true,

      // User Management
      canManageUsers: true,
      canAssignRoles: true,

      // Admin Features
      canAccessAdminPanel: true,
      canViewAnalytics: true,
    }
  },

  superadmin: {
    role: 'superadmin',
    displayName: 'Super Administrator',
    description: 'Ultimate system access with all permissions',
    permissions: {
      // Learning Material Access
      canAccessLearningMaterial: true,

      // Cohort Permissions
      canAccessCohort: true,
      canChatInCohort: true,
      canMakeAnnouncements: true,
      canEditUserList: true,
      canAccessAllCohorts: true,
      requiresCohortPassword: false, // Superadmins bypass password requirement

      // Content Management
      canEditLessons: true,
      canEditModules: true,
      canManageContent: true,

      // User Management
      canManageUsers: true,
      canAssignRoles: true,

      // Admin Features
      canAccessAdminPanel: true,
      canViewAnalytics: true,
    }
  }
};

/**
 * Helper function to get permissions for a role
 */
export function getPermissions(role: UserRole): UserPermissions {
  return ROLE_DEFINITIONS[role].permissions;
}

/**
 * Helper function to check if a role has a specific permission
 */
export function hasPermission(
  role: UserRole,
  permission: keyof UserPermissions
): boolean {
  return ROLE_DEFINITIONS[role].permissions[permission];
}

/**
 * Default role for new users
 */
export const DEFAULT_ROLE: UserRole = 'student';

/**
 * Determine role based on email
 */
export function getRoleFromEmail(email: string): UserRole {
  const lowerEmail = email.toLowerCase();

  // Superadmin - specific email(s)
  if (lowerEmail.includes('rahsaanyj') || lowerEmail === 'rahsaan@geniuslabs.com') {
    return 'superadmin';
  }

  // Admin - emails containing "admin"
  if (lowerEmail.includes('admin')) {
    return 'admin';
  }

  // Educator - emails containing "educator"
  if (lowerEmail.includes('educator')) {
    return 'educator';
  }

  // Genius - emails containing "genius"
  if (lowerEmail.includes('genius')) {
    return 'genius';
  }

  // Student - emails containing "student" or default
  if (lowerEmail.includes('student')) {
    return 'student';
  }

  // Default to student role (no cohort access)
  return 'student';
}

/**
 * Email to Role Mapping Entry
 */
export interface EmailRoleMapping {
  email: string;
  role: UserRole;
  assignedBy?: string;
  assignedAt?: string;
  cohortIds?: string[]; // For educators, which cohorts they manage
}
