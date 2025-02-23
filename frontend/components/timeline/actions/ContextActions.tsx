
import React, { useState } from 'react';
import { 
  MessageCircleReply, 
  CheckSquare, 
  XSquare, 
  MessageSquare,
  Reply
} from 'lucide-react';
import { Button } from '../../ui/button';
import { ContextItem } from '@/types/issue';
import { ActionModal } from './ActionModal';
import { ActionType } from './types';

interface ContextActionsProps {
  context: ContextItem;
  isCollapsed: boolean;
}

export const ContextActions: React.FC<ContextActionsProps> = ({ context, isCollapsed }) => {
  const [currentAction, setCurrentAction] = useState<ActionType | null>(null);

  const handleAction = (data: string) => {
    switch (currentAction) {
      case 'slack-reply':
        console.log('Sending reply to Slack:', data);
        break;
      case 'github-approve':
        console.log('Approving PR');
        break;
      case 'github-close':
        console.log('Closing PR');
        break;
      case 'github-comment':
        console.log('Adding comment to GitHub issue:', data);
        break;
      case 'email-reply':
        console.log('Reply:', data);
        break;
      case 'email-reply-all':
        console.log('Reply to all:', data);
        break;
    }
  };

  const closeModal = () => setCurrentAction(null);

  const buttonClasses = "h-7 text-xs flex items-center gap-1.5";
  const buttonVariant = isCollapsed ? "outline" : "default";

  switch (context.source) {
    case 'slack':
      return (
        <>
          <div className="flex gap-2">
            <Button 
              size="sm"
              variant={buttonVariant}
              className={buttonClasses}
              onClick={() => setCurrentAction('slack-reply')}
            >
              <MessageCircleReply className="h-3.5 w-3.5" />
              Reply in thread
            </Button>
          </div>
          <ActionModal
            isOpen={currentAction === 'slack-reply'}
            onClose={closeModal}
            onSubmit={handleAction}
            action="slack-reply"
          />
        </>
      );
    
    case 'github':
      return context.type === 'PR' ? (
        <>
          <div className="flex gap-2">
            <Button 
              size="sm"
              variant={buttonVariant}
              className={buttonClasses}
              onClick={() => setCurrentAction('github-approve')}
            >
              <CheckSquare className="h-3.5 w-3.5" />
              Approve
            </Button>
            <Button 
              size="sm"
              variant={buttonVariant}
              className={buttonClasses}
              onClick={() => setCurrentAction('github-close')}
            >
              <XSquare className="h-3.5 w-3.5" />
              Close
            </Button>
          </div>
          <ActionModal
            isOpen={currentAction === 'github-approve'}
            onClose={closeModal}
            onSubmit={handleAction}
            action="github-approve"
          />
          <ActionModal
            isOpen={currentAction === 'github-close'}
            onClose={closeModal}
            onSubmit={handleAction}
            action="github-close"
          />
        </>
      ) : (
        <>
          <div className="flex gap-2">
            <Button 
              size="sm"
              variant={buttonVariant}
              className={buttonClasses}
              onClick={() => setCurrentAction('github-comment')}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Comment on issue
            </Button>
          </div>
          <ActionModal
            isOpen={currentAction === 'github-comment'}
            onClose={closeModal}
            onSubmit={handleAction}
            action="github-comment"
          />
        </>
      );
    
    case 'gmail':
      return (
        <>
          <div className="flex gap-2">
            <Button 
              size="sm"
              variant={buttonVariant}
              className={buttonClasses}
              onClick={() => setCurrentAction('email-reply-all')}
            >
              <Reply className="h-3.5 w-3.5" />
              Reply all
            </Button>
            <Button 
              size="sm"
              variant={buttonVariant}
              className={buttonClasses}
              onClick={() => setCurrentAction('email-reply')}
            >
              <Reply className="h-3.5 w-3.5" />
              Reply
            </Button>
          </div>
          <ActionModal
            isOpen={currentAction === 'email-reply' || currentAction === 'email-reply-all'}
            onClose={closeModal}
            onSubmit={handleAction}
            action={currentAction as ActionType}
          />
        </>
      );
    
    default:
      return null;
  }
};
