
import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

interface WatchlistContextType {
  watchlist: string[];
  addToWatchlist: (coinId: string) => void;
  removeFromWatchlist: (coinId: string) => void;
  isInWatchlist: (coinId: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { readonly children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('crypto-watchlist');
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse watchlist', e);
      }
    } else {
        // Default favorites
        setWatchlist(['bitcoin', 'ethereum', 'solana']);
    }
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('crypto-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (coinId: string) => {
    setWatchlist((prev) => {
      if (prev.includes(coinId)) return prev;
      return [...prev, coinId];
    });
  };

  const removeFromWatchlist = (coinId: string) => {
    setWatchlist((prev) => prev.filter((id) => id !== coinId));
  };

  const isInWatchlist = (coinId: string) => {
    return watchlist.includes(coinId);
  };

  const value = useMemo(() => ({
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  }), [watchlist]);

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}
