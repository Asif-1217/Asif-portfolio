import { ExternalLink, CheckCircle, Award, Activity, BarChart2, RefreshCw } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { getVJudgeStats } from '../../services/vjudge';
import { platformUsernames, socialLinks } from '../../config/social';
import { VJudgeIcon } from '../UI/Icons';

function SkeletonCard() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-24 rounded-xl bg-white/5" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-white/5" />
        ))}
      </div>
      <div className="h-44 rounded-xl bg-white/5" />
    </div>
  );
}

function FallbackState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center py-12 px-6 rounded-2xl bg-[#101A2B] border border-blue-900/30">
      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
        <VJudgeIcon size={28} />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">
        Virtual Judge Profile
      </h3>
      <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
        Could not load live statistics right now. You can explore my problem-solving activity directly on Virtual Judge.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={socialLinks.vjudge}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium text-sm hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-950/40"
        >
          Open VJudge Profile <ExternalLink size={14} />
        </a>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 transition-colors"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      </div>
    </div>
  );
}

export default function VJudgeCard() {
  const username = platformUsernames.vjudge;

  const {
    data: stats,
    status,
    refetch,
  } = useApi(() => getVJudgeStats(username), [username]);

  const isLoading = status === 'loading' || status === 'idle';
  const hasError = status === 'error' || !stats;

  if (isLoading) return <SkeletonCard />;
  if (hasError) return <FallbackState onRetry={refetch} />;

  const statCards = [
    {
      label: 'Problems Solved',
      value: stats.totalSolved,
      icon: CheckCircle,
      color: 'text-green-400',
      sub: 'Unique accepted',
    },
    {
      label: 'Total Submissions',
      value: stats.totalSubmissions,
      icon: BarChart2,
      color: 'text-blue-400',
      sub: 'All attempts',
    },
    {
      label: 'Accepted Submissions',
      value: stats.acceptedSubmissions,
      icon: Award,
      color: 'text-cyan-400',
      sub: 'AC verdicts',
    },
    {
      label: 'Acceptance Rate',
      value: `${stats.acceptanceRate}%`,
      icon: Activity,
      color: 'text-yellow-400',
      sub: 'Solve efficiency',
    },
  ];

  return (
    <div>
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 p-5 rounded-2xl bg-[#101A2B] border border-blue-900/30">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-700 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-blue-950/40">
          <VJudgeIcon size={32} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-white font-bold text-xl">{stats.username}</h3>
            {stats.ranking && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-medium">
                Global Rank: #{stats.ranking.toLocaleString()}
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Virtual Judge (VJudge) Competitive Programming Profile
          </p>
        </div>
        <a
          href={socialLinks.vjudge}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors shadow-md shadow-blue-950/30"
        >
          View Profile <ExternalLink size={14} />
        </a>
      </div>

      {/* Real Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map(({ label, value, icon: Icon, color, sub }) => (
          <div
            key={label}
            className="p-5 rounded-2xl bg-[#101A2B] border border-blue-900/30 hover:border-blue-500/30 transition-colors duration-200"
          >
            <Icon size={18} className={`${color} mb-3`} />
            <div className={`text-2xl font-bold ${color} mb-0.5`}>{value}</div>
            <div className="text-white text-xs font-medium">{label}</div>
            <div className="text-gray-500 text-[11px] mt-0.5">{sub}</div>
          </div>
        ))}
      </div>

      {/* Progress & Solving Activity Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Problem-Solving Progress */}
        <div className="p-5 rounded-2xl bg-[#101A2B] border border-blue-900/30">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <BarChart2 size={16} className="text-cyan-400" />
            Problem-Solving Progress
          </h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-400">Accepted vs Attempted</span>
                <span className="text-cyan-400 font-medium">
                  {stats.totalSolved} / {stats.totalSubmissions} ({stats.acceptanceRate}%)
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700"
                  style={{ width: `${Math.min(100, stats.acceptanceRate)}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/3 border border-white/5">
                <div className="text-gray-400 text-xs">Total Solved</div>
                <div className="text-white font-bold text-lg mt-0.5">
                  {stats.totalSolved}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/3 border border-white/5">
                <div className="text-gray-400 text-xs">Success Rate</div>
                <div className="text-cyan-400 font-bold text-lg mt-0.5">
                  {stats.acceptanceRate}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solving Activity */}
        <div className="p-5 rounded-2xl bg-[#101A2B] border border-blue-900/30">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Activity size={16} className="text-blue-400" />
            Solving Activity
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5">
              <span className="text-gray-400 text-sm">All-time Solved</span>
              <span className="text-green-400 font-bold text-base">
                {stats.totalSolved} problems
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5">
              <span className="text-gray-400 text-sm">Last 30 Days</span>
              <span className="text-blue-300 font-medium text-sm">
                {stats.acLast30Days} problems
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5">
              <span className="text-gray-400 text-sm">Last 7 Days</span>
              <span className="text-gray-300 font-medium text-sm">
                {stats.acLast7Days} problems
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
