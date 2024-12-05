import React, { createContext, useContext, useState, useEffect } from 'react';
import { HUBS } from '@/lib/constants';
import type { Hub, HubContextType } from '@/types';

const HubContext = createContext<HubContextType | undefined>(undefined);

export function HubProvider({ children }: { children: React.ReactNode }) {
  const [currentHub, setCurrentHub] = useState<Hub>(() => {
    const savedHub = localStorage.getItem('selectedHub');
    if (savedHub) {
      const hub = HUBS.find(h => h.id === savedHub);
      if (hub && hub.enabled) {
        return hub;
      }
    }
    return HUBS[0];
  });

  useEffect(() => {
    localStorage.setItem('selectedHub', currentHub.id);
  }, [currentHub]);

  return (
    <HubContext.Provider value={{ currentHub, setCurrentHub, hubs: HUBS }}>
      {children}
    </HubContext.Provider>
  );
}

export function useHub() {
  const context = useContext(HubContext);
  if (context === undefined) {
    throw new Error('useHub must be used within a HubProvider');
  }
  return context;
}