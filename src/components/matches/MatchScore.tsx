import React from 'react';

interface MatchScoreProps {
  score1: number;
  score2: number;
}

export function MatchScore({ score1, score2 }: MatchScoreProps) {
  return (
    <div className="px-4 font-bold tabular-nums pt-1">
      {score1} - {score2}
    </div>
  );
}