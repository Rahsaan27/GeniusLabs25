/**
 * GeniusLabs Role-Based Access Control (RBAC)
 *
 * This file defines the role types and permissions for the GeniusLabs platform.
 */

export type UserRole = 'genius' | 'educator' | 'admin';

export interface UserPermissions {
  // Learning Material Access
  canAccessLearningMaterial: boolean;

  // Cohort Permissions
  canAccessCohort: boolean;
  canChatInCohort: boolean;
  canMakeAnnouncements: boolean;
  canEditUserList: boolean;
  canAccessAllCohorts: boolean;

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
  genius: {
    role: 'genius',
    displayName: 'Genius',
    description: 'Student with access to learning materials and cohort chat',
    permissions: {
      // Learning Material Access
      canAccessLearningMaterial: true,

      // Cohort Permissions
      canAccessCohort: true,
      canChatInCohort: true,
      canMakeAnnouncements: false,
      canEditUserList: false,
      canAccessAllCohorts: false,

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
export const DEFAULT_ROLE: UserRole = 'genius';

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
