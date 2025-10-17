'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CohortSelector from '@/components/CohortSelector';
import CohortChat from '@/components/CohortChat';
import { Cohort } from '@/types/cohort';
import cohortImage from '@/assets/Cohort.png';

export default function CohortPage() {
  const [userCohort, setUserCohort] = useState<Cohort | null>(null);
  const [showSelector, setShowSelector] = useState(false);
  const [activeChannel, setActiveChannel] = useState('general');
  const [showMembers, setShowMembers] = useState(false);
  const [currentUser] = useState(() => {
    return {
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      name: 'Student ' + Math.floor(Math.random() * 1000)
    };
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
      <div className="min-h-screen bg-black">
        <div className="min-h-screen flex">
          {/* Left Side - Image */}
          <div className="hidden lg:flex lg:w-1/2 relative">
            <Image
              src={cohortImage}
              alt="Students collaborating in a cohort - Join the community"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-12 left-12 text-white">
              <h3 className="text-4xl font-bold mb-2">
                Connect & Collaborate
              </h3>
              <p className="text-lg text-gray-300">Join your local learning community</p>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8">
              {/* Mobile Image */}
              <div className="lg:hidden mb-8 relative h-56 rounded-lg overflow-hidden">
                <Image
                  src={cohortImage}
                  alt="Students collaborating in a cohort"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>

              <div className="text-center">
                <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  <span className="block text-white">
                    Join Your
                  </span>
                  <span className="block text-green-500 mt-2">
                    Cohort
                  </span>
                </h2>
                <p className="text-xl text-gray-400">
                  Connect with your peers in your
                  <span className="text-green-500"> local cohort space</span>
                </p>
              </div>

              {/* Main card */}
              <div className="bg-black border border-gray-700 rounded-lg p-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Cohort Chat
                  </h3>
                </div>

                <button
                  onClick={() => setShowSelector(true)}
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-6 rounded-lg transition-colors duration-200"
                >
                  Find My Cohort
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Powered by <span className="text-green-500">Hidden Genius Project</span> & <span className="text-green-500">GeniusLabs</span>
                </p>
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

  const channels = [
    { id: 'general', name: 'General', icon: '#' },
    { id: 'announcements', name: 'Announcements', icon: '📢' },
  ];

  const pods = [
    { id: 'pod-business', name: 'Business', icon: '💼' },
    { id: 'pod-ai', name: 'AI', icon: '🤖' },
    { id: 'pod-webdesign', name: 'Web Design', icon: '🎨' },
  ];

  return (
    <div className="fixed top-20 left-0 right-0 bottom-0 bg-black flex flex-col">
      {/* Top Header - Fixed */}
      <div className="h-16 px-6 border-b border-gray-800 bg-black flex items-center justify-between z-10">
        <div className="flex items-center space-x-6">
          <Link
            href="/modules"
            className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>All Modules</span>
          </Link>
          <div className="h-6 w-px bg-gray-800"></div>
          <div>
            <h1 className="text-xl font-bold text-white">{userCohort.name}</h1>
            <p className="text-sm text-gray-400">{userCohort.location}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowMembers(!showMembers)}
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Members
          </button>
          <button
            onClick={() => setShowSelector(true)}
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-colors"
          >
            Change Cohort
          </button>
          <button
            onClick={handleLeaveCohort}
            className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 border border-red-900/50 hover:border-red-800 hover:bg-red-950/30 rounded-lg transition-colors"
          >
            Leave
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Channels */}
        <div className="w-60 bg-gray-900/50 border-r border-gray-800 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {/* Channels Section */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Channels
              </h3>
              <div className="space-y-1">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeChannel === channel.id
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                    }`}
                  >
                    <span>{channel.icon}</span>
                    <span>{channel.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pods Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Pods
              </h3>
              <div className="space-y-1">
                {pods.map((pod) => (
                  <button
                    key={pod.id}
                    onClick={() => setActiveChannel(pod.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeChannel === pod.id
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                    }`}
                  >
                    <div className="w-6 h-6 bg-green-400/10 border border-green-400/30 backdrop-blur-sm rounded flex items-center justify-center text-sm">
                      {pod.icon}
                    </div>
                    <span>{pod.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User Info at Bottom */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {currentUser.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1">
            <CohortChat
              cohort={userCohort}
              currentUser={currentUser}
              activeChannel={activeChannel}
            />
          </div>

          {/* Members Sidebar (conditionally shown) */}
          {showMembers && (
            <div className="w-60 bg-gray-900/50 border-l border-gray-800 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-white mb-4">
                  Members — {userCohort.members.length + 1}
                </h3>
                <div className="space-y-2">
                  {/* Current User */}
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
                    <div className="relative">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {currentUser.name.charAt(0)}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{currentUser.name}</p>
                      <p className="text-xs text-gray-500">You</p>
                    </div>
                  </div>

                  {/* Other Members */}
                  {userCohort.members.map((member, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {member.charAt(0)}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                      </div>
                      <p className="text-sm text-gray-300">{member}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
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