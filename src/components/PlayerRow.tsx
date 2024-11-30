import React from 'react';
import { StatCell } from './StatCell';
import type { Player } from '../types';

interface PlayerRowProps {
  player: Player;
  isTopPlayer: boolean;
}

export const PlayerRow: React.FC<PlayerRowProps> = ({ player, isTopPlayer }) => {
  return (
    <div className={`grid grid-cols-13 items-center text-sm border-border hover:bg-muted/30 transition-colors
      ${isTopPlayer ? 'bg-muted/50' : ''}`}>
      <div className="px-3 py-2.5 font-medium tracking-tight">{player.name}</div>
      <StatCell value={player.kills} highlight={true} />
      <StatCell value={player.assists} />
      <StatCell value={player.deaths} />
      <StatCell value={player.kRatio.toFixed(2)} />
      <StatCell value={player.kdRatio.toFixed(2)} />
      <StatCell value={player.headshots} />
      <StatCell value={`${player.headshotPercentage}%`} />
      <StatCell value={player.mvps} />
      <StatCell value={player.tripleKills} />
      <StatCell value={player.quadroKills} />
      <StatCell value={player.pentaKills} />
      <StatCell value={player.adr.toFixed(1)} highlight={true} />
    </div>
  );
};