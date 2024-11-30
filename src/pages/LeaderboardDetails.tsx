import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchLeaderboardDetails } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Trophy, Loader2 } from 'lucide-react';
import type { LeaderboardDetails } from '@/types';

const ITEMS_PER_PAGE = 20;

export function LeaderboardDetails() {
  const { leaderboardId } = useParams<{ leaderboardId: string }>();
  const [leaderboard, setLeaderboard] = useState<LeaderboardDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);

  const loadLeaderboardData = async (currentOffset: number, append = false) => {
    if (!leaderboardId) return;

    try {
      const data = await fetchLeaderboardDetails(leaderboardId, currentOffset, ITEMS_PER_PAGE);
      
      if (append && leaderboard) {
        setLeaderboard({
          ...data,
          items: [...leaderboard.items, ...data.items]
        });
      } else {
        setLeaderboard(data);
      }
    } catch (err) {
      setError('Failed to load leaderboard details');
      console.error('Error fetching leaderboard details:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadLeaderboardData(0);
  }, [leaderboardId]);

  const handleLoadMore = async () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    const newOffset = offset + ITEMS_PER_PAGE;
    setOffset(newOffset);
    await loadLeaderboardData(newOffset, true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !leaderboard) {
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
          Back to Leaderboards
        </Link>

        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <CardTitle>{leaderboard.leaderboard.leaderboard_name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">#</th>
                    <th className="text-left py-3 px-4">Player</th>
                    <th className="text-center py-3 px-4">Matches</th>
                    <th className="text-center py-3 px-4">Won</th>
                    <th className="text-center py-3 px-4">Lost</th>
                    <th className="text-center py-3 px-4">Win Rate</th>
                    <th className="text-center py-3 px-4">Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.items.map((item) => (
                    <tr key={`${item.player.nickname}-${item.position}`} className="border-b last:border-0">
                      <td className="py-3 px-4 font-medium">{item.position}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {item.player.avatar && (
                            <img
                              src={item.player.avatar}
                              alt={item.player.nickname}
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <div>
                            <div className="font-medium">{item.player.nickname}</div>
                            <div className="text-xs text-muted-foreground uppercase">
                              {item.player.country}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">{item.played}</td>
                      <td className="text-center py-3 px-4 text-green-600">{item.won}</td>
                      <td className="text-center py-3 px-4 text-red-600">{item.lost}</td>
                      <td className="text-center py-3 px-4">{(item.win_rate * 100).toFixed(1)}%</td>
                      <td className="text-center py-3 px-4">
                        <span className={item.current_streak > 0 ? 'text-green-600' : ''}>
                          {item.current_streak}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center py-4">
            <button
              onClick={handleLoadMore}
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
      </div>
    </div>
  );
}