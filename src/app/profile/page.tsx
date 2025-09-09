'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { modules } from '@/data/lessons';
import { getModuleProgress, getUserProgress } from '@/utils/progress';
import { User, Settings, Trophy, BookOpen, Clock, Award, LogOut, Edit2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [userStats, setUserStats] = useState({
    totalLessonsCompleted: 0,
    totalModulesCompleted: 0,
    totalTimeSpent: 0,
    currentStreak: 0,
    totalScore: 0,
    achievements: [] as string[]
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Calculate user statistics
  useEffect(() => {
    const calculateStats = () => {
      let totalCompleted = 0;
      let totalScore = 0;
      let modulesCompleted = 0;
      const achievements: string[] = [];

      modules.forEach(module => {
        const progress = getModuleProgress(module.id, module.lessons.map(l => l.id));
        totalCompleted += progress.completed;
        
        if (progress.percentage === 100) {
          modulesCompleted++;
        }

        // Calculate total score from individual lessons
        module.lessons.forEach(lesson => {
          const lessonProgress = getUserProgress(lesson.id);
          if (lessonProgress?.score) {
            totalScore += lessonProgress.score;
          }
        });
      });

      // Achievement calculations
      if (totalCompleted >= 5) achievements.push('First Steps');
      if (totalCompleted >= 15) achievements.push('Learning Momentum');
      if (totalCompleted >= 30) achievements.push('Knowledge Seeker');
      if (modulesCompleted >= 1) achievements.push('Module Master');
      if (modulesCompleted >= 3) achievements.push('Multi-Skilled');
      if (totalScore >= 1000) achievements.push('High Achiever');

      setUserStats({
        totalLessonsCompleted: totalCompleted,
        totalModulesCompleted: modulesCompleted,
        totalTimeSpent: totalCompleted * 5, // Estimate 5 min per lesson
        currentStreak: 7, // Mock data
        totalScore,
        achievements
      });
    };

    calculateStats();
  }, []);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        // Use window.location for a clean redirect
        window.location.href = '/';
      } else {
        console.error('Logout failed:', result.error);
        // Force redirect anyway
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Force redirect anyway
      window.location.href = '/';
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  const achievements = [
    { id: 'first-steps', name: 'First Steps', description: 'Completed your first 5 lessons', icon: '🎯', unlocked: userStats.achievements.includes('First Steps') },
    { id: 'learning-momentum', name: 'Learning Momentum', description: 'Completed 15 lessons', icon: '⚡', unlocked: userStats.achievements.includes('Learning Momentum') },
    { id: 'knowledge-seeker', name: 'Knowledge Seeker', description: 'Completed 30 lessons', icon: '📚', unlocked: userStats.achievements.includes('Knowledge Seeker') },
    { id: 'module-master', name: 'Module Master', description: 'Completed your first module', icon: '🏆', unlocked: userStats.achievements.includes('Module Master') },
    { id: 'multi-skilled', name: 'Multi-Skilled', description: 'Completed 3 modules', icon: '🌟', unlocked: userStats.achievements.includes('Multi-Skilled') },
    { id: 'high-achiever', name: 'High Achiever', description: 'Earned 1000+ total points', icon: '👑', unlocked: userStats.achievements.includes('High Achiever') },
    { id: 'streak-warrior', name: 'Streak Warrior', description: 'Maintained a 7-day learning streak', icon: '🔥', unlocked: userStats.currentStreak >= 7 },
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-black text-2xl font-bold">
                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user.name || 'Anonymous User'}</h1>
                <p className="text-gray-300">{user.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm bg-green-400/20 text-green-400 px-3 py-1 rounded-full">
                    🔥 {userStats.currentStreak} day streak
                  </span>
                  <span className="text-sm bg-blue-400/20 text-blue-400 px-3 py-1 rounded-full">
                    Level {Math.floor(userStats.totalLessonsCompleted / 10) + 1}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 space-x-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 mb-3 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Edit2 size={16} />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-1 bg-gray-900 rounded-lg p-1 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'achievements', label: 'Achievements', icon: Trophy },
            { id: 'progress', label: 'Progress', icon: BookOpen },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-green-400 text-black font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-400/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-green-400" size={20} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Lessons Completed</p>
                  <p className="text-2xl font-bold text-white">{userStats.totalLessonsCompleted}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center">
                  <Trophy className="text-blue-400" size={20} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Modules Completed</p>
                  <p className="text-2xl font-bold text-white">{userStats.totalModulesCompleted}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-400/20 rounded-lg flex items-center justify-center">
                  <Clock className="text-purple-400" size={20} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Time Spent</p>
                  <p className="text-2xl font-bold text-white">{userStats.totalTimeSpent}m</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                  <Award className="text-yellow-400" size={20} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Score</p>
                  <p className="text-2xl font-bold text-white">{userStats.totalScore}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Your Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`bg-gray-900 rounded-2xl p-6 border transition-all duration-200 ${
                    achievement.unlocked
                      ? 'border-green-400/40 bg-green-400/5'
                      : 'border-gray-700 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{achievement.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                    {achievement.unlocked ? (
                      <span className="bg-green-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                        Unlocked!
                      </span>
                    ) : (
                      <span className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full text-xs">
                        Locked
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Learning Progress</h2>
            <div className="space-y-4">
              {modules.slice(0, 6).map((module) => {
                const progress = getModuleProgress(module.id, module.lessons.map(l => l.id));
                return (
                  <div key={module.id} className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{module.title}</h3>
                        <p className="text-gray-400 text-sm">{module.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-green-400">{progress.percentage}%</span>
                        <p className="text-gray-400 text-sm">{progress.completed}/{progress.total} lessons</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-green-400 transition-all duration-500"
                        style={{ width: `${progress.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
            
            {/* Profile Settings */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Display Name</label>
                  <input
                    type="text"
                    defaultValue={user.name || ''}
                    // disabled={!isEditing}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                    placeholder="Enter your display name"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    disabled
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white opacity-50"
                  />
                </div>
                <div className="">
                  <button className='border border-green-400 rounded-lg p-2 text-green-400 w-20 
                  hover:duration-300 hover:bg-green-400 hover:text-white'>Save</button>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Learning Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Email Notifications</p>
                    <p className="text-gray-400 text-sm">Receive updates about your progress</p>
                  </div>
                  <button className="w-12 h-6 bg-green-400 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 transition-transform"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Daily Reminders</p>
                    <p className="text-gray-400 text-sm">Get reminded to continue learning</p>
                  </div>
                  <button className="w-12 h-6 bg-gray-600 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 transition-transform"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-red-600/40">
              <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Reset All Progress
                </button>
                <button className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-lg transition-colors ml-2">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}