'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Assignment, Announcement } from '@/types/cohort';

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  assignments: Assignment[];
  announcements: Announcement[];
  addAssignment: (assignment: Assignment) => void;
  addAnnouncement: (announcement: Announcement) => void;
  removeAssignment: (id: string) => void;
  removeAnnouncement: (id: string) => void;
  updateAssignmentCompletion: (assignmentId: string, userId: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    // Check if user has admin role
    const userRole = localStorage.getItem('userRole');
    setIsAdmin(userRole === 'admin');

    // Load stored assignments and announcements
    const storedAssignments = localStorage.getItem('cohortAssignments');
    const storedAnnouncements = localStorage.getItem('cohortAnnouncements');

    if (storedAssignments) {
      setAssignments(JSON.parse(storedAssignments));
    }
    if (storedAnnouncements) {
      setAnnouncements(JSON.parse(storedAnnouncements));
    }
  }, []);

  const addAssignment = (assignment: Assignment) => {
    const newAssignments = [...assignments, assignment];
    setAssignments(newAssignments);
    localStorage.setItem('cohortAssignments', JSON.stringify(newAssignments));
  };

  const addAnnouncement = (announcement: Announcement) => {
    const newAnnouncements = [...announcements, announcement];
    setAnnouncements(newAnnouncements);
    localStorage.setItem('cohortAnnouncements', JSON.stringify(newAnnouncements));
  };

  const removeAssignment = (id: string) => {
    const newAssignments = assignments.filter(a => a.id !== id);
    setAssignments(newAssignments);
    localStorage.setItem('cohortAssignments', JSON.stringify(newAssignments));
  };

  const removeAnnouncement = (id: string) => {
    const newAnnouncements = announcements.filter(a => a.id !== id);
    setAnnouncements(newAnnouncements);
    localStorage.setItem('cohortAnnouncements', JSON.stringify(newAnnouncements));
  };

  const updateAssignmentCompletion = (assignmentId: string, userId: string) => {
    const newAssignments = assignments.map(assignment => {
      if (assignment.id === assignmentId) {
        const completedBy = assignment.completedBy.includes(userId)
          ? assignment.completedBy.filter(id => id !== userId)
          : [...assignment.completedBy, userId];
        return { ...assignment, completedBy };
      }
      return assignment;
    });
    setAssignments(newAssignments);
    localStorage.setItem('cohortAssignments', JSON.stringify(newAssignments));
  };

  return (
    <AdminContext.Provider value={{
      isAdmin,
      setIsAdmin,
      assignments,
      announcements,
      addAssignment,
      addAnnouncement,
      removeAssignment,
      removeAnnouncement,
      updateAssignmentCompletion
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}