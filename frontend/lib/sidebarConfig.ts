import {
  LayoutDashboard,
  Settings,
  Plus,
  FileStackIcon,
  SpeechIcon,
  MailIcon,
} from 'lucide-react';
import { SiGithub, SiSlack, SiNotion, SiLinear, SiGoogledrive, SiGmail } from '@icons-pack/react-simple-icons'
import type { ComponentType } from 'react';

export type Item = {
  name: string;
  slug: string;
  disabled?: boolean;
  icon?: ComponentType<{ className?: string }>;
  status?: string;
};

export const sidebarConfig: { name: string; items: Item[] }[] = [
  {
    name: 'Main',
    items: [
      {
        name: 'Home',
        slug: 'home',
        icon: LayoutDashboard,
      },
      {
        name: 'My Briefs',
        slug: 'calendar',
        icon: SpeechIcon,
      },
    ],
  },
  {
    name: 'Action Center',
    items: [
        {
          name: 'Inbox',
          slug: 'inbox',
          icon: MailIcon,
        },
        {
          name: 'Action Center',
          slug: 'active-issues',
          icon: FileStackIcon,
        },
        {
          name: 'Add view',
          slug: 'add-view',
          icon: Plus,
        }
    ],
  },
  {
    name: 'Integrations',
    items: [
      {
        name: 'Slack',
        slug: 'slack', 
        icon: SiSlack,
        status: 'green',
      },
      {
        name: 'GitHub',
        slug: 'github',
        icon: SiGithub,
        status: 'green',
      },
      {
        name: 'Google Drive',
        slug: 'google-drive',
        icon: SiGoogledrive,
        status: 'green',
      },
      {
        name: 'Gmail',
        slug: 'gmail',
        icon: SiGmail,
        status: 'green',
      },
      {
        name: 'Notion',
        slug: 'notion',
        icon: SiNotion,
        status: 'green',
      },
      {
        name: 'Linear',
        slug: 'linear',
        icon: SiLinear,
        status: 'green',
      },
      {
        name: 'Add',
        slug: 'add-integration',
        icon: Plus,
      },
    ],
  },
  {
    name: '',
    items: [
      {
        name: 'Settings',
        slug: 'settings',
        icon: Settings,
      },
    ],
  },
];


export function findDemoBySlug(slug: string): (Item & { category: string }) | undefined {
  for (const section of sidebarConfig) {
    const item = section.items.find((item) => item.slug === slug);
    if (item) {
      return { ...item, category: section.name };
    }
  }
  return undefined;
}
