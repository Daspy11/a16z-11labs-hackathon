'use client';

import { useState, useMemo } from 'react';
import IssueList, { Issue, IssueFilters } from '@/components/issue';

const mockIssues: Issue[] = [{
  id: 'DEL-96',
  status: 'inProgress',
  title: 'Richmond: Create voice agents ahead of launch',
  date: 'Feb 21',
  source: 'slack',
  priority: true
}, {
  id: 'DEL-101',
  status: 'todo',
  title: 'Richmond: UK phone number + Spam Prevention',
  date: 'Feb 21',
  source: 'github',
  priority: true
}, {
  id: 'DEL-97',
  status: 'todo',
  title: 'Richmond: Workflow (Scheduler, Trigger, Post-processing)',
  date: 'Feb 21',
  source: 'gmail',
  comments: 1
}, {
  id: 'DEL-102',
  status: 'backlog',
  title: 'Dialpad: SMS Approval',
  date: 'Feb 21',
  source: 'whatsapp',
  priority: true
}];

export default function ActiveIssuesPage() {
  const [issues] = useState<Issue[]>(mockIssues);
  const [filters, setFilters] = useState<IssueFilters>({
    search: '',
    status: undefined,
    source: undefined,
  });

  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      const matchesSearch = !filters.search || 
        issue.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = !filters.status || issue.status === filters.status;
      const matchesSource = !filters.source || issue.source === filters.source;
      
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [issues, filters]);

  const handleFilterChange = (newFilters: Partial<IssueFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="flex flex-col bg-white h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-xl font-semibold">Active Issues</h1>
      </div>
      <div className="flex-1 overflow-hidden h-full">
        <div className="h-full overflow-y-auto">
          <IssueList 
            issues={filteredIssues}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
}