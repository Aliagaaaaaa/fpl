import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import type { MatchSummary } from '@/types';
import { LiveMatch } from './matches/LiveMatch';
import { PastMatch } from './matches/PastMatch';
import { LoadMoreButton } from './matches/LoadMoreButton';

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
            match.status === 'ONGOING' ? (
              <LiveMatch key={match.match_id} match={match} />
            ) : (
              <PastMatch key={match.match_id} match={match} />
            )
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center py-4">
        <LoadMoreButton onLoadMore={onLoadMore} loading={loadingMore} />
      </CardFooter>
    </Card>
  );
}