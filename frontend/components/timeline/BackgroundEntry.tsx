
import React, { useState } from 'react';
import { Slack, Github, Mail, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { ContextItem } from '@/types/issue';
import { Button } from '../ui/button';
import ReactMarkdown from 'react-markdown';
import { markdownComponents } from './markdown/MarkdownComponents';
import { ContextActions } from './actions/ContextActions';
import { getContextSummary, getContextDetails, getOriginalLink } from './utils/contextContent';

export const BackgroundEntry = ({
  context
}: {
  context: ContextItem;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex items-start gap-3 relative pl-7 pb-6 last:pb-0 group">
      <div className="absolute left-[7px] h-full w-[2px] bg-muted group-hover:bg-muted/80 transition-colors top-[10px]" />
      <div className="absolute left-[4px] top-[30px] w-2 h-2 rounded-full bg-background ring-2 ring-muted group-hover:ring-muted/80 transition-colors z-10" />
      <div className="flex-1">
        <div className="flex items-center gap-1.5 mb-1.5">
          {context.source === 'slack' && <Slack className="w-3.5 h-3.5 text-[#4A154B]" />}
          {context.source === 'github' && <Github className="w-3.5 h-3.5 text-[#24292F]" />}
          {context.source === 'gmail' && <Mail className="w-3.5 h-3.5 text-[#EA4335]" />}
          <span className="text-xs font-medium text-foreground/90 hover:text-foreground cursor-pointer">
            {context.source === 'slack' && 'Slack discussion'}
            {context.source === 'github' && `GitHub ${context.type}`}
            {context.source === 'gmail' && 'Email thread'}
          </span>
          <span className="text-xs text-muted-foreground hover:text-muted-foreground/80 cursor-pointer">
            {context.date}
          </span>
        </div>
        <div className="text-xs p-3 bg-muted/10 hover:bg-muted/20 transition-colors rounded-lg border shadow-sm">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown components={markdownComponents}>
              {getContextSummary(context.source, context.type)}
            </ReactMarkdown>
            
            {isExpanded && (
              <>
                <div className="my-3 border-t border-border" />
                <ReactMarkdown components={markdownComponents}>
                  {getContextDetails(context.source, context.type)}
                </ReactMarkdown>
                <ContextActions context={context} isCollapsed={false} />
              </>
            )}
          </div>
          <div className="mt-3 space-y-3">
            {isExpanded && (
              <a 
                href={getOriginalLink(context.source, context.type)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit group mb-3"
              >
                <ExternalLink className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                View original
              </a>
            )}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs text-muted-foreground hover:text-foreground p-0 w-fit"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <ChevronUp className="h-3 w-3 mr-1" />
                ) : (
                  <ChevronDown className="h-3 w-3 mr-1" />
                )}
                {isExpanded ? 'Show less' : 'Show more'}
              </Button>
            </div>
            {!isExpanded && <ContextActions context={context} isCollapsed={true} />}
          </div>
        </div>
      </div>
    </div>
  );
};
