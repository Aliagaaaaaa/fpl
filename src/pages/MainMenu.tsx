import React, { useState, useEffect } from 'react';
import { fetchLeaderboards, fetchMatchHistory } from '@/lib/api';
import { LeaderboardCard } from '@/components/LeaderboardCard';
import { MatchHistoryCard } from '@/components/MatchHistoryCard';
import { Loader2 } from 'lucide-react';
import type { LeaderboardSeason, MatchSummary } from '@/types';

const ITEMS_PER_PAGE = 20;

export function MainMenu() {
  const [leaderboards, setLeaderboards] = useState<LeaderboardSeason[]>([]);
  const [matches, setMatches] = useState<MatchSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);

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

  const handleLoadMore = async () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    const newOffset = offset + ITEMS_PER_PAGE;
    
    try {
      const newMatches = await fetchMatchHistory(newOffset);
      setMatches(prevMatches => [...prevMatches, ...newMatches]);
      setOffset(newOffset);
    } catch (err) {
      console.error('Error loading more matches:', err);
    } finally {
      setLoadingMore(false);
    }
  };

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
          <LeaderboardCard leaderboards={leaderboards} />
          <MatchHistoryCard 
            matches={matches}
            onLoadMore={handleLoadMore}
            loadingMore={loadingMore}
          />
        </div>
      </div>
    </div>
  );
}