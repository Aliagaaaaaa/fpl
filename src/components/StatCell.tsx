import React from 'react';
import { cn } from '@/lib/utils';

interface StatCellProps {
  value: number | string;
  highlight?: boolean;
}

export const StatCell: React.FC<StatCellProps> = ({ value, highlight }) => {
  return (
    <div className="px-3 py-2.5 text-center">
      <div className={cn(
        "tabular-nums",
        highlight && "font-medium text-primary"
      )}>
        {value}
      </div>
    </div>
  );
};