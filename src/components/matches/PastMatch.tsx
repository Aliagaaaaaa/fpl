import React from 'react';
import { Link } from 'react-router-dom';
import type { MatchSummary } from '@/types';
import { MatchTeams } from './MatchTeams';
import { formatDate } from '@/lib/utils';

interface PastMatchProps {
  match: MatchSummary;
}

export function PastMatch({ match }: PastMatchProps) {
  return (
    <Link
      to={`/match/${match.match_id}`}
      className="block p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium">{match.map}</div>
        <div className="text-sm text-muted-foreground">
          {formatDate(match.started_at)}
        </div>
      </div>
      <MatchTeams match={match} />
    </Link>
  );
}