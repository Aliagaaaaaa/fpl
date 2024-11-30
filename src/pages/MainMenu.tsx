import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchLeaderboards, fetchMatchHistory } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Trophy, Clock, Loader2 } from 'lucide-react';
import type { LeaderboardSeason, MatchSummary } from '@/types';

export function MainMenu() {
  const [leaderboards, setLeaderboards] = useState<LeaderboardSeason[]>([]);
  const [matches, setMatches] = useState<MatchSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetchLeaderboards(),
      fetchMatchHistory()
    ])
      .then(([leaderboardsData, matchesData]) => {
        setLeaderboards(leaderboardsData);
        setMatches(matchesData);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load data');
        setLoading(false);
        console.error('Error fetching data:', err);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-medium text-destructive">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leaderboards Section */}
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

          {/* Match History Section */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <CardTitle>Recent Matches</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {matches.map(match => (
                  <Link
                    key={match.match_id}
                    to={`/match/${match.match_id}`}
                    className="block p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{match.map}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(match.started_at * 1000).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="font-medium">{match.teams.faction1.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {match.teams.faction1.roster.slice(0, 3).map(p => p.nickname).join(', ')}
                          {match.teams.faction1.roster.length > 3 ? '...' : ''}
                        </div>
                      </div>
                      <div className="px-4 font-bold tabular-nums">
                        {match.teams.faction1.score} - {match.teams.faction2.score}
                      </div>
                      <div className="flex-1 text-right">
                        <div className="font-medium">{match.teams.faction2.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {match.teams.faction2.roster.slice(0, 3).map(p => p.nickname).join(', ')}
                          {match.teams.faction2.roster.length > 3 ? '...' : ''}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}