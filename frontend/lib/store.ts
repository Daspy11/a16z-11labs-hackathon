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
const initialIssues: Issue[] = [
  {
    "id": "DEL-96",
    "status": "done",
    "title": "Investigate Authentication Service Outage", 
    "date": "Feb 23",
    "source": "slack",
    "priority": true,
    "description": "Users are unable to log in due to a suspected database connection issue with the authentication service.  This is impacting customers across all regions.  A rollback of the latest auth-service deployment did not resolve the issue.  The VP has been notified and is requesting updates every 30 minutes."
  },
  {
    "id": "DEL-101",
    "status": "done",
    "title": "Implement Robust Rate Limiting",
    "date": "Feb 23", 
    "source": "slack",
    "priority": false,
    "description": "A new rate-limit check introduced in the authentication service is failing and blocking legitimate authentication requests. This needs to be redesigned and implemented correctly to prevent future outages."
  },
  {
    "id": "DEL-97",
    "status": "done",
    "title": "Review Auth-Service Connection Retries",
    "date": "Feb 23",
    "source": "slack",
    "priority": false,
    "description": "Investigate the recent infrastructure changes to how the auth-service handles connection retries, as this might be related to the current outage.  Ensure retry mechanisms are robust and do not exacerbate database connection issues."
  },
  {
    "id": "DEL-102",
    "status": "todo",
    "title": "Conduct Postmortem for Auth Service Outage",
    "date": "Feb 23",
    "source": "gmail",
    "priority": true,
    "description": "A postmortem needs to be conducted to thoroughly analyze the root cause of the authentication service outage, identify areas for improvement, and document findings to prevent similar incidents in the future. This postmortem is scheduled for Wednesday."
  },
  {
    "id": "DEL-96",
    "status": "todo",
    "title": "Integrate Eleven Labs API for Conversational Capabilities",
    "date": "Feb 23",
    "source": "github",
    "priority": false,
    "description": "Charlie's PR integrates the Eleven Labs API, enhancing agent system with voice generation and conversation management. Minor changes needed: replace synchronous requests with async HTTP client (e.g., aiohttp) for non-blocking operations."
  }
]

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