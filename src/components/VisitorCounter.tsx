import { useEffect, useState } from 'react';

const COUNTER_KEY = 'swarshinde_portfolio_v4_visits';
const API_BASE = 'https://countapi.mileshilliard.com/api/v1';

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchVisitorCount() {
      try {
        const hasVisitedThisSession = sessionStorage.getItem('swar_portfolio_session_viewed');
        const isDev = import.meta.env.DEV;

        // In dev or within same session, read only without inflating hits
        const endpoint = hasVisitedThisSession || isDev
          ? `${API_BASE}/get/${COUNTER_KEY}`
          : `${API_BASE}/hit/${COUNTER_KEY}`;

        const res = await fetch(endpoint);
        if (!res.ok) {
          // If key doesn't exist yet on 'get', trigger initial hit
          if (res.status === 404) {
            const hitRes = await fetch(`${API_BASE}/hit/${COUNTER_KEY}`);
            if (hitRes.ok) {
              const hitData = await hitRes.json();
              if (isMounted && typeof hitData.value === 'number') {
                setCount(hitData.value);
                sessionStorage.setItem('swar_portfolio_session_viewed', '1');
              }
            }
          }
          return;
        }

        const data = await res.json();
        if (isMounted && typeof data.value === 'number') {
          setCount(data.value);
          if (!hasVisitedThisSession && !isDev) {
            sessionStorage.setItem('swar_portfolio_session_viewed', '1');
          }
        }
      } catch (err) {
        // Silently handle offline/network issues without disturbing user experience
        console.debug('Visitor count fetch skipped:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchVisitorCount();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div
        className="inline-flex items-center gap-2 border border-ink/25 bg-ink/5 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink"
        aria-hidden="true"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/40" />
        <span className="opacity-60">System telemetry...</span>
      </div>
    );
  }

  if (count === null) {
    return null;
  }

  return (
    <div
      className="inline-flex items-center gap-2.5 border border-ink/30 bg-ink/5 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors duration-150 hover:bg-ink hover:text-signal"
      title={`${count.toLocaleString()} visits tracked`}
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
      </span>
      <span>
        <span className="font-extrabold">{count.toLocaleString()}</span>{' '}
        <span className="opacity-80">visits</span>
      </span>
    </div>
  );
}
