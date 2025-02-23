
import React from 'react';
import { Activity } from '@/types/issue';

export const TimelineEntry = ({
  activity
}: {
  activity: Activity;
}) => (
  <div className="flex items-start gap-3 relative pl-7 pb-6 last:pb-0 group">
    <div className="absolute left-[4px] w-2 h-2 rounded-full bg-background ring-2 ring-muted group-hover:ring-muted/80 transition-colors z-10" />
    <div className="flex-1">
      <div className="text-xs">
        <span className="font-medium text-foreground/90 hover:text-foreground cursor-pointer">{activity.user.name}</span>
        <span className="text-muted-foreground"> {activity.actions?.[0]?.detail}</span>
        <span className="text-muted-foreground/80 ml-1.5 hover:text-muted-foreground cursor-pointer">{activity.timestamp}</span>
      </div>
      {activity.content && <p className="mt-0.5 text-xs text-muted-foreground">{activity.content}</p>}
    </div>
  </div>
);
