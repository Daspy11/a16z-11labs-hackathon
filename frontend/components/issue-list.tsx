import React, { useState } from 'react';
import { AlertCircle, Circle, Clock, MoreHorizontal, Plus, Slack, Github, Mail, CalendarDays, MessageCircle, GitPullRequest, HelpCircle, Trash, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useIssues, type Issue } from '@/lib/store';

interface StatusGroup {
  status: Issue['status'];
  title: string;
  count: number;
  issues: Issue[];
}

interface FilterState {
  status: Issue['status'] | 'all';
  source: Issue['source'] | 'all';
  hasPriority: boolean | 'all';
}

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

const FilterBuilder = ({ onFilterChange }: { onFilterChange: (filters: FilterState) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    source: 'all',
    hasPriority: 'all'
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-700">Status</label>
            <select 
              className="w-full text-xs rounded-md border border-gray-200 py-1.5 px-2"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">All</option>
              <option value="inProgress">In Progress</option>
              <option value="todo">Todo</option>
              <option value="backlog">Backlog</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-700">Source</label>
            <select 
              className="w-full text-xs rounded-md border border-gray-200 py-1.5 px-2"
              value={filters.source}
              onChange={(e) => handleFilterChange('source', e.target.value)}
            >
              <option value="all">All</option>
              <option value="slack">Slack</option>
              <option value="github">GitHub</option>
              <option value="gmail">Gmail</option>
              <option value="gcal">Calendar</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="linear">Linear</option>
              <option value="zendesk">Zendesk</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-700">Priority</label>
            <select 
              className="w-full text-xs rounded-md border border-gray-200 py-1.5 px-2"
              value={filters.hasPriority.toString()}
              onChange={(e) => handleFilterChange('hasPriority', e.target.value === 'true' ? true : e.target.value === 'false' ? false : 'all')}
            >
              <option value="all">All</option>
              <option value="true">High Priority</option>
              <option value="false">Normal Priority</option>
            </select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const StatusPopover = ({
  currentStatus,
  onStatusChange,
  children,
}: {
  currentStatus: Issue['status'];
  onStatusChange: (newStatus: Issue['status']) => void;
  children: React.ReactNode;
}) => {
  const statusOptions: { value: Issue['status']; label: string; icon: React.ReactElement }[] = [
    { value: 'inProgress', label: 'In Progress', icon: <Clock className="w-4 h-4 text-yellow-500" /> },
    { value: 'todo', label: 'Todo', icon: <Circle className="w-4 h-4 text-gray-400" /> },
    { value: 'backlog', label: 'Backlog', icon: <Circle className="w-4 h-4 text-gray-300" /> },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0" align="start">
        <div className="py-1">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-gray-100",
                currentStatus === option.value ? "text-gray-900" : "text-gray-600"
              )}
              onClick={() => onStatusChange(option.value)}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const StatusIcon = ({
  status,
  onStatusChange,
}: {
  status: Issue['status'];
  onStatusChange?: (newStatus: Issue['status']) => void;
}) => {
  const icon = (() => {
    switch (status) {
      case 'inProgress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'todo':
        return <Circle className="w-4 h-4 text-gray-400" />;
      case 'backlog':
        return <Circle className="w-4 h-4 text-gray-300" />;
      default:
        return null;
    }
  })();

  if (!onStatusChange) return icon;

  return (
    <StatusPopover currentStatus={status} onStatusChange={onStatusChange}>
      <button className="hover:bg-gray-100 rounded-sm p-0.5 transition-colors">
        {icon}
      </button>
    </StatusPopover>
  );
};

const SourceIcon = ({
  source
}: {
  source: Issue['source'];
}) => {
  const iconClasses = "w-3 h-3";
  switch (source) {
    case 'slack':
      return <Slack className={iconClasses} />;
    case 'github':
      return <Github className={iconClasses} />;
    case 'gmail':
      return <Mail className={iconClasses} />;
    case 'gcal':
      return <CalendarDays className={iconClasses} />;
    case 'whatsapp':
      return <MessageCircle className={iconClasses} />;
    case 'linear':
      return <GitPullRequest className={iconClasses} />;
    case 'zendesk':
      return <HelpCircle className={iconClasses} />;
    default:
      return null;
  }
};

const SourceChip = ({
  source
}: {
  source: Issue['source'];
}) => {
  const baseClasses = "flex items-center gap-1 px-1.5 py-0.5 rounded-full transition-colors cursor-pointer text-[10px] font-medium";
  const configs = {
    slack: {
      bg: "bg-[#E8D7F4] hover:bg-[#DEC4EE]",
      text: "text-[#4A154B]",
      label: "Slack"
    },
    github: {
      bg: "bg-[#E6EBF1] hover:bg-[#D8E1EB]",
      text: "text-[#24292F]",
      label: "GitHub"
    },
    gmail: {
      bg: "bg-[#FCE8E7] hover:bg-[#FACBC9]",
      text: "text-[#EA4335]",
      label: "Gmail"
    },
    gcal: {
      bg: "bg-[#E8F0FE] hover:bg-[#D2E3FC]",
      text: "text-[#1A73E8]",
      label: "Calendar"
    },
    whatsapp: {
      bg: "bg-[#E7F5E4] hover:bg-[#DCF8C6]",
      text: "text-[#075E54]",
      label: "WhatsApp"
    },
    linear: {
      bg: "bg-[#F1F1F4] hover:bg-[#E5E5E9]",
      text: "text-[#5E6AD2]",
      label: "Linear"
    },
    zendesk: {
      bg: "bg-[#E5F8F6] hover:bg-[#D1F3EE]",
      text: "text-[#03363D]",
      label: "Zendesk"
    }
  };
  const config = configs[source];
  return <button className={cn(baseClasses, config.bg, config.text)}>
      <SourceIcon source={source} />
      <span>{config.label}</span>
    </button>;
};

const IssueRow = ({ issue, onStatusChange }: { issue: Issue; onStatusChange?: (id: string, newStatus: Issue['status']) => void }) => {
  const router = useRouter();

  return (
    <div className="group flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100/40 transition-all duration-200">
      <div className="flex items-center gap-3 flex-1">
        <StatusIcon 
          status={issue.status} 
          onStatusChange={onStatusChange ? (newStatus) => onStatusChange(issue.id, newStatus) : undefined}
        />
        <Link 
          href={`/issues/${issue.id}`}
          className="text-gray-900 text-xs hover:underline"
        >
          {issue.title}
        </Link>
        {issue.comments && <span className="flex items-center gap-1 text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full">
            {issue.comments}
          </span>}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-gray-500 text-[10px]">{issue.date}</span>
        <SourceChip source={issue.source} />
        <Popover>
          <PopoverTrigger asChild>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white shadow-lg" align="end">
            <button 
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 w-full" 
              onClick={() => console.log('Delete issue:', issue.id)}
            >
              <Trash className="w-3.5 h-3.5" />
              Delete
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

const StatusSection = ({
  group,
  onStatusChange
}: {
  group: StatusGroup;
  onStatusChange?: (id: string, newStatus: Issue['status']) => void;
}) => {
  return <div className="bg-white">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-100">
        <div className="flex items-center gap-2">
          <StatusIcon status={group.status} />
          <span className="font-medium text-gray-700 text-xs">{group.title}</span>
          <span className="text-[10px] text-gray-500">{group.count}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
      <div>
        {group.issues.map(issue => (
          <IssueRow 
            key={issue.id} 
            issue={issue} 
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>;
};

const IssueList = () => {
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    source: 'all',
    hasPriority: 'all'
  });

  const { issues, updateIssue } = useIssues();

  const handleStatusChange = (id: string, newStatus: Issue['status']) => {
    updateIssue(id, { status: newStatus });
  };

  const filteredIssues = issues.filter(issue => {
    if (filters.status !== 'all' && issue.status !== filters.status) return false;
    if (filters.source !== 'all' && issue.source !== filters.source) return false;
    if (filters.hasPriority !== 'all' && Boolean(issue.priority) !== filters.hasPriority) return false;
    return true;
  });

  const groupedIssues = [
    {
      status: 'inProgress' as const,
      title: 'In Progress',
      count: filteredIssues.filter((i) => i.status === 'inProgress').length,
      issues: filteredIssues.filter((i) => i.status === 'inProgress')
    },
    {
      status: 'todo' as const,
      title: 'Todo',
      count: filteredIssues.filter((i) => i.status === 'todo').length,
      issues: filteredIssues.filter((i) => i.status === 'todo')
    },
    {
      status: 'backlog' as const,
      title: 'Backlog',
      count: filteredIssues.filter((i) => i.status === 'backlog').length,
      issues: filteredIssues.filter((i) => i.status === 'backlog')
    }
  ];

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="flex justify-end mb-4">
        <FilterBuilder onFilterChange={setFilters} />
      </div>
      <div className="rounded-lg overflow-hidden bg-white shadow-sm divide-y divide-gray-100">
        {groupedIssues.map((group) => (
          <StatusSection 
            key={group.status} 
            group={group} 
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default IssueList;
