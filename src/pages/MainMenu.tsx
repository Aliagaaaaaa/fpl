import { useState, useEffect } from 'react';
import { fetchLeaderboards, fetchMatchHistory, fetchTopPlayers } from '@/lib/api';
import { LeaderboardCard } from '@/components/LeaderboardCard';
import { MatchHistoryCard } from '@/components/MatchHistoryCard';
import { QualifiersCard } from '@/components/QualifiersCard';
import { HubSelector } from '@/components/HubSelector';
import { useHub } from '@/contexts/HubContext';
import { Loader2 } from 'lucide-react';
import { FPL_PLAYERS } from '@/lib/constants';
import type { LeaderboardSeason, MatchSummary, QualifyingPlayer } from '@/types';

const ITEMS_PER_PAGE = 20;

export function MainMenu() {
  const { currentHub } = useHub();
  const [leaderboards, setLeaderboards] = useState<LeaderboardSeason[]>([]);
  const [matches, setMatches] = useState<MatchSummary[]>([]);
  const [qualifyingPlayers, setQualifyingPlayers] = useState<QualifyingPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [showQualifiers, setShowQualifiers] = useState(false);

  useEffect(() => {
    setLoading(true);
    setOffset(0);
    setMatches([]);
    setLeaderboards([]);

    Promise.all([
      fetchLeaderboards(currentHub.id),
      fetchMatchHistory(currentHub.id),
      currentHub.id === 'bde68960-b86c-4798-a132-f3b0e716d19b' ? fetchTopPlayers() : Promise.resolve([])
    ])
      .then(([leaderboardsData, matchesData, topPlayersData]) => {
        setLeaderboards(leaderboardsData);
        setMatches(matchesData);

        if (topPlayersData.length > 0) {
          const processedPlayers = topPlayersData
            .filter(player => !FPL_PLAYERS.includes(player.nickname))
            .map(player => ({
              ...player,
              willQualify: true
            }))
            .slice(0, 30);

          setQualifyingPlayers(processedPlayers);
        }

        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load data');
        setLoading(false);
        console.error('Error fetching data:', err);
      });
  }, [currentHub.id]);

  const handleLoadMore = async () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    const newOffset = offset + ITEMS_PER_PAGE;
    
    try {
      const newMatches = await fetchMatchHistory(currentHub.id, newOffset);
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
        <HubSelector />

        {/* Button to toggle FPL Qualifiers visibility */}
        {currentHub.id === 'bde68960-b86c-4798-a132-f3b0e716d19b' && (
          <button
            onClick={() => setShowQualifiers(!showQualifiers)}
            className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {showQualifiers ? 'Hide FPL Qualifiers' : 'Show FPL Qualifiers'}
          </button>
        )}

        {/* Conditionally render the QualifiersCard */}
        {currentHub.id === 'bde68960-b86c-4798-a132-f3b0e716d19b' && showQualifiers && qualifyingPlayers.length > 0 && (
          <QualifiersCard players={qualifyingPlayers} />
        )}

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