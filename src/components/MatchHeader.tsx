import React from 'react';
import { Map } from 'lucide-react';
import { Card, CardHeader } from './ui/card';

interface MatchHeaderProps {
  map: string;
  duration: string;
}

export const MatchHeader: React.FC<MatchHeaderProps> = ({ map, duration }) => {
  return (
    <Card className="mb-4 border-2">
      <CardHeader className="py-4 flex-row justify-between">
        <div className="flex items-center gap-3">
          <Map className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium tracking-tight">{map}</span>
        </div>
        <div className="text-sm text-muted-foreground tabular-nums">
          Duration: {duration}
        </div>
      </CardHeader>
    </Card>
  );
};