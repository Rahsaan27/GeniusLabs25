import React, { useState, useEffect } from 'react';
import { cohortLocations } from '@/data/cohorts';
import { Cohort } from '@/types/cohort';
import { useRole } from '@/hooks/useRole';
import { useAuth } from '@/hooks/useAuth';

interface CohortSelectorProps {
  onCohortSelect: (cohort: Cohort) => void;
  onClose: () => void;
}

export default function CohortSelector({ onCohortSelect, onClose }: CohortSelectorProps) {
  const { user } = useAuth();
  const { role, permissions, loading: roleLoading } = useRole();
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [step, setStep] = useState<'location' | 'cohort' | 'password'>('location');

  const activeLocations = cohortLocations.filter(loc => loc.cohortCount > 0);

  // Check if user needs password (students need it, admins/superadmins don't)
  const requiresPassword = permissions?.requiresCohortPassword ?? true;

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
    setStep('cohort');
  };

  const handleCohortSelect = (cohort: Cohort) => {
    setSelectedCohort(cohort);

    // If user doesn't require password (admin/superadmin), join directly
    if (!requiresPassword) {
      const cohortWithUserInfo = {
        ...cohort,
        userRole: role
      };
      localStorage.setItem('userCohort', JSON.stringify(cohortWithUserInfo));
      if (role) {
        localStorage.setItem('userRole', role);
      }
      onCohortSelect(cohortWithUserInfo);
      onClose();
    } else {
      setStep('password');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCohort) return;

    // Check password - default cohort password is '0000' for students
    const isCorrectPassword = passwordInput === selectedCohort.password || passwordInput === '0000';

    if (isCorrectPassword) {
      const cohortWithUserInfo = {
        ...selectedCohort,
        userRole: role
      };
      localStorage.setItem('userCohort', JSON.stringify(cohortWithUserInfo));
      if (role) {
        localStorage.setItem('userRole', role);
      }
      onCohortSelect(cohortWithUserInfo);
      onClose();
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPasswordInput('');
    }
  };

  const handleBack = () => {
    if (step === 'password') {
      setStep('cohort');
      setPasswordError('');
      setPasswordInput('');
    } else if (step === 'cohort') {
      setStep('location');
      setSelectedLocation('');
    }
  };

  const selectedLocationData = cohortLocations.find(loc => loc.id === selectedLocation);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-gray-900 rounded-2xl border border-green-400/20 shadow-2xl mx-4 max-w-2xl w-full max-h-[75vh] flex flex-col my-8 mt-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center space-x-3">
            {step !== 'location' && (
              <button
                onClick={handleBack}
                className="text-gray-400 hover:text-white p-1 rounded transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h2 className="text-2xl font-bold text-white">
              {step === 'location' && 'Select Your Site'}
              {step === 'cohort' && `${selectedLocationData?.fullName} Cohorts`}
              {step === 'password' && 'Enter Cohort Password'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 scrollbar-thin">
          {/* Step 1: Location Selection */}
          {step === 'location' && (
            <div className="space-y-4">
              <p className="text-gray-300 mb-6">
                Choose your site location to access local cohorts.
              </p>
              <div className="grid gap-3">
                {activeLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleLocationSelect(location.id)}
                    className="group flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-700 hover:border-green-400/40 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-400/10 rounded-lg flex items-center justify-center text-2xl">
                        📍
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-white">{location.fullName}</h3>
                        <p className="text-sm text-gray-400">{location.cohortCount} active cohorts</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Cohort Selection */}
          {step === 'cohort' && selectedLocationData && (
            <div className="space-y-4">
              <p className="text-gray-300 mb-6">
                Select a cohort to join in {selectedLocationData.fullName}.
              </p>
              <div className="grid gap-3">
                {selectedLocationData.cohorts.map((cohort) => (
                  <button
                    key={cohort.id}
                    onClick={() => handleCohortSelect(cohort)}
                    className="group flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-700 hover:border-green-400/40 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-400/10 rounded-lg flex items-center justify-center text-lg font-bold text-green-400">
                        {cohort.number}
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-white">{cohort.name}</h3>
                        <p className="text-sm text-gray-400">{cohort.members.length} members • Password protected</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Password Entry */}
          {step === 'password' && selectedCohort && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  🔐
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{selectedCohort.name}</h3>
                <p className="text-gray-300 mb-6">
                  This cohort is password protected. Enter the password provided by your instructor.
                </p>
                {role === 'student' && (
                  <div className="bg-blue-400/10 border border-blue-400/20 rounded-lg p-3 mb-4">
                    <p className="text-blue-400 text-xs">
                      💡 <strong>Tip:</strong> Ask your instructor for the cohort password
                    </p>
                  </div>
                )}
              </div>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError('');
                    }}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
                    autoFocus
                  />
                  {passwordError && (
                    <p className="text-red-400 text-sm mt-2">{passwordError}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={!passwordInput.trim()}
                  className="w-full bg-green-400 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Join Cohort
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}