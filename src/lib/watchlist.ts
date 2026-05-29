import { useEffect, useState, useSyncExternalStore } from "react";

export type WatchlistStatus =
  | "Interesting"
  | "Monitor"
  | "High Priority"
  | "Not Relevant";

type WatchlistMap = Record<string, WatchlistStatus>;

const STORAGE_KEY = "schott-oi-watchlist";

let memory: WatchlistMap = {};
const listeners = new Set<() => void>();

function read(): WatchlistMap {
  if (typeof window === "undefined") return memory;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) memory = JSON.parse(raw) as WatchlistMap;
  } catch {
    /* ignore */
  }
  return memory;
}

function write(next: WatchlistMap) {
  memory = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot() {
  return memory;
}

function getServerSnapshot() {
  return memory;
}

export function useWatchlist() {
  // Hydrate from localStorage on the client once.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    read();
    listeners.forEach((l) => l());
    setReady(true);
  }, []);

  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    ready,
    watchlist: state,
    isSaved: (id: string) => Boolean(state[id]),
    statusOf: (id: string): WatchlistStatus | undefined => state[id],
    set: (id: string, status: WatchlistStatus) => write({ ...read(), [id]: status }),
    remove: (id: string) => {
      const next = { ...read() };
      delete next[id];
      write(next);
    },
  };
}
