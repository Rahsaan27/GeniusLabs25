'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/hooks/useAdmin';
import { Assignment, Announcement } from '@/types/cohort';
import { modules } from '@/data/lessons';
import { PlusCircle, Megaphone, BookOpen, Users, Settings, X, Calendar, Clock, AlertCircle } from 'lucide-react';

interface AdminPanelProps {
  cohortId: string;
  cohortName: string;
}

export default function AdminPanel({ cohortId, cohortName }: AdminPanelProps) {
  const { assignments, announcements, addAssignment, addAnnouncement, removeAssignment, removeAnnouncement } = useAdmin();
  const [activeTab, setActiveTab] = useState<'overview' | 'announcements' | 'assignments' | 'students'>('overview');
  const [showCreateForm, setShowCreateForm] = useState<'announcement' | 'assignment' | null>(null);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'assignments', label: 'Assignments', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-900 border border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            <p className="text-gray-400 text-sm">{cohortName}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-green-400/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center">
              <Settings size={12} className="mr-1" />
              Teacher Mode
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-400/10 text-green-400 border-b-2 border-green-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && (
          <AdminOverview 
            cohortId={cohortId}
            assignments={assignments}
            announcements={announcements}
            onCreateAnnouncement={() => setShowCreateForm('announcement')}
            onCreateAssignment={() => setShowCreateForm('assignment')}
          />
        )}

        {activeTab === 'announcements' && (
          <AnnouncementsTab
            announcements={announcements}
            onCreateAnnouncement={() => setShowCreateForm('announcement')}
            onRemoveAnnouncement={removeAnnouncement}
          />
        )}

        {activeTab === 'assignments' && (
          <AssignmentsTab
            assignments={assignments}
            onCreateAssignment={() => setShowCreateForm('assignment')}
            onRemoveAssignment={removeAssignment}
          />
        )}

        {activeTab === 'students' && (
          <StudentsTab cohortId={cohortId} />
        )}
      </div>

      {/* Create Forms */}
      {showCreateForm && (
        <CreateFormModal
          type={showCreateForm}
          cohortId={cohortId}
          onClose={() => setShowCreateForm(null)}
          onCreateAnnouncement={addAnnouncement}
          onCreateAssignment={addAssignment}
        />
      )}
    </div>
  );
}

// Overview Tab Component
function AdminOverview({ 
  cohortId, 
  assignments, 
  announcements, 
  onCreateAnnouncement, 
  onCreateAssignment 
}: {
  cohortId: string;
  assignments: Assignment[];
  announcements: Announcement[];
  onCreateAnnouncement: () => void;
  onCreateAssignment: () => void;
}) {
  const recentAnnouncements = announcements.slice(0, 3);
  const recentAssignments = assignments.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onCreateAnnouncement}
          className="bg-blue-400/10 hover:bg-blue-400/20 border border-blue-400/20 rounded-xl p-6 text-left transition-colors group"
        >
          <div className="flex items-center mb-3">
            <Megaphone className="text-blue-400 mr-3" size={24} />
            <h3 className="text-white font-semibold">Create Announcement</h3>
          </div>
          <p className="text-gray-400 text-sm group-hover:text-gray-300">
            Share important updates with your students
          </p>
        </button>

        <button
          onClick={onCreateAssignment}
          className="bg-green-400/10 hover:bg-green-400/20 border border-green-400/20 rounded-xl p-6 text-left transition-colors group"
        >
          <div className="flex items-center mb-3">
            <BookOpen className="text-green-400 mr-3" size={24} />
            <h3 className="text-white font-semibold">Assign Lessons</h3>
          </div>
          <p className="text-gray-400 text-sm group-hover:text-gray-300">
            Assign modules and lessons to students
          </p>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Announcements */}
        <div className="bg-gray-800/50 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Megaphone size={16} className="mr-2 text-blue-400" />
            Recent Announcements
          </h3>
          {recentAnnouncements.length > 0 ? (
            <div className="space-y-3">
              {recentAnnouncements.map(announcement => (
                <div key={announcement.id} className="bg-gray-700/50 rounded-lg p-3">
                  <h4 className="text-white text-sm font-medium">{announcement.title}</h4>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">{announcement.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No announcements yet</p>
          )}
        </div>

        {/* Recent Assignments */}
        <div className="bg-gray-800/50 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <BookOpen size={16} className="mr-2 text-green-400" />
            Recent Assignments
          </h3>
          {recentAssignments.length > 0 ? (
            <div className="space-y-3">
              {recentAssignments.map(assignment => (
                <div key={assignment.id} className="bg-gray-700/50 rounded-lg p-3">
                  <h4 className="text-white text-sm font-medium">{assignment.title}</h4>
                  <p className="text-gray-400 text-xs mt-1">{assignment.lessonIds.length} lessons</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No assignments yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Announcements Tab
function AnnouncementsTab({ 
  announcements, 
  onCreateAnnouncement, 
  onRemoveAnnouncement 
}: {
  announcements: Announcement[];
  onCreateAnnouncement: () => void;
  onRemoveAnnouncement: (id: string) => void;
}) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-blue-400 bg-blue-400/10';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold">Announcements ({announcements.length})</h3>
        <button
          onClick={onCreateAnnouncement}
          className="bg-blue-400 hover:bg-blue-500 text-black px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
        >
          <PlusCircle size={16} className="mr-2" />
          New Announcement
        </button>
      </div>

      {announcements.length > 0 ? (
        <div className="space-y-3">
          {announcements.map(announcement => (
            <div key={announcement.id} className="bg-gray-800/50 rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-medium">{announcement.title}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority}
                  </span>
                  <button
                    onClick={() => onRemoveAnnouncement(announcement.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-3">{announcement.content}</p>
              <div className="flex items-center text-gray-400 text-xs">
                <Clock size={12} className="mr-1" />
                {new Date(announcement.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <Megaphone size={48} className="mx-auto mb-4 opacity-50" />
          <p>No announcements yet. Create your first one!</p>
        </div>
      )}
    </div>
  );
}

// Assignments Tab
function AssignmentsTab({ 
  assignments, 
  onCreateAssignment, 
  onRemoveAssignment 
}: {
  assignments: Assignment[];
  onCreateAssignment: () => void;
  onRemoveAssignment: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold">Assignments ({assignments.length})</h3>
        <button
          onClick={onCreateAssignment}
          className="bg-green-400 hover:bg-green-500 text-black px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
        >
          <PlusCircle size={16} className="mr-2" />
          New Assignment
        </button>
      </div>

      {assignments.length > 0 ? (
        <div className="space-y-3">
          {assignments.map(assignment => (
            <div key={assignment.id} className="bg-gray-800/50 rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-medium">{assignment.title}</h4>
                <button
                  onClick={() => onRemoveAssignment(assignment.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-gray-300 text-sm mb-3">{assignment.description}</p>
              <div className="flex items-center justify-between text-gray-400 text-xs">
                <span>{assignment.lessonIds.length} lessons • {assignment.completedBy.length} completed</span>
                {assignment.dueDate && (
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
          <p>No assignments yet. Create your first one!</p>
        </div>
      )}
    </div>
  );
}

// Students Tab
function StudentsTab({ cohortId }: { cohortId: string }) {
  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold">Students</h3>
      <div className="bg-gray-800/50 rounded-xl p-6 text-center">
        <Users size={48} className="mx-auto mb-4 opacity-50 text-gray-400" />
        <p className="text-gray-400">Student management coming soon!</p>
      </div>
    </div>
  );
}

// Create Form Modal
function CreateFormModal({
  type,
  cohortId,
  onClose,
  onCreateAnnouncement,
  onCreateAssignment
}: {
  type: 'announcement' | 'assignment';
  cohortId: string;
  onClose: () => void;
  onCreateAnnouncement: (announcement: Announcement) => void;
  onCreateAssignment: (assignment: Assignment) => void;
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'announcement') {
      const announcement: Announcement = {
        id: Date.now().toString(),
        title,
        content,
        createdAt: new Date(),
        createdBy: 'current-user-id',
        cohortId,
        priority
      };
      onCreateAnnouncement(announcement);
    } else {
      const assignment: Assignment = {
        id: Date.now().toString(),
        title,
        description: content,
        moduleId: selectedModule,
        lessonIds: selectedLessons,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        createdAt: new Date(),
        completedBy: []
      };
      onCreateAssignment(assignment);
    }
    
    onClose();
  };

  const selectedModuleData = modules.find(m => m.id === selectedModule);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            Create {type === 'announcement' ? 'Announcement' : 'Assignment'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400"
              placeholder={`Enter ${type} title...`}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              {type === 'announcement' ? 'Message' : 'Description'}
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400 h-32"
              placeholder={`Enter ${type} content...`}
              required
            />
          </div>

          {type === 'announcement' && (
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          )}

          {type === 'assignment' && (
            <>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Module
                </label>
                <select
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400"
                  required
                >
                  <option value="">Select a module...</option>
                  {modules.map(module => (
                    <option key={module.id} value={module.id}>
                      {module.title}
                    </option>
                  ))}
                </select>
              </div>

              {selectedModuleData && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Lessons ({selectedLessons.length} selected)
                  </label>
                  <div className="max-h-48 overflow-y-auto bg-gray-800 border border-gray-600 rounded-lg p-3 space-y-2">
                    {selectedModuleData.lessons.map(lesson => (
                      <label key={lesson.id} className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={selectedLessons.includes(lesson.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedLessons([...selectedLessons, lesson.id]);
                            } else {
                              setSelectedLessons(selectedLessons.filter(id => id !== lesson.id));
                            }
                          }}
                          className="mr-3 rounded border-gray-500 text-green-400 focus:ring-green-400"
                        />
                        <span className="text-gray-300">{lesson.title}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Due Date (Optional)
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400"
                />
              </div>
            </>
          )}

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-green-400 hover:bg-green-500 text-black rounded-lg font-medium transition-colors"
            >
              Create {type === 'announcement' ? 'Announcement' : 'Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}