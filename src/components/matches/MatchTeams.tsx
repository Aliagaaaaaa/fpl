import React from 'react';
import type { MatchSummary } from '@/types';
import { TeamSection } from './TeamSection';
import { MatchScore } from './MatchScore';

interface MatchTeamsProps {
  match: MatchSummary;
}

export function MatchTeams({ match }: MatchTeamsProps) {
  return (
    <div className="flex justify-between items-start gap-4">
      <TeamSection
        name={match.teams.faction1.name}
        roster={match.teams.faction1.roster}
        className="flex-1"
      />
      <MatchScore
        score1={match.teams.faction1.score}
        score2={match.teams.faction2.score}
      />
      <TeamSection
        name={match.teams.faction2.name}
        roster={match.teams.faction2.roster}
        className="flex-1 text-right"
      />
    </div>
  );
}