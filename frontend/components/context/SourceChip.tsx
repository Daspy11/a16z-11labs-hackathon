
import React from 'react';
import { Slack, Github, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContextItem } from '@/types/issue';

interface SourceChipProps {
  source: ContextItem['source'];
  type: string;
  date: string;
}

export const SourceChip = ({ source, type, date }: SourceChipProps) => {
  const baseClasses = "flex items-center gap-1 px-1.5 py-0.5 rounded-full transition-colors cursor-pointer text-[10px] font-medium";
  const configs = {
    slack: {
      bg: "bg-[#E8D7F4] hover:bg-[#DEC4EE]",
      text: "text-[#4A154B]",
      icon: <Slack className="w-3 h-3" />,
      label: "Slack"
    },
    github: {
      bg: "bg-[#E6EBF1] hover:bg-[#D8E1EB]",
      text: "text-[#24292F]",
      icon: <Github className="w-3 h-3" />,
      label: "GitHub"
    },
    gmail: {
      bg: "bg-[#FCE8E7] hover:bg-[#FACBC9]",
      text: "text-[#EA4335]",
      icon: <Mail className="w-3 h-3" />,
      label: "Gmail"
    }
  };
  
  const config = configs[source];
  return (
    <button className={cn(baseClasses, config.bg, config.text)}>
      {config.icon}
      <span>{config.label}</span>
      <span className="mx-1 opacity-75">·</span>
      <span>{type}</span>
    </button>
  );
};