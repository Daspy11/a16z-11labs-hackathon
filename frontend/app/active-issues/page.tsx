'use client';

import { useState, useMemo } from 'react';
import IssueList, { Issue, IssueFilters } from '@/components/issue';

const mockIssues: Issue[] = [{
  id: 'DEL-96',
  status: 'inProgress', 
  title: 'Post-mortem: Document authentication system outage timeline',
  date: 'Feb 21',
  source: 'linear',
  priority: true,
  comments: 3
}, {
  id: 'DEL-101',
  status: 'inProgress',
  title: 'Update status page with outage resolution details',
  date: 'Feb 21', 
  source: 'slack',
  priority: true
}, {
  id: 'DEL-97',
  status: 'todo',
  title: 'Review and update authentication system monitoring alerts',
  date: 'Feb 21',
  source: 'linear',
  comments: 2
}, {
  id: 'DEL-102',
  status: 'todo',
  title: '[Mark] Implement additional authentication system health checks',
  date: 'Feb 21',
  source: 'github',
  priority: true
}, {
  id: 'DEL-102',
  status: 'todo',
  title: '[Samantha] Analyze authentication logs for root cause',
  date: 'Feb 21',
  source: 'linear',
  comments: 4
}, {
  id: 'DEL-102',
  status: 'todo',
  title: '[Charlie] Update disaster recovery documentation',
  date: 'Feb 21',
  source: 'github',
  priority: true
}, {
  id: 'DEL-102',
  status: 'backlog',
  title: 'Schedule authentication system load testing',
  date: 'Feb 21',
  source: 'linear'
}, {
  id: 'DEL-102',
  status: 'backlog',
  title: 'Review and update authentication system backup procedures',
  date: 'Feb 21',
  source: 'zendesk',
  comments: 1
}, {
  id: 'DEL-102',
  status: 'backlog',
  title: 'Plan authentication system redundancy improvements',
  date: 'Feb 21',
  source: 'linear'
}, {
  id: 'DEL-102',
  status: 'backlog',
  title: 'Document lessons learned from authentication outage',
  date: 'Feb 21',
  source: 'slack',
  comments: 5
}, {
  id: 'DEL-102',
  status: 'backlog',
  title: 'Schedule team review of incident response process',
  date: 'Feb 21',
  source: 'gcal'
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