import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import type { LeaderboardSeason } from '@/types';

interface LeaderboardCardProps {
  leaderboards: LeaderboardSeason[];
}

export function LeaderboardCard({ leaderboards }: LeaderboardCardProps) {
  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <CardTitle>Leaderboards</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboards.map(season => (
            <Link
              key={season.leaderboard_id}
              to={`/leaderboard/${season.leaderboard_id}`}
              className="block p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
            >
              <h3 className="font-medium">{season.leaderboard_name}</h3>
              <p className="text-sm text-muted-foreground">
                Season {season.season} • {season.status.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}