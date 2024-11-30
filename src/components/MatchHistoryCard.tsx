import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Clock, Loader2 } from 'lucide-react';
import type { MatchSummary } from '@/types';

interface MatchHistoryCardProps {
  matches: MatchSummary[];
  onLoadMore: () => void;
  loadingMore: boolean;
}

export function MatchHistoryCard({ matches, onLoadMore, loadingMore }: MatchHistoryCardProps) {
  return (
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
      <CardFooter className="flex justify-center py-4">
        <button
          onClick={onLoadMore}
          disabled={loadingMore}
          className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
        >
          {loadingMore ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading...
            </div>
          ) : (
            'Load More'
          )}
        </button>
      </CardFooter>
    </Card>
  );
}