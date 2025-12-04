'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { modules } from '@/data/lessons';
import { getModuleProgress, getUserProgress } from '@/utils/progress';
import { User, Settings, Trophy, BookOpen, Clock, Award, LogOut, Edit2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    totalLessonsCompleted: 0,
    totalModulesCompleted: 0,
    totalTimeSpent: 0,
    currentStreak: 0,
    totalScore: 0,
    achievements: [] as string[]
  });
  const [moduleProgress, setModuleProgress] = useState<{[key: string]: {completed: number, total: number, percentage: number}}>({});

  // Settings state
  const [displayName, setDisplayName] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Load profile settings from API when user loads
  useEffect(() => {
    const loadProfileSettings = async () => {
      if (!user?.email) return;

      try {
        // Try to load from API first
        const response = await fetch(`/api/profile?email=${user.email}`);
        if (response.ok) {
          const data = await response.json();
          const profile = data.profile;

          if (profile) {
            setDisplayName(profile.displayName || user.name || '');
            setEmailNotifications(profile.emailNotifications ?? true);
            setDailyReminders(profile.dailyReminders ?? false);
            return;
          }
        }

        // Fallback to localStorage
        const savedProfile = localStorage.getItem(`profile_${user.email}`);
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          setDisplayName(profile.displayName || user.name || '');
          setEmailNotifications(profile.emailNotifications ?? true);
          setDailyReminders(profile.dailyReminders ?? false);
        } else if (user.name) {
          setDisplayName(user.name);
        }
      } catch (error) {
        console.error('Error loading profile settings:', error);
        // Fallback to user.name if API fails
        if (user.name) {
          setDisplayName(user.name);
        }
      }
    };

    loadProfileSettings();
  }, [user?.email, user?.name]);

  // Redirect if not authenticated (after auth loading is done)
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch and calculate real user statistics from DynamoDB
  useEffect(() => {
    const fetchAndCalculateStats = async () => {
      // Wait for auth to be ready
      if (authLoading) {
        return;
      }

      if (!user?.email || !isAuthenticated) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // Fetch all user progress from DynamoDB
        const response = await fetch(`/api/user-progress?userId=${user.email}`);

        if (!response.ok) {
          throw new Error('Failed to fetch user progress');
        }

        const data = await response.json();
        const progressData = data.progress || [];

        let totalLessonsCompleted = 0;
        let totalModulesCompleted = 0;
        let totalTimeSpent = 0;
        let totalScore = 0;
        let lastAccessTimestamp = 0;

        // Calculate stats from DynamoDB data
        progressData.forEach((progress: any) => {
          // Count lessons completed
          const lessonsCompleted = progress.lessonsCompleted?.length || 0;
          totalLessonsCompleted += lessonsCompleted;

          // Count completed modules
          if (progress.isCompleted) {
            totalModulesCompleted++;
          }

          // Sum up time spent
          if (progress.timeSpent) {
            totalTimeSpent += progress.timeSpent;
          }

          // Calculate total score from quiz scores
          if (progress.quizScores) {
            Object.values(progress.quizScores).forEach((score: any) => {
              totalScore += score;
            });
          }

          // Track last access date for streak calculation
          if (progress.lastAccessedAt) {
            const accessTimestamp = new Date(progress.lastAccessedAt).getTime();
            if (accessTimestamp > lastAccessTimestamp) {
              lastAccessTimestamp = accessTimestamp;
            }
          }
        });

        // Calculate current streak (simple version - days since last access)
        let currentStreak = 0;
        if (lastAccessTimestamp > 0) {
          const daysSinceLastAccess = Math.floor(
            (Date.now() - lastAccessTimestamp) / (1000 * 60 * 60 * 24)
          );
          // If accessed within last 24 hours, count as active streak
          currentStreak = daysSinceLastAccess <= 1 ? 1 : 0;
        }

        // Calculate achievements based on real data
        const achievements: string[] = [];
        if (totalLessonsCompleted >= 5) achievements.push('First Steps');
        if (totalLessonsCompleted >= 15) achievements.push('Learning Momentum');
        if (totalLessonsCompleted >= 30) achievements.push('Knowledge Seeker');
        if (totalModulesCompleted >= 1) achievements.push('Module Master');
        if (totalModulesCompleted >= 3) achievements.push('Multi-Skilled');
        if (totalScore >= 1000) achievements.push('High Achiever');

        setUserStats({
          totalLessonsCompleted,
          totalModulesCompleted,
          totalTimeSpent: totalTimeSpent || totalLessonsCompleted * 5, // Fallback to estimate
          currentStreak,
          totalScore,
          achievements
        });

        // Build module progress map for the Progress tab
        const progressMap: {[key: string]: {completed: number, total: number, percentage: number}} = {};
        progressData.forEach((progress: any) => {
          const module = modules.find(m => m.id === progress.moduleId);
          if (module) {
            const completed = progress.lessonsCompleted?.length || 0;
            const total = module.lessons.length;
            progressMap[module.id] = {
              completed,
              total,
              percentage: total > 0 ? Math.round((completed / total) * 100) : 0
            };
          }
        });

        // Fill in modules not in DB with zero progress
        modules.forEach(module => {
          if (!progressMap[module.id] && !module.comingSoon) {
            progressMap[module.id] = {
              completed: 0,
              total: module.lessons.length,
              percentage: 0
            };
          }
        });

        setModuleProgress(progressMap);
      } catch (error) {
        console.error('Error fetching user stats:', error);

        // Fallback to localStorage if DynamoDB fails
        let totalCompleted = 0;
        let totalScore = 0;
        let modulesCompleted = 0;

        modules.forEach(module => {
          if (!module.comingSoon) {
            const progress = getModuleProgress(module.id, module.lessons.map(l => l.id));
            totalCompleted += progress.completed;

            if (progress.percentage === 100) {
              modulesCompleted++;
            }

            module.lessons.forEach(lesson => {
              const lessonProgress = getUserProgress(lesson.id);
              if (lessonProgress?.score) {
                totalScore += lessonProgress.score;
              }
            });
          }
        });

        const achievements: string[] = [];
        if (totalCompleted >= 5) achievements.push('First Steps');
        if (totalCompleted >= 15) achievements.push('Learning Momentum');
        if (totalCompleted >= 30) achievements.push('Knowledge Seeker');
        if (modulesCompleted >= 1) achievements.push('Module Master');
        if (modulesCompleted >= 3) achievements.push('Multi-Skilled');
        if (totalScore >= 1000) achievements.push('High Achiever');

        setUserStats({
          totalLessonsCompleted: totalCompleted,
          totalModulesCompleted: modulesCompleted,
          totalTimeSpent: totalCompleted * 5,
          currentStreak: 0,
          totalScore,
          achievements
        });

        // Build fallback module progress map from localStorage
        const progressMap: {[key: string]: {completed: number, total: number, percentage: number}} = {};
        modules.forEach(module => {
          if (!module.comingSoon) {
            const progress = getModuleProgress(module.id, module.lessons.map(l => l.id));
            progressMap[module.id] = progress;
          }
        });
        setModuleProgress(progressMap);
      } finally {
        setLoading(false);
      }
    };

    fetchAndCalculateStats();
  }, [user?.email, isAuthenticated, authLoading]);

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

  const handleSaveProfile = async () => {
    if (!user?.email) return;

    setSavingProfile(true);
    setSaveMessage('');

    try {
      // Save to Profile API in DynamoDB
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          displayName,
          emailNotifications,
          dailyReminders,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      const data = await response.json();

      // Also save to localStorage as backup
      localStorage.setItem(`profile_${user.email}`, JSON.stringify({
        displayName,
        emailNotifications,
        dailyReminders,
      }));

      setSaveMessage('Profile saved successfully!');
      setIsEditing(false);

      // Clear message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);

      // Reload after a short delay to show updated name everywhere
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveMessage('Failed to save profile. Please try again.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleResetProgress = async () => {
    if (!user?.email) return;

    const confirmed = window.confirm(
      'Are you sure you want to reset all your progress? This action cannot be undone.'
    );

    if (!confirmed) return;

    try {
      // Clear localStorage progress
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('lesson_') || key.startsWith('module_')) {
          localStorage.removeItem(key);
        }
      });

      // Delete all progress from DynamoDB
      const progressData = await fetch(`/api/user-progress?userId=${user.email}`);
      if (progressData.ok) {
        const data = await progressData.json();
        const deletePromises = data.progress.map((prog: any) =>
          fetch(`/api/user-progress?userId=${user.email}&moduleId=${prog.moduleId}`, {
            method: 'DELETE',
          })
        );
        await Promise.all(deletePromises);
      }

      alert('All progress has been reset.');
      window.location.reload();
    } catch (error) {
      console.error('Error resetting progress:', error);
      alert('Failed to reset progress. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!user?.email) return;

    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This will permanently delete all your data and cannot be undone.'
    );

    if (!confirmed) return;

    const doubleConfirm = window.confirm(
      'This is your last chance. Are you absolutely sure you want to delete your account?'
    );

    if (!doubleConfirm) return;

    try {
      // Reset all progress first
      await handleResetProgress();

      // Clear all user data from localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.includes(user.email)) {
          localStorage.removeItem(key);
        }
      });

      alert('Your account has been deleted. You will now be logged out.');
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please contact support.');
    }
  };

  // Show loading state while auth is loading
  if (authLoading || (!isAuthenticated || !user)) {
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
          <>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading your statistics...</p>
              </div>
            ) : (
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
          </>
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
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading your progress...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {modules.filter(m => !m.comingSoon).map((module) => {
                  const progress = moduleProgress[module.id] || { completed: 0, total: module.lessons.length, percentage: 0 };
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
            )}
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
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    disabled={!isEditing}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:border-green-400 focus:outline-none transition-colors"
                    placeholder="Enter your display name"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white opacity-50"
                  />
                  <p className="text-gray-500 text-xs mt-1">Email cannot be changed</p>
                </div>

                {saveMessage && (
                  <div className={`p-3 rounded-lg ${saveMessage.includes('success') ? 'bg-green-500/20 border border-green-500/40 text-green-400' : 'bg-red-500/20 border border-red-500/40 text-red-400'}`}>
                    <p className="text-sm">{saveMessage}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className='border border-green-400 rounded-lg px-4 py-2 text-green-400 hover:bg-green-400 hover:text-black transition-colors font-medium'
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleSaveProfile}
                        disabled={savingProfile}
                        className='bg-green-400 rounded-lg px-4 py-2 text-black hover:bg-green-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        {savingProfile ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setDisplayName(user.name || '');
                        }}
                        className='border border-gray-600 rounded-lg px-4 py-2 text-gray-400 hover:bg-gray-800 transition-colors font-medium'
                      >
                        Cancel
                      </button>
                    </>
                  )}
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
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${emailNotifications ? 'bg-green-400' : 'bg-gray-600'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 ${emailNotifications ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Daily Reminders</p>
                    <p className="text-gray-400 text-sm">Get reminded to continue learning</p>
                  </div>
                  <button
                    onClick={() => setDailyReminders(!dailyReminders)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${dailyReminders ? 'bg-green-400' : 'bg-gray-600'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 ${dailyReminders ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={savingProfile}
                    className='bg-green-400 rounded-lg px-4 py-2 text-black hover:bg-green-500 transition-colors font-medium text-sm disabled:opacity-50'
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-red-600/40">
              <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
              <p className="text-gray-400 text-sm mb-4">These actions cannot be undone. Please be certain.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleResetProgress}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset All Progress
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-800 hover:bg-red-900 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
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