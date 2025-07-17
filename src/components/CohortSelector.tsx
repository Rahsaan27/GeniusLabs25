import React, { useState } from 'react';
import { cohortLocations } from '@/data/cohorts';
import { cohortStyles } from '@/data/cohortStyles';
import { Cohort } from '@/types/cohort';

interface CohortSelectorProps {
  onCohortSelect: (cohort: Cohort) => void;
  onClose: () => void;
}

export default function CohortSelector({ onCohortSelect, onClose }: CohortSelectorProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const handleCohortJoin = (cohort: Cohort) => {
    // Save to localStorage
    localStorage.setItem('userCohort', JSON.stringify(cohort));
    onCohortSelect(cohort);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 mx-4 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-black">Join Your Cohort</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <p className="text-gray-600 mb-8">
          Choose your city and connect with local peers and instructors.
        </p>

        <div className="space-y-6">
          {cohortStyles.filter(style => style.cohortCount > 0).map((style) => {
            const location = cohortLocations.find(loc => loc.id === style.id);
            if (!location) return null;

            return (
              <div key={style.id} className={`relative overflow-hidden rounded-2xl border-2 ${style.accent} ${style.bgPattern} backdrop-blur-sm`}>
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${style.gradient} p-6 text-white relative`}>
                  <div className="absolute top-4 right-4 text-3xl">{style.emoji}</div>
                  <h3 className="text-2xl font-bold mb-2">{style.fullName}</h3>
                  <p className="text-white/90 mb-3">{style.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="bg-black/20 px-3 py-1 rounded-full text-sm font-medium">
                      📍 {style.location}
                    </span>
                    <span className="bg-black/20 px-3 py-1 rounded-full text-sm font-medium">
                      👥 {style.cohortCount} cohorts
                    </span>
                  </div>
                </div>

                {/* Cohort Selection */}
                <div className="p-6 bg-white/95">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Available Cohorts:</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {location.cohorts.map((cohort) => (
                      <button
                        key={cohort.id}
                        onClick={() => handleCohortJoin(cohort)}
                        className={`group relative overflow-hidden bg-gradient-to-br ${style.gradient} text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                      >
                        <div className="relative z-10">
                          <div className="font-bold text-lg mb-1">{cohort.name}</div>
                          <div className="text-white/80 text-sm mb-2">
                            {cohort.members.length} members
                          </div>
                          <div className="text-xs bg-black/20 px-2 py-1 rounded-full inline-block">
                            Click to Join →
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Can't find your cohort? Contact your instructor for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}