const STORAGE_KEY = "turkverse_watchlist";
const EVENT = "watchlist:change";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function write(list: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function getWatchlist(): string[] {
  return read();
}

export function getServerWatchlist(): string[] {
  return [];
}

export function toggleWatchlist(slug: string) {
  const list = read();
  if (list.includes(slug)) {
    write(list.filter((s) => s !== slug));
  } else {
    write([...list, slug]);
  }
}

export function subscribeWatchlist(cb: () => void): () => void {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
