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
            <p className="text-gray-300 text-lg">
              Connect with your peers and instructors in your local cohort space
            </p>
          </div>

          <div className="max-w-lg mx-auto text-center">
            <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 border border-green-400/20 rounded-2xl p-8 mb-8 backdrop-blur-sm">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-2xl font-bold mb-4">Cohort Chat</h2>
              <p className="text-gray-300 mb-6">
                Connect with students in your area. Share knowledge, ask questions, and build lasting friendships through collaborative learning.
              </p>
              <button
                onClick={() => setShowSelector(true)}
                className="bg-green-400 hover:bg-green-500 text-black px-8 py-3 rounded-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Find My Cohort
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-semibold mb-1 text-white">Real-time Chat</div>
                <div className="text-gray-400">Instant messaging</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <div className="text-2xl mb-2">🔒</div>
                <div className="font-semibold mb-1 text-white">Private Groups</div>
                <div className="text-gray-400">Password protected</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <div className="text-2xl mb-2">📍</div>
                <div className="font-semibold mb-1 text-white">Local Focus</div>
                <div className="text-gray-400">Your area cohort</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <div className="text-2xl mb-2">🤝</div>
                <div className="font-semibold mb-1 text-white">Peer Learning</div>
                <div className="text-gray-400">Collaborative growth</div>
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
    <div className="h-screen bg-black overflow-hidden">
      {/* Discord-like Server Bar */}
      <div className="fixed top-20 left-0 w-20 h-[calc(100vh-5rem)] bg-gray-900 border-r border-gray-700 flex flex-col items-center py-4 z-10">
        <div className="w-12 h-12 bg-green-400 rounded-2xl hover:rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-200 cursor-pointer">
          💬
        </div>
        <div className="w-8 h-px bg-gray-700 mb-4"></div>
        <div className="w-12 h-12 bg-gray-700 rounded-full hover:rounded-2xl flex items-center justify-center text-lg font-bold text-white transition-all duration-200 cursor-pointer hover:bg-green-400 hover:text-black">
          {userCohort.location.charAt(0)}
        </div>
      </div>

      {/* Discord-like Channel Sidebar */}
      <div className="fixed top-20 left-20 w-64 h-[calc(100vh-5rem)] bg-gray-800 border-r border-gray-700 flex flex-col z-10">
        {/* Server Header */}
        <div className="h-16 px-4 border-b border-gray-700 flex items-center justify-between">
          <div className="font-bold text-white truncate">{userCohort.location}</div>
          <button
            onClick={() => setShowSelector(true)}
            className="text-gray-400 hover:text-white p-1 rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Channel List */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Text Channels</div>
          <div className="flex items-center px-2 py-1 rounded text-gray-300 bg-gray-700/50">
            <span className="mr-2">#</span>
            <span className="text-sm font-medium">{userCohort.name.toLowerCase().replace(/\s+/g, '-')}</span>
          </div>
        </div>

        {/* User Area */}
        <div className="h-16 px-3 bg-gray-900/50 border-t border-gray-700 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-sm font-bold text-black">
              {currentUser.name.charAt(0)}
            </div>
            <div className="text-sm text-white truncate">{currentUser.name}</div>
          </div>
          <button
            onClick={handleLeaveCohort}
            className="text-gray-400 hover:text-red-400 p-1 rounded transition-colors"
            title="Leave Cohort"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="fixed top-20 left-84 right-0 bottom-0 h-[calc(100vh-5rem)]">
        <CohortChat cohort={userCohort} currentUser={currentUser} />
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