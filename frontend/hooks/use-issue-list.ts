/**
 * useIssueList.ts
 *
 * This hook implements the Issue list management logic we described in the
 * interface `UseIssueListResult`. It handles:
 *  - Fetching or initializing issues
 *  - Filtering by search text and status
 *  - Sorting by various fields
 *  - Tracking loading state
 *
 * In a production app, replace MOCK_ISSUES or the fetch simulation with
 * real API calls as needed.
 */

import * as React from 'react';
import type {
  Issue,
  IssueFilter,
  IssueSort,
  UseIssueListResult,
  IssueStatus,
} from './IssueList'; // Adjust the path to wherever you placed IssueList.ts

/**
 * Example mock data for demonstration. In practice, you'd replace this
 * with data fetched from an API or server.
 */
const MOCK_ISSUES: Issue[] = [
  {
    id: '1',
    title: 'Fix Slack notifications not appearing',
    status: 'in_progress',
    brand: 'slack',
    createdAt: '2025-02-15T09:00:00.000Z',
  },
  {
    id: '2',
    title: 'Review GitHub PR #219 for user settings',
    status: 'review',
    brand: 'github',
    createdAt: '2025-02-18T08:30:00.000Z',
  },
  {
    id: '3',
    title: 'Organize shared drive folder for Q1 planning',
    status: 'todo',
    brand: 'drive',
    createdAt: '2025-02-20T10:00:00.000Z',
  },
  {
    id: '4',
    title: 'Clear out old onboarding emails',
    status: 'done',
    brand: 'email',
    createdAt: '2025-02-19T07:15:00.000Z',
  },
  {
    id: '5',
    title: 'Investigate app crash on file upload',
    status: 'blocked',
    brand: 'drive',
    createdAt: '2025-02-21T11:45:00.000Z',
  },
  {
    id: '6',
    title: 'Sync Slack channels to new analytics tool',
    status: 'backlog',
    brand: 'slack',
    createdAt: '2025-02-10T11:00:00.000Z',
  },
];

/**
 * Custom hook that returns the data and handlers for managing an issue list.
 */
export function useIssueList(): UseIssueListResult {
  // Holds the raw issues from a fetch or mock data
  const [allIssues, setAllIssues] = React.useState<Issue[]>([]);
  // Computed via filtering+sorting from allIssues
  const [issues, setIssues] = React.useState<Issue[]>([]);

  // Manage a loading state
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // Filter state
  const [filter, setFilterState] = React.useState<IssueFilter>({
    search: '',
    statuses: [],
  });

  // Sort state
  const [sort, setSortState] = React.useState<IssueSort>({
    field: 'created',
    direction: 'desc',
  });

  /**
   * Merges partial filter updates
   */
  function setFilter(update: Partial<IssueFilter>) {
    setFilterState((prev) => ({ ...prev, ...update }));
  }

  /**
   * Merges partial sort updates
   */
  function setSort(update: Partial<IssueSort>) {
    setSortState((prev) => ({ ...prev, ...update }));
  }

  /**
   * On mount, simulate fetching data from an API.
   * Replace with a real fetch call as needed.
   */
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setAllIssues(MOCK_ISSUES);
      setIsLoading(false);
    }, 800); // Just a short delay to mimic loading
    return () => clearTimeout(timer);
  }, []);

  /**
   * Whenever filter or sort state changes, compute a new filtered+sorted
   * list of issues. We do it in a separate effect so we only recalc
   * when needed.
   */
  React.useEffect(() => {
    let newIssues = [...allIssues];

    // 1. Filter by search text
    if (filter.search.trim()) {
      const searchLower = filter.search.trim().toLowerCase();
      newIssues = newIssues.filter((issue) =>
        issue.title.toLowerCase().includes(searchLower),
      );
    }

    // 2. Filter by statuses (if any)
    if (filter.statuses.length > 0) {
      newIssues = newIssues.filter((issue) =>
        filter.statuses.includes(issue.status),
      );
    }

    // 3. Sort by the chosen field & direction
    newIssues.sort((a, b) => {
      let valA: string | number = '';
      let valB: string | number = '';

      switch (sort.field) {
        case 'title':
          valA = a.title.toLowerCase();
          valB = b.title.toLowerCase();
          break;
        case 'status':
          // sort by status strings or some custom ordering
          valA = a.status;
          valB = b.status;
          break;
        case 'created':
        default:
          valA = new Date(a.createdAt).getTime();
          valB = new Date(b.createdAt).getTime();
          break;
      }

      if (valA < valB) {
        return sort.direction === 'asc' ? -1 : 1;
      }
      if (valA > valB) {
        return sort.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setIssues(newIssues);
  }, [allIssues, filter, sort]);

  return {
    issues,
    filter,
    setFilter,
    sort,
    setSort,
    isLoading,
  };
}
