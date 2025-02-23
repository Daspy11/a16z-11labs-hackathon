import { useState, useEffect } from 'react';

export interface Issue {
  id: string;
  status: 'inProgress' | 'todo' | 'backlog' | 'done';
  title: string;
  date: string;
  source: 'slack' | 'github' | 'gmail' | 'gcal' | 'whatsapp' | 'linear' | 'zendesk';
  priority?: boolean;
  comments?: number;
  description?: string;
  assignee?: string;
}

// Initial mock data
const initialIssues: Issue[] = [{
  id: 'DEL-96',
  status: 'inProgress',
  title: 'Richmond: Create voice agents ahead of launch',
  date: 'Feb 21',
  source: 'slack',
  priority: true,
  description: 'Set up initial voice agents for the Richmond demo, including basic conversation flows and error handling.',
}, {
  id: 'DEL-101',
  status: 'todo',
  title: 'Richmond: UK phone number + Spam Prevention',
  date: 'Feb 21',
  source: 'github',
  priority: true,
  description: 'Implement spam prevention measures and set up UK phone number integration for the Richmond project.',
}, {
  id: 'DEL-97',
  status: 'todo',
  title: 'Richmond: Workflow (Scheduler, Trigger, Post-processing)',
  date: 'Feb 21',
  source: 'gmail',
  comments: 1,
  description: 'Design and implement the workflow system including scheduling, triggers, and post-processing logic.',
}, {
  id: 'DEL-102',
  status: 'backlog',
  title: 'Dialpad: SMS Approval',
  date: 'Feb 21',
  source: 'whatsapp',
  priority: true,
  description: 'Add SMS approval flow for Dialpad integration, including verification and response handling.',
}];

// Create a mutable reference that can be shared between components
let issues = [...initialIssues];

// Function to get all issues
export const getIssues = () => issues;

// Function to get a single issue
export const getIssue = (id: string) => issues.find(issue => issue.id === id);

// Function to update an issue
export const updateIssue = (id: string, updates: Partial<Issue>) => {
  issues = issues.map(issue => 
    issue.id === id ? { ...issue, ...updates } : issue
  );
  return getIssue(id);
};

// React hook for components to use the issues
export const useIssues = () => {
  const [localIssues, setLocalIssues] = useState(issues);

  useEffect(() => {
    // Update local state when shared issues change
    setLocalIssues(issues);
  }, []);

  const updateLocalIssue = (id: string, updates: Partial<Issue>) => {
    const updatedIssue = updateIssue(id, updates);
    setLocalIssues([...issues]); // Trigger re-render with new issues
    return updatedIssue;
  };

  return {
    issues: localIssues,
    updateIssue: updateLocalIssue,
    getIssue: getIssue,
  };
}; 