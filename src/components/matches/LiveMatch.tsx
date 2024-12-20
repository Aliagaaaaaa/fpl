import React from 'react';
import { Radio } from 'lucide-react';
import type { MatchSummary } from '@/types';
import { MatchTeams } from './MatchTeams';

interface LiveMatchProps {
  match: MatchSummary;
}

export function LiveMatch({ match }: LiveMatchProps) {
  return (
    <div className="p-4 rounded-lg bg-muted/50">
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium">{match.map}</div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-red-500">
            <Radio className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">LIVE</span>
          </div>
        </div>
      </div>
      <MatchTeams match={match} />
    </div>
  );
}