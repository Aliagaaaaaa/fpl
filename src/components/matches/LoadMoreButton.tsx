import { Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  loading: boolean;
}

export function LoadMoreButton({ onLoadMore, loading }: LoadMoreButtonProps) {
  return (
    <button
      onClick={onLoadMore}
      disabled={loading}
      className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </div>
      ) : (
        'Load More'
      )}
    </button>
  );
}