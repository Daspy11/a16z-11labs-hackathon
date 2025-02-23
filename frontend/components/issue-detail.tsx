'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { TimelineEntry } from './timeline/TimelineEntry';
import { BackgroundEntry } from './timeline/BackgroundEntry';
import { SourceChip } from './context/SourceChip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Activity, ContextItem } from '@/types/issue';
import { useIssues, type Issue } from '@/lib/store';

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'created',
    user: {
      name: 'Gary',
    },
    timestamp: '1 day ago',
    actions: [
      { type: 'created', detail: 'created this action item' }
    ]
  }
];

const mockContexts: ContextItem[] = [
  { source: 'slack', type: 'thread', date: 'Feb 27' },
  { source: 'github', type: 'issue', date: 'Feb 26' },
  { source: 'github', type: 'PR', date: 'Feb 26' },
  { source: 'gmail', type: 'email', date: 'Feb 25' }
];

interface IssueDetailProps {
  id: string;
}

const IssueDetail: React.FC<IssueDetailProps> = ({ id }) => {
  const { getIssue, updateIssue } = useIssues();
  const issue = getIssue(id);

  if (!issue) {
    return <div>Issue not found</div>;
  }

  const { title, status, description } = issue;
  const truncatedTitle = title.length > 15 ? `${title.substring(0, 30)}...` : title;

  const handleStatusChange = (newStatus: Issue['status']) => {
    updateIssue(id, { status: newStatus });
  };

  // Sort timeline items in descending order
  const allTimelineItems = [...mockContexts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="w-full mx-auto px-6 py-4 bg-white">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/active-issues" className="hover:text-foreground transition-colors">
            Active issues
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{truncatedTitle}</span>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-6">{title}</h1>
          
          <div className="mb-8">
            <div className="text-sm text-muted-foreground bg-background py-4 px-4 rounded-lg">
              {description}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">Activity</h2>

            <div className="relative">
              {allTimelineItems.map((context, index) => (
                <BackgroundEntry key={index} context={context} />
              ))}

              {mockActivities.map((activity) => (
                <TimelineEntry key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>

        <div className="w-[300px]">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Properties</h3>
              <Select 
                value={status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="backlog">Backlog</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Context</h3>
              <div className="flex flex-wrap gap-1.5">
                {mockContexts.map((context, index) => (
                  <SourceChip 
                    key={index}
                    source={context.source}
                    type={context.type}
                    date={context.date}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
