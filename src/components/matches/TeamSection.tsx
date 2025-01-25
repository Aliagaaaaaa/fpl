import type { MatchPlayer } from '@/types';
import { TeamRoster } from './TeamRoster';

interface TeamSectionProps {
  name: string;
  roster: MatchPlayer[];
  className?: string;
}

export function TeamSection({ name, roster, className = "" }: TeamSectionProps) {
  return (
    <div className={className}>
      <div className="font-medium mb-2">{name}</div>
      <TeamRoster 
        players={roster}
        className={className.includes('text-right') ? 'flex flex-col items-end' : ''}
      />
    </div>
  );
}