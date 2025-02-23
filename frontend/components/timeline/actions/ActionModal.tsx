
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type ActionType } from './types';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: string) => void;
  action: ActionType;
}

export const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  action,
}) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleSubmit = () => {
    onSubmit(inputValue);
    setInputValue('');
    onClose();
  };

  const getTitle = () => {
    switch (action) {
      case 'slack-reply':
        return 'Reply to Slack thread';
      case 'github-approve':
        return 'Approve pull request';
      case 'github-close':
        return 'Close pull request';
      case 'github-comment':
        return 'Comment on issue';
      case 'email-reply':
        return 'Reply to email';
      case 'email-reply-all':
        return 'Reply all to email';
      default:
        return '';
    }
  };

  const needsInput = action !== 'github-approve' && action !== 'github-close';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        {needsInput && (
          <div className="py-4">
            <textarea
              placeholder="Write your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full min-h-[120px] p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring placeholder:text-muted-foreground resize-none"
            />
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            disabled={needsInput && !inputValue.trim()}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
