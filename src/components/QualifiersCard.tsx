import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { CountryFlag } from './CountryFlag';
import type { QualifyingPlayer } from '@/types';

interface QualifiersCardProps {
  players: QualifyingPlayer[];
}

export function QualifiersCard({ players }: QualifiersCardProps) {
  const qualifyingPlayers = players.filter(p => p.willQualify);

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <CardTitle>FPL Qualifiers</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">#</th>
                <th className="text-left py-3 px-4">Player</th>
                <th className="text-center py-3 px-4">ELO</th>
              </tr>
            </thead>
            <tbody>
              {qualifyingPlayers.map((player) => (
                <tr key={player.player_id} className="border-b last:border-0">
                  <td className="py-3 px-4 font-medium">{player.position}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <CountryFlag countryCode={player.country} />
                        <span className="font-medium">{player.nickname}</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-3 px-4 tabular-nums">
                    {player.faceit_elo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}