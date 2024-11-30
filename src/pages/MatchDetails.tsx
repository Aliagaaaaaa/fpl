import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MatchHeader } from '@/components/MatchHeader';
import { TeamStats } from '@/components/TeamStats';
import { fetchMatchStats } from '@/lib/api';
import { ArrowLeft, Loader2 } from 'lucide-react';
import type { MatchResult } from '@/types';

export function MatchDetails() {
  const { matchId } = useParams<{ matchId: string }>();
  const [match, setMatch] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!matchId) return;

    fetchMatchStats(matchId)
      .then(data => {
        setMatch(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load match details');
        setLoading(false);
        console.error('Error fetching match details:', err);
      });
  }, [matchId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-medium text-destructive">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Matches
        </Link>

        <MatchHeader 
          map={match.map}
          duration={match.duration}
        />

        <div className="space-y-4">
          {match.teams.map((team, index) => (
            <TeamStats
              key={team.name}
              team={team}
              isWinner={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}