
import React from 'react';
import { Comment } from '@/types/issue';
import { Avatar } from '../common/Avatar';

export const CommentEntry = ({ comment }: { comment: Comment }) => (
  <div className="flex items-start gap-3 relative pl-7 pb-6 last:pb-0 group">
    <div className="absolute left-2 top-[30px] h-[calc(100%-30px)] w-[2px] bg-gray-100 group-hover:bg-gray-200 transition-colors" />
    <div className="absolute left-0 top-[8px] w-4 h-4 rounded-full bg-white ring-2 ring-gray-200 group-hover:ring-gray-300 transition-colors z-10" />
    <Avatar 
      src={comment.user.avatar} 
      alt={comment.user.name}
      className="mt-0.5" 
    />
    <div className="flex-1">
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-xs font-medium text-gray-900 hover:text-gray-700 cursor-pointer">{comment.user.name}</span>
        <span className="text-gray-400 text-xs hover:text-gray-500 cursor-pointer">{comment.timestamp}</span>
      </div>
      <div className="text-xs p-2.5 bg-gray-50 rounded-lg">
        {comment.content}
      </div>
    </div>
  </div>
);
