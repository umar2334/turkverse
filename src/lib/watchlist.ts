const STORAGE_KEY = "turkverse_watchlist";
const EVENT = "watchlist:change";
const EMPTY: string[] = [];

let snapshot: string[] = EMPTY;
let initialized = false;

function readFromStorage(): string[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as string[]) : EMPTY;
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function getWatchlist(): string[] {
  if (!initialized && typeof window !== "undefined") {
    snapshot = readFromStorage();
    initialized = true;
  }
  return snapshot;
}

export function getServerWatchlist(): string[] {
  return EMPTY;
}

export function toggleWatchlist(slug: string) {
  const current = readFromStorage();
  const next = current.includes(slug)
    ? current.filter((s) => s !== slug)
    : [...current, slug];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  snapshot = next.length > 0 ? next : EMPTY;
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function subscribeWatchlist(cb: () => void): () => void {
  const handler = () => {
    snapshot = readFromStorage();
    cb();
  };
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
