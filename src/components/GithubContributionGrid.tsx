import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon, GitCommitIcon, FlameIcon, CalendarIcon } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total: {
    lastYear?: number;
    [key: string]: number | undefined;
  };
  contributions: ContributionDay[];
}

const COLOR_LEVELS: Record<number, string> = {
  0: '#1A1A1E', // Dark subtle char
  1: '#591D02', // Deep ember
  2: '#9E3304', // Warm burnt orange
  3: '#D64000', // Intense orange
  4: '#FF4D00', // Signature Signal Orange
};

const BORDER_LEVELS: Record<number, string> = {
  0: '#26262A',
  1: '#7A2803',
  2: '#BD3D05',
  3: '#FA4B00',
  4: '#FF6A26',
};

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function GithubContributionGrid({ username = 'Swarspage' }: { username?: string }) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchContributions() {
      try {
        setLoading(true);
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        if (!res.ok) throw new Error('Failed to fetch contributions');
        const json = await res.json();
        if (isMounted) {
          setData(json);
          setError(false);
        }
      } catch (err) {
        console.debug('GitHub contributions API fallback enabled:', err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchContributions();
    return () => {
      isMounted = false;
    };
  }, [username]);

  // Group contributions into 53 weeks
  const { weeks, monthLabels, stats } = useMemo(() => {
    if (!data?.contributions || data.contributions.length === 0) {
      return { weeks: [], monthLabels: [], stats: { total: 0, activeDays: 0, maxDayCount: 0 } };
    }

    const weeksArr: ContributionDay[][] = [];
    let curWeek: ContributionDay[] = [];
    let activeDays = 0;
    let maxDayCount = 0;

    data.contributions.forEach((c) => {
      if (c.count > 0) {
        activeDays += 1;
        if (c.count > maxDayCount) maxDayCount = c.count;
      }
      const day = new Date(`${c.date}T00:00:00`).getDay();
      if (day === 0 && curWeek.length > 0) {
        weeksArr.push(curWeek);
        curWeek = [];
      }
      curWeek.push(c);
    });
    if (curWeek.length > 0) weeksArr.push(curWeek);

    // Compute month label positions
    const months: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeksArr.forEach((week, wIdx) => {
      const firstValidDay = week[0];
      if (firstValidDay) {
        const d = new Date(`${firstValidDay.date}T00:00:00`);
        const m = d.getMonth();
        if (m !== lastMonth) {
          months.push({ label: MONTH_NAMES[m], weekIndex: wIdx });
          lastMonth = m;
        }
      }
    });

    const total = data.total?.lastYear ?? data.contributions.reduce((acc, c) => acc + c.count, 0);

    return {
      weeks: weeksArr,
      monthLabels: months,
      stats: { total, activeDays, maxDayCount },
    };
  }, [data]);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(`${dateStr}T00:00:00`);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-char/60 p-6 md:p-8 backdrop-blur-sm">
      {/* Top Header & Stat Badges */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-signal">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            <span>Shipping in the open</span>
          </div>

          <h3 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-bone md:text-3xl">
            Code activity & commits<span className="text-signal">.</span>
          </h3>

          <p className="mt-2 text-sm text-steel">
            A daily log of what I'm building on GitHub - from full-stack platforms to late-night experiments.
          </p>
        </div>

        {/* Quick Stats Pills */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 rounded-lg border border-line bg-ink/80 px-3 py-2 text-bone">
            <GitCommitIcon className="h-3.5 w-3.5 text-signal" />
            <span>
              <strong className="text-signal">{loading ? '...' : stats.total}</strong> Commits this year
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-line bg-ink/80 px-3 py-2 text-bone">
            <FlameIcon className="h-3.5 w-3.5 text-signal" />
            <span>
              <strong className="text-signal">{loading ? '...' : stats.activeDays}</strong> Active days
            </span>
          </div>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-lg border border-line bg-ink/80 px-3 py-2 text-steel transition-colors hover:border-signal/50 hover:bg-signal hover:text-ink"
            title={`View @${username} on GitHub`}
          >
            <span>@{username}</span>
            <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Daily Inspector Bar */}
      <div className="mt-6 flex min-h-[32px] items-center justify-between border-y border-line/60 py-2 font-mono text-[11px] uppercase tracking-wider text-steel">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-3 w-3 text-smoke" />
          {hoveredDay ? (
            <span className="text-bone">
              <strong className="text-signal">{hoveredDay.count}</strong>{' '}
              {hoveredDay.count === 1 ? 'commit' : 'commits'} on{' '}
              <span className="text-bone font-semibold">{formatDate(hoveredDay.date)}</span>
            </span>
          ) : (
            <span className="text-smoke">Hover over any day to see details</span>
          )}
        </div>

        {/* Legend */}
        <div className="hidden items-center gap-1.5 sm:flex">
          <span className="text-[10px] text-smoke">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span
              key={level}
              className="h-2.5 w-2.5 rounded-[2px]"
              style={{
                backgroundColor: COLOR_LEVELS[level],
                border: `1px solid ${BORDER_LEVELS[level]}`,
              }}
            />
          ))}
          <span className="text-[10px] text-smoke">More</span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="mt-6 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
        {loading ? (
          <div className="flex h-36 w-full items-center justify-center">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-smoke">
              <span className="h-2 w-2 animate-ping rounded-full bg-signal" />
              <span>Loading contribution graph...</span>
            </div>
          </div>
        ) : error || weeks.length === 0 ? (
          /* High-resolution fallback using tinted SVG if the API is unreachable */
          <div className="flex flex-col items-center justify-center py-4">
            <img
              src={`https://ghchart.rshah.org/FF4D00/${username}`}
              alt={`${username}'s GitHub contribution calendar`}
              className="w-full max-w-full opacity-90 invert-[0.88] hue-rotate-[180deg] contrast-150 filter"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="min-w-[760px] select-none">
            {/* Month Labels */}
            <div className="mb-2 flex pl-7 text-[10px] font-mono text-smoke">
              {monthLabels.map((m, idx) => (
                <div
                  key={`${m.label}-${idx}`}
                  style={{
                    // Approximate column width (11px box + 3px gap = 14px)
                    marginLeft: idx === 0 ? `${m.weekIndex * 14}px` : undefined,
                    width: idx < monthLabels.length - 1 ? `${(monthLabels[idx + 1].weekIndex - m.weekIndex) * 14}px` : 'auto',
                  }}
                  className="truncate"
                >
                  {m.label}
                </div>
              ))}
            </div>

            {/* Weeks Columns */}
            <div className="flex gap-[3px]">
              {/* Day-of-week abbreviations (Mon, Wed, Fri) */}
              <div className="flex flex-col justify-between pr-2 text-[9px] font-mono text-smoke leading-none py-[2px]">
                <span className="h-[11px]"></span>
                <span className="h-[11px] leading-[11px]">Mon</span>
                <span className="h-[11px]"></span>
                <span className="h-[11px] leading-[11px]">Wed</span>
                <span className="h-[11px]"></span>
                <span className="h-[11px] leading-[11px]">Fri</span>
                <span className="h-[11px]"></span>
              </div>

              {weeks.map((week, wIdx) => (
                <div key={`week-${wIdx}`} className="flex flex-col gap-[3px]">
                  {Array.from({ length: 7 }).map((_, dIdx) => {
                    const dayItem = week.find((item) => new Date(`${item.date}T00:00:00`).getDay() === dIdx);

                    if (!dayItem) {
                      return <div key={`empty-${wIdx}-${dIdx}`} className="h-[11px] w-[11px]" />;
                    }

                    const isHovered = hoveredDay?.date === dayItem.date;

                    return (
                      <motion.div
                        key={dayItem.date}
                        whileHover={{ scale: 1.35 }}
                        transition={{ duration: 0.12 }}
                        onMouseEnter={() => setHoveredDay(dayItem)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className="relative h-[11px] w-[11px] rounded-[2px] cursor-pointer transition-colors"
                        style={{
                          backgroundColor: COLOR_LEVELS[dayItem.level],
                          border: `1px solid ${isHovered ? '#FFFFFF' : BORDER_LEVELS[dayItem.level]}`,
                          boxShadow: isHovered ? '0 0 8px rgba(255, 77, 0, 0.8)' : undefined,
                          zIndex: isHovered ? 20 : 1,
                        }}
                        title={`${dayItem.count} contributions on ${formatDate(dayItem.date)}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
