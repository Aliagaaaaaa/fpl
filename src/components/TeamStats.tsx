import React from 'react';
import { PlayerRow } from './PlayerRow';
import { Trophy, Shield } from 'lucide-react';
import { Card, CardHeader, CardContent } from './ui/card';
import type { Team } from '../types';

interface TeamStatsProps {
  team: Team;
  isWinner: boolean;
}

export const TeamStats: React.FC<TeamStatsProps> = ({ team, isWinner }) => {
  const sortedPlayers = [...team.players].sort((a, b) => b.kills - a.kills);
  const topPlayer = sortedPlayers[0];

  return (
    <Card className="overflow-hidden border-2">
      <CardHeader className={`py-3 ${
        isWinner ? 'bg-primary text-primary-foreground' : 'bg-card'
      }`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {team.side === 'CT' ? 
              <Shield className="w-5 h-5" /> : 
              <Trophy className="w-5 h-5" />
            }
            <span className="font-bold tracking-tight">{team.name}</span>
          </div>
          <span className="text-2xl font-bold tabular-nums">{team.score}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <div className="min-w-full divide-y divide-border">
            <div className="grid grid-cols-13 text-xs uppercase tracking-wider font-medium text-muted-foreground bg-muted/50 px-2 py-2">
              <div className="pl-3">Player</div>
              <div className="text-center">Kills</div>
              <div className="text-center">Assists</div>
              <div className="text-center">Deaths</div>
              <div className="text-center">K/R</div>
              <div className="text-center">K/D</div>
              <div className="text-center">Headshots</div>
              <div className="text-center">HS%</div>
              <div className="text-center">MVPs</div>
              <div className="text-center">Triple</div>
              <div className="text-center">Quadro</div>
              <div className="text-center">Penta</div>
              <div className="text-center">ADR</div>
            </div>
            
            {sortedPlayers.map((player) => (
              <PlayerRow 
                key={player.name}
                player={player}
                isTopPlayer={player === topPlayer}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};