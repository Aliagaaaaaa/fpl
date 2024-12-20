import React from 'react';
import type { MatchPlayer } from '@/types';

interface TeamRosterProps {
  players: MatchPlayer[];
  className?: string;
}

export function TeamRoster({ players, className = "" }: TeamRosterProps) {
  return (
    <div className={className}>
      {players.map((player, index) => (
        <div
          key={player.nickname}
          className={`text-sm ${index !== players.length - 1 ? 'mb-0.5' : ''}`}
        >
          {player.nickname}
        </div>
      ))}
    </div>
  );
}