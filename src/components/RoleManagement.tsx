'use client';

import { useState, useEffect } from 'react';
import { UserRole, ROLE_DEFINITIONS, EmailRoleMapping } from '@/types/roles';

export default function RoleManagement() {
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('genius');
  const [cohortIds, setCohortIds] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [allMappings, setAllMappings] = useState<EmailRoleMapping[]>([]);

  useEffect(() => {
    fetchAllMappings();
  }, []);

  const fetchAllMappings = async () => {
    try {
      // For now, we'll just show the mappings we've created
      // In production, you'd want to add a GET endpoint that returns all mappings
      // This is a placeholder for the UI functionality
      const response = await fetch('/api/roles/all');
      if (response.ok) {
        const data = await response.json();
        setAllMappings(data.mappings || []);
      }
    } catch (error) {
      console.error('Error fetching mappings:', error);
      // It's okay if this fails, we just won't show the list
    }
  };

  const handleAssignRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const cohortArray = cohortIds.trim() ? cohortIds.split(',').map(id => id.trim()) : [];

      const response = await fetch('/api/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          role: selectedRole,
          cohortIds: selectedRole === 'educator' ? cohortArray : undefined
        }),
      });

      if (response.ok) {
        setMessage(`✅ Successfully assigned ${selectedRole} role to ${email}`);
        setEmail('');
        setCohortIds('');
        fetchAllMappings(); // Refresh the list
      } else {
        const error = await response.json();
        setMessage(`❌ Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to assign role');
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'educator': return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      case 'genius': return 'bg-green-500/20 text-green-400 border-green-500/40';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
    }
  };

  return (
    <div className="space-y-8">
      {/* Assign Role Form */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-green-400/20">
        <h2 className="text-2xl font-bold text-white mb-4">Assign Role</h2>

        <form onSubmit={handleAssignRole} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {Object.values(ROLE_DEFINITIONS).map((def) => (
                <option key={def.role} value={def.role}>
                  {def.displayName} - {def.description}
                </option>
              ))}
            </select>
          </div>

          {selectedRole === 'educator' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Cohort IDs (comma-separated)
              </label>
              <input
                type="text"
                value={cohortIds}
                onChange={(e) => setCohortIds(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="cohort-1, cohort-2"
              />
              <p className="text-xs text-gray-400 mt-1">
                Enter cohort IDs that this educator will manage
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Assigning...' : 'Assign Role'}
          </button>

          {message && (
            <div className={`p-3 rounded-lg ${message.includes('✅') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {message}
            </div>
          )}
        </form>
      </div>

      {/* Current Role Mappings */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-green-400/20">
        <h2 className="text-2xl font-bold text-white mb-4">Current Role Assignments</h2>

        {allMappings.length === 0 ? (
          <p className="text-gray-400">No role assignments yet</p>
        ) : (
          <div className="space-y-2">
            {allMappings.map((mapping) => (
              <div
                key={mapping.email}
                className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-white font-medium">{mapping.email}</p>
                  {mapping.cohortIds && mapping.cohortIds.length > 0 && (
                    <p className="text-sm text-gray-400">
                      Cohorts: {mapping.cohortIds.join(', ')}
                    </p>
                  )}
                  {mapping.assignedAt && (
                    <p className="text-xs text-gray-500">
                      Assigned: {new Date(mapping.assignedAt).toLocaleString()}
                    </p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(mapping.role)}`}>
                  {ROLE_DEFINITIONS[mapping.role].displayName}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Role Definitions Reference */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-green-400/20">
        <h2 className="text-2xl font-bold text-white mb-4">Role Definitions</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {Object.values(ROLE_DEFINITIONS).map((def) => (
            <div
              key={def.role}
              className="p-4 bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-white">{def.displayName}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(def.role)}`}>
                  {def.role}
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-3">{def.description}</p>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-400 mb-1">Key Permissions:</p>
                {def.permissions.canAccessLearningMaterial && (
                  <p className="text-xs text-gray-400">✓ Learning materials</p>
                )}
                {def.permissions.canChatInCohort && (
                  <p className="text-xs text-gray-400">✓ Cohort chat</p>
                )}
                {def.permissions.canMakeAnnouncements && (
                  <p className="text-xs text-gray-400">✓ Make announcements</p>
                )}
                {def.permissions.canEditUserList && (
                  <p className="text-xs text-gray-400">✓ Edit user lists</p>
                )}
                {def.permissions.canAccessAllCohorts && (
                  <p className="text-xs text-gray-400">✓ All cohorts</p>
                )}
                {def.permissions.canManageContent && (
                  <p className="text-xs text-gray-400">✓ Manage content</p>
                )}
                {def.permissions.canAccessAdminPanel && (
                  <p className="text-xs text-gray-400">✓ Admin panel</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
