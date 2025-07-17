'use client';

import React, { useState, useEffect } from 'react';
import CohortSelector from '@/components/CohortSelector';
import CohortChat from '@/components/CohortChat';
import { Cohort } from '@/types/cohort';

export default function CohortPage() {
  const [userCohort, setUserCohort] = useState<Cohort | null>(null);
  const [showSelector, setShowSelector] = useState(false);
  const [currentUser] = useState({
    id: 'user-' + Math.random().toString(36).substr(2, 9),
    name: 'Student ' + Math.floor(Math.random() * 1000)
  });

  useEffect(() => {
    const savedCohort = localStorage.getItem('userCohort');
    if (savedCohort) {
      setUserCohort(JSON.parse(savedCohort));
    }
  }, []);

  const handleCohortSelect = (cohort: Cohort) => {
    setUserCohort(cohort);
  };

  const handleLeaveCohort = () => {
    localStorage.removeItem('userCohort');
    setUserCohort(null);
  };

  if (!userCohort) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Join Your Cohort</h1>
            <p className="text-gray-400 text-lg">
              Connect with your peers and instructors in your local cohort space
            </p>
          </div>

          <div className="max-w-md mx-auto text-center">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 mb-8">
              <div className="text-6xl mb-4">👥</div>
              <h2 className="text-2xl font-bold mb-4">Cohort Collaboration</h2>
              <p className="text-green-100 mb-6">
                Join group discussions, ask questions, share resources, and collaborate with students in your area.
              </p>
              <button
                onClick={() => setShowSelector(true)}
                className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Find My Cohort
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="text-2xl mb-2">💬</div>
                <div className="font-semibold mb-1">Group Chat</div>
                <div className="text-gray-400">Real-time messaging</div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="text-2xl mb-2">📚</div>
                <div className="font-semibold mb-1">Share Resources</div>
                <div className="text-gray-400">Help each other learn</div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="text-2xl mb-2">🤝</div>
                <div className="font-semibold mb-1">Peer Support</div>
                <div className="text-gray-400">Learn together</div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold mb-1">Local Focus</div>
                <div className="text-gray-400">Your area cohort</div>
              </div>
            </div>
          </div>
        </div>

        {showSelector && (
          <CohortSelector
            onCohortSelect={handleCohortSelect}
            onClose={() => setShowSelector(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-black">Cohort Space</h1>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {userCohort.name}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSelector(true)}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Switch Cohort
            </button>
            <button
              onClick={handleLeaveCohort}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Leave Cohort
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg h-[calc(100vh-120px)]">
          <CohortChat cohort={userCohort} currentUser={currentUser} />
        </div>
      </div>

      {showSelector && (
        <CohortSelector
          onCohortSelect={handleCohortSelect}
          onClose={() => setShowSelector(false)}
        />
      )}
    </div>
  );
}