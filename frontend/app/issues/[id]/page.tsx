'use client';

import IssueDetail from '@/components/issue-detail';
import { useIssues } from '@/lib/store';

interface PageProps {
  params: {
    id: string;
  };
}

export default function IssuePage({ params }: PageProps) {
  const { id } = params;
  
  return <IssueDetail id={id} />;
}