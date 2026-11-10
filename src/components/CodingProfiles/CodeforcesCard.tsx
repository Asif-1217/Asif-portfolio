import { ExternalLink, TrendingUp, Trophy, Star, RefreshCw, AlertCircle } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useApi } from '../../hooks/useApi';
import {
  getCodeforcesUser,
  getCodeforcesRatingHistory,
  getCodeforcesSubmissions,
  getUniqueSolvedCount,
} from '../../services/codeforces';
import { platformUsernames, socialLinks } from '../../config/social';
import type { CodeforcesRatingChange } from '../../types';

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-white/5" />
        ))}
      </div>
      <div className="h-64 rounded-xl bg-white/5" />
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center py-12">
      <AlertCircle size={40} className="text-red-400 mx-auto mb-3" />
      <p className="text-gray-400 mb-4">
        Could not load Codeforces data. Please check your connection.
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-500 transition-colors"
      >
        <RefreshCw size={14} />
        Retry
      </button>
    </div>
  );
}

function getRankColor(rank: string): string {
  const r = rank?.toLowerCase() || '';
  if (r.includes('legendary')) return 'text-red-400';
  if (r.includes('international')) return 'text-orange-400';
  if (r.includes('grandmaster')) return 'text-red-500';
  if (r.includes('master')) return 'text-orange-500';
  if (r.includes('candidate')) return 'text-violet-400';
  if (r.includes('expert')) return 'text-blue-400';
  if (r.includes('specialist')) return 'text-cyan-400';
  if (r.includes('pupil')) return 'text-green-400';
  return 'text-gray-400';
}

// Custom tooltip for chart
interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#101A2B] border border-blue-900/50 rounded-xl p-3 shadow-xl text-sm">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        <p className="text-blue-400 font-semibold">Rating: {payload[0].value}</p>
      </div>
    );
  }
  return null;
}

export default function CodeforcesCard() {
  const handle = platformUsernames.codeforces;

  const {
    data: user,
    status: userStatus,
    refetch: refetchUser,
  } = useApi(() => getCodeforcesUser(handle), [handle]);

  const {
    data: ratingHistory,
    status: ratingStatus,
  } = useApi(() => getCodeforcesRatingHistory(handle), [handle]);

  const {
    data: submissions,
    status: subStatus,
  } = useApi(() => getCodeforcesSubmissions(handle), [handle]);

  const isLoading = userStatus === 'loading' || userStatus === 'idle';
  const hasError = userStatus === 'error';

  const solvedCount =
    submissions && subStatus === 'success'
      ? getUniqueSolvedCount(submissions)
      : null;

  const chartData: { contest: string; rating: number }[] = ratingHistory
    ? ratingHistory.map((r: CodeforcesRatingChange, idx: number) => ({
        contest: `#${idx + 1}`,
        rating: r.newRating,
      }))
    : [];

  if (isLoading) return <SkeletonCard />;
  if (hasError) return <ErrorState onRetry={refetchUser} />;
  if (!user) return null;

  const statCards = [
    {
      label: 'Current Rating',
      value: user.rating ?? 'Unrated',
      icon: TrendingUp,
      color: 'text-blue-400',
    },
    {
      label: 'Max Rating',
      value: user.maxRating ?? '—',
      icon: Star,
      color: 'text-yellow-400',
    },
    {
      label: 'Current Rank',
      value: user.rank
        ? user.rank.replace(/(^|\s)\S/g, (c) => c.toUpperCase())
        : 'Unrated',
      icon: Trophy,
      color: getRankColor(user.rank),
      isText: true,
    },
    {
      label: 'Problems Solved',
      value: subStatus === 'loading' ? '...' : (solvedCount ?? '—'),
      icon: Star,
      color: 'text-green-400',
    },
  ];

  return (
    <div>
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 p-5 rounded-2xl bg-[#101A2B] border border-blue-900/30">
        {user.avatar && (
          <img
            src={user.avatar}
            alt={user.handle}
            className="w-14 h-14 rounded-xl border-2 border-blue-500/40"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-white font-bold text-xl">{user.handle}</h3>
            <span className={`font-medium text-sm ${getRankColor(user.rank)}`}>
              {user.rank
                ? user.rank.replace(/(^|\s)\S/g, (c) => c.toUpperCase())
                : 'Unrated'}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Max rank:{' '}
            <span className={`font-medium ${getRankColor(user.maxRank)}`}>
              {user.maxRank
                ? user.maxRank.replace(/(^|\s)\S/g, (c) => c.toUpperCase())
                : '—'}
            </span>
          </p>
        </div>
        <a
          href={socialLinks.codeforces}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
        >
          View Profile <ExternalLink size={14} />
        </a>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map(({ label, value, icon: Icon, color, isText }) => (
          <div
            key={label}
            className="p-5 rounded-2xl bg-[#101A2B] border border-blue-900/30 hover:border-blue-500/30 transition-colors duration-200"
          >
            <Icon size={18} className={`${color} mb-3`} />
            <div
              className={`${isText ? 'text-base' : 'text-2xl'} font-bold ${color} mb-1`}
            >
              {value}
            </div>
            <div className="text-gray-500 text-xs">{label}</div>
          </div>
        ))}
      </div>

      {/* Rating history chart */}
      {ratingStatus === 'success' && chartData.length > 0 && (
        <div className="p-5 rounded-2xl bg-[#101A2B] border border-blue-900/30">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-blue-400" />
            Rating History
            <span className="text-gray-500 text-xs font-normal ml-auto">
              {chartData.length} contests
            </span>
          </h4>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f20" />
              <XAxis
                dataKey="contest"
                tick={{ fill: '#6b7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval={Math.max(1, Math.floor(chartData.length / 8))}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={1200} stroke="#22d3ee20" strokeDasharray="4 4" />
              <ReferenceLine y={1400} stroke="#3b82f620" strokeDasharray="4 4" />
              <ReferenceLine y={1600} stroke="#8b5cf620" strokeDasharray="4 4" />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#3B82F6"
                strokeWidth={2.5}
                dot={chartData.length < 20 ? { fill: '#3B82F6', r: 4 } : false}
                activeDot={{ r: 6, fill: '#60a5fa' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {ratingStatus === 'success' && chartData.length === 0 && (
        <div className="p-5 rounded-2xl bg-[#101A2B] border border-blue-900/30 text-center text-gray-500 text-sm py-10">
          No contest history available yet.
        </div>
      )}
    </div>
  );
}
