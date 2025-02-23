import React from 'react';
import { AlertCircle, Circle, Clock, MoreHorizontal, Plus, Slack, Github, Mail, CalendarDays, MessageCircle, GitPullRequest, HelpCircle, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import Link from 'next/link';

export interface Issue {
  id: string;
  status: 'inProgress' | 'todo' | 'backlog';
  title: string;
  date: string;
  source: 'slack' | 'github' | 'gmail' | 'gcal' | 'whatsapp' | 'linear' | 'zendesk';
  priority?: boolean;
  comments?: number;
}

export interface IssueFilters {
  search: string;
  status?: Issue['status'];
  source?: Issue['source'];
}

interface StatusGroup {
  status: 'inProgress' | 'todo' | 'backlog';
  title: string;
  count: number;
  issues: Issue[];
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

const StatusIcon = ({
  status
}: {
  status: Issue['status'];
}) => {
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

const IssueRow = ({
  issue
}: {
  issue: Issue;
}) => {
  return (
    <Link href={`/issues/${issue.id}`} className="group flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100/40 transition-all duration-200 cursor-pointer">
      <div className="flex items-center gap-3 flex-1">
        <StatusIcon status={issue.status} />
        <span className="text-gray-900 text-xs">{issue.title}</span>
        {issue.comments && <span className="flex items-center gap-1 text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full">
            {issue.comments}
          </span>}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-gray-500 text-[10px]">{issue.date}</span>
        <SourceChip source={issue.source} />
        <Popover>
          <PopoverTrigger asChild>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => {
            e.stopPropagation();
          }}>
              <MoreHorizontal className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white shadow-lg" align="end" onClick={e => e.stopPropagation()}>
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 w-full" onClick={e => {
            e.stopPropagation();
            console.log('Delete issue:', issue.id);
          }}>
              <Trash className="w-3.5 h-3.5" />
              Delete
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </Link>
  );
};

const StatusSection = ({
  group
}: {
  group: StatusGroup;
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
        {group.issues.map(issue => <IssueRow key={issue.id} issue={issue} />)}
      </div>
    </div>;
};

interface IssueListProps {
  issues: Issue[];
  filters: IssueFilters;
  onFilterChange: (filters: Partial<IssueFilters>) => void;
}

const IssueList = ({ issues, filters, onFilterChange }: IssueListProps) => {
  const groupedIssues = [{
    status: 'inProgress' as const,
    title: 'In Progress',
    count: issues.filter(i => i.status === 'inProgress').length,
    issues: issues.filter(i => i.status === 'inProgress')
  }, {
    status: 'todo' as const,
    title: 'Todo',
    count: issues.filter(i => i.status === 'todo').length,
    issues: issues.filter(i => i.status === 'todo')
  }, {
    status: 'backlog' as const,
    title: 'Backlog',
    count: issues.filter(i => i.status === 'backlog').length,
    issues: issues.filter(i => i.status === 'backlog')
  }];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1.5 px-4 pt-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search issues..."
            className="h-7 w-full bg-gray-50 border-gray-200 text-xs placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:ring-offset-0"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
        </div>
        <Select value={filters.status || 'all'} onValueChange={(value) => onFilterChange({ status: value === 'all' ? undefined : value as Issue['status'] })}>
          <SelectTrigger className="h-7 w-32 px-2 text-xs bg-gray-50 border-gray-200 hover:bg-gray-100 focus:ring-gray-300 focus:ring-offset-0">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent className="text-xs">
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="inProgress">In Progress</SelectItem>
            <SelectItem value="todo">Todo</SelectItem>
            <SelectItem value="backlog">Backlog</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.source || 'all'} onValueChange={(value) => onFilterChange({ source: value === 'all' ? undefined : value as Issue['source'] })}>
          <SelectTrigger className="h-7 w-32 px-2 text-xs bg-gray-50 border-gray-200 hover:bg-gray-100 focus:ring-gray-300 focus:ring-offset-0">
            <SelectValue placeholder="All sources" />
          </SelectTrigger>
          <SelectContent className="text-xs">
            <SelectItem value="all">All sources</SelectItem>
            <SelectItem value="slack">Slack</SelectItem>
            <SelectItem value="github">GitHub</SelectItem>
            <SelectItem value="gmail">Gmail</SelectItem>
            <SelectItem value="gcal">Calendar</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
            <SelectItem value="linear">Linear</SelectItem>
            <SelectItem value="zendesk">Zendesk</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full overflow-hidden bg-white divide-y divide-gray-100">
        {groupedIssues.map(group => <StatusSection key={group.status} group={group} />)}
      </div>
    </div>
  );
};

export default IssueList;