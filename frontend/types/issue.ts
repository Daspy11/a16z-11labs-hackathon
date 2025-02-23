
export interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

export interface Activity {
  id: string;
  type: 'comment' | 'created' | 'status_changed' | 'assigned';
  user: {
    name: string;
  };
  timestamp: string;
  content?: string;
  actions?: {
    type: string;
    detail: string;
  }[];
}

export interface ContextItem {
  source: 'slack' | 'github' | 'gmail';
  type: string;
  date: string;
}

export interface IssueDetailProps {
  id: string;
  title: string;
  status: 'Todo' | 'In Progress' | 'Done';
  assignee?: {
    name: string;
    avatar: string;
  };
  description: string
}
