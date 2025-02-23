'use client';

import { use } from 'react';
import IssueDetail from '@/components/issue-detail';
import { useIssues } from '@/lib/store';

interface PageProps {
  params: {
    id: string;
  };
}

export default function IssuePage({ params }: PageProps) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  return <IssueDetail id={id} />;
}