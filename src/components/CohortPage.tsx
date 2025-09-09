'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CohortSelector from '@/components/CohortSelector';
import CohortChat from '@/components/CohortChat';
import AdminPanel from '@/components/AdminPanel';
import { AdminProvider, useAdmin } from '@/hooks/useAdmin';
import { Cohort } from '@/types/cohort';
import cohortImage from '@/assets/Cohort.png';

function CohortPageContent() {
  const [userCohort, setUserCohort] = useState<Cohort | null>(null);
  const [showSelector, setShowSelector] = useState(false);
  const [currentUser] = useState({
    id: 'user-' + Math.random().toString(36).substr(2, 9),
    name: 'Student ' + Math.floor(Math.random() * 1000)
  });
  const { isAdmin, setIsAdmin } = useAdmin();
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const savedCohort = localStorage.getItem('userCohort');
    const userRole = localStorage.getItem('userRole');
    if (savedCohort) {
      setUserCohort(JSON.parse(savedCohort));
    }
    if (userRole === 'admin') {
      setIsAdmin(true);
    }
  }, [setIsAdmin]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDropdown) {
        const target = event.target as Element;
        if (!target.closest('.dropdown-container')) {
          setShowDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleCohortSelect = (cohort: Cohort) => {
    setUserCohort(cohort);
    // Check if user logged in as admin
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin') {
      setIsAdmin(true);
    }
  };

  const handleLeaveCohort = () => {
    localStorage.removeItem('userCohort');
    localStorage.removeItem('userRole');
    setUserCohort(null);
    setIsAdmin(false);
  };

  if (!userCohort) {
    return (
      <div className="min-h-screen flex bg-black">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-black/40 z-10"></div>
          <Image
            src={cohortImage}
            alt="Students collaborating in a cohort - Join the community"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-8 left-8 z-20 text-white">
            <h3 className="text-2xl font-bold mb-2">Connect & Collaborate</h3>
            <p className="text-lg opacity-90">Join your local learning community</p>
          </div>
          {/* Top overlay with features */}
          {/* <div className="absolute top-8 right-8 z-20">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-white">
              <h4 className="font-bold text-sm mb-2">💬 Cohort Features</h4>
              <ul className="text-xs space-y-1 opacity-90">
                <li>• Real-time messaging</li>
                <li>• Private group spaces</li>
                <li>• Local peer connections</li>
                <li>• Collaborative learning</li>
              </ul>
            </div>
          </div> */}
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Mobile Image */}
            <div className="lg:hidden mb-8 relative h-48 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-black/40 z-10"></div>
              <Image
                src={cohortImage}
                alt="Students collaborating in a cohort"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 z-20 text-white">
                <h3 className="text-lg font-bold">Connect & Collaborate</h3>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Join Your Cohort
              </h2>
              <p className="text-gray-300">
                Connect with your peers and instructors in your local cohort space
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-white mb-2">Cohort Chat</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Connect with students in your area. Share knowledge, ask questions, and build lasting friendships through collaborative learning.
                </p>
              </div>

              <button
                onClick={() => setShowSelector(true)}
                className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-400/25 transform hover:scale-105"
              >
                Find My Cohort
              </button>

              {/* Features Grid - Only on larger screens */}
              <div className="hidden sm:grid grid-cols-2 gap-3 mt-6">
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 text-center">
                  <div className="text-lg mb-1">⚡</div>
                  <div className="font-semibold text-white text-xs">Real-time Chat</div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 text-center">
                  <div className="text-lg mb-1">🔒</div>
                  <div className="font-semibold text-white text-xs">Private Groups</div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 text-center">
                  <div className="text-lg mb-1">📍</div>
                  <div className="font-semibold text-white text-xs">Local Focus</div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 text-center">
                  <div className="text-lg mb-1">🤝</div>
                  <div className="font-semibold text-white text-xs">Peer Learning</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Powered by Hidden Genius Project & GeniusLabs
              </p>
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
      {/* Mobile Header */}
      <div className="md:hidden fixed top-20 left-0 right-0 h-12 bg-gray-900 border-b border-gray-700 flex items-center px-4 z-50">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="text-gray-400 hover:text-white p-1 rounded mr-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex-1">
          <div className="font-bold text-white text-sm truncate">{userCohort.location}</div>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowAdminPanel(!showAdminPanel)}
            className={`px-2 py-1 rounded text-xs font-medium ml-2 transition-colors ${
              showAdminPanel 
                ? 'bg-blue-400 text-black' 
                : 'bg-blue-400/20 text-blue-400 hover:bg-blue-400/30'
            }`}
            title="Toggle Admin Panel"
          >
            {showAdminPanel ? 'Hide Admin' : 'Admin'}
          </button>
        )}
      </div>

      {/* Desktop Server Bar */}
      <div className="hidden md:flex fixed top-20 left-0 w-20 h-[calc(100vh-5rem)] bg-gray-900 border-r border-gray-700 flex-col items-center py-4 z-10">
        <div className="w-12 h-12 bg-green-400 rounded-2xl hover:rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-200 cursor-pointer">
          💬
        </div>
        <div className="w-8 h-px bg-gray-700 mb-4"></div>
        <div className="w-12 h-12 bg-gray-700 rounded-full hover:rounded-2xl flex items-center justify-center text-lg font-bold text-white transition-all duration-200 cursor-pointer hover:bg-green-400 hover:text-black">
          {userCohort.location.charAt(0)}
        </div>
        {isAdmin && (
          <>
            <div className="w-8 h-px bg-gray-700 mb-4 mt-4"></div>
            <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center text-lg transition-all duration-200 cursor-pointer hover:bg-blue-400/30">
              👨‍🏫
            </div>
          </>
        )}
      </div>

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div className="md:hidden fixed inset-0 top-32 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowSidebar(false)}></div>
          <div className="relative w-64 h-full bg-gray-800 border-r border-gray-700">
            {/* Sidebar content for mobile */}
            <div className="flex flex-col h-full">
              <div className="h-12 px-4 border-b border-gray-700 flex items-center justify-between">
                <div className="text-sm text-gray-400">Channels</div>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="text-gray-400 hover:text-white p-1 rounded"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Text Channels</div>
                <div className="flex items-center px-2 py-1 rounded text-gray-300 bg-gray-700/50 mb-4">
                  <span className="mr-2">#</span>
                  <span className="text-sm font-medium">{userCohort.name.toLowerCase().replace(/\s+/g, '-')}</span>
                </div>
                
                {isAdmin && (
                  <>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Admin Tools</div>
                    <div className="space-y-1 mb-4">
                      <div className="flex items-center px-2 py-1 rounded text-blue-400 text-sm">
                        <span className="mr-2">📢</span>
                        <span>Announcements</span>
                      </div>
                      <div className="flex items-center px-2 py-1 rounded text-green-400 text-sm">
                        <span className="mr-2">📚</span>
                        <span>Assignments</span>
                      </div>
                      <div className="flex items-center px-2 py-1 rounded text-purple-400 text-sm">
                        <span className="mr-2">👥</span>
                        <span>Students</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="h-16 px-3 bg-gray-900/50 border-t border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-black ${
                    isAdmin ? 'bg-blue-400' : 'bg-green-400'
                  }`}>
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm text-white truncate">{currentUser.name}</div>
                    {isAdmin && <div className="text-xs text-blue-400">Teacher</div>}
                  </div>
                </div>
                <button
                  onClick={handleLeaveCohort}
                  className="text-gray-400 hover:text-red-400 p-1 rounded transition-colors"
                  title="Leave Cohort"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Channel Sidebar */}
      <div className="hidden md:flex fixed top-20 left-20 w-64 h-[calc(100vh-5rem)] bg-gray-800 border-r border-gray-700 flex-col z-10">
        <div className="h-16 px-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex-1">
            <div className="font-bold text-white truncate">{userCohort.location}</div>
            {isAdmin && (
              <div className="text-xs text-blue-400 font-medium">Teacher Mode</div>
            )}
          </div>
          <div className="flex space-x-2">
            <div className="relative dropdown-container">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-gray-400 hover:text-white p-1 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showDropdown && (
                <div className="absolute top-8 right-0 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 min-w-[160px]">
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setShowAdminPanel(!showAdminPanel);
                        setShowDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors flex items-center space-x-2 ${
                        showAdminPanel ? 'text-blue-400' : 'text-gray-300'
                      }`}
                    >
                      <span>👨‍🏫</span>
                      <span>{showAdminPanel ? 'Hide Admin Panel' : 'Show Admin Panel'}</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setShowSelector(true);
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <span>🔄</span>
                    <span>Change Cohort</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Text Channels</div>
          <div className="flex items-center px-2 py-1 rounded text-gray-300 bg-gray-700/50 mb-4">
            <span className="mr-2">#</span>
            <span className="text-sm font-medium">{userCohort.name.toLowerCase().replace(/\s+/g, '-')}</span>
          </div>
          
          {isAdmin && (
            <>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Admin Tools</div>
              <div className="space-y-1 mb-4">
                <div className="flex items-center px-2 py-1 rounded text-blue-400 text-sm">
                  <span className="mr-2">📢</span>
                  <span>Announcements</span>
                </div>
                <div className="flex items-center px-2 py-1 rounded text-green-400 text-sm">
                  <span className="mr-2">📚</span>
                  <span>Assignments</span>
                </div>
                <div className="flex items-center px-2 py-1 rounded text-purple-400 text-sm">
                  <span className="mr-2">👥</span>
                  <span>Students</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="h-16 px-3 bg-gray-900/50 border-t border-gray-700 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-black ${
              isAdmin ? 'bg-blue-400' : 'bg-green-400'
            }`}>
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="text-sm text-white truncate">{currentUser.name}</div>
              {isAdmin && <div className="text-xs text-blue-400">Teacher</div>}
            </div>
          </div>
          <button
            onClick={handleLeaveCohort}
            className="text-gray-400 hover:text-red-400 p-1 rounded transition-colors"
            title="Leave Cohort"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Small Screen Admin Panel Modal */}
      {showAdminPanel && isAdmin && (
        <div className="lg:hidden fixed inset-0 top-32 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAdminPanel(false)}></div>
          <div className="relative w-full h-full bg-gray-900 overflow-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Admin Panel</h2>
              <button
                onClick={() => setShowAdminPanel(false)}
                className="text-gray-400 hover:text-white p-1 rounded"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <AdminPanel cohortId={userCohort.id} cohortName={userCohort.name} />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="fixed top-32 md:top-20 left-0 md:left-84 right-0 bottom-0 h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)] flex">
        {/* Chat Area */}
        <div className={`w-full ${isAdmin && showAdminPanel ? 'lg:w-1/2 border-r border-gray-700' : 'w-full'}`}>
          <CohortChat cohort={userCohort} currentUser={currentUser} />
        </div>
        
        {/* Desktop Admin Panel - only show on large screens and when toggled */}
        {isAdmin && showAdminPanel && (
          <div className="hidden lg:block w-1/2">
            <AdminPanel cohortId={userCohort.id} cohortName={userCohort.name} />
          </div>
        )}
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

export default function CohortPage() {
  return (
    <AdminProvider>
      <CohortPageContent />
    </AdminProvider>
  );
}