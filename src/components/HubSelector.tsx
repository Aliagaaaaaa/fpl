import { useHub } from '@/contexts/HubContext';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Globe2 } from 'lucide-react';

export function HubSelector() {
  const { currentHub, setCurrentHub, hubs } = useHub();

  return (
    <Card className="border-2 mb-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-primary" />
          <CardTitle>Select Hub</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hubs.map((hub) => (
            <button
              key={hub.id}
              onClick={() => hub.enabled && setCurrentHub(hub)}
              className={`p-4 rounded-lg text-left transition-colors ${
                hub.enabled
                  ? currentHub.id === hub.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 hover:bg-muted/70'
                  : 'bg-muted/30 cursor-not-allowed'
              }`}
              disabled={!hub.enabled}
            >
              <div className="font-medium">{hub.name}</div>
              <div className="text-sm mt-1">
                {hub.enabled ? (
                  hub.region
                ) : (
                  <span className="text-muted-foreground">Coming Soon</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}