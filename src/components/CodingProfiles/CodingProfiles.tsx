import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import CodeforcesCard from './CodeforcesCard';
import VJudgeCard from './VJudgeCard';
import { CodeforcesIcon, VJudgeIcon } from '../UI/Icons';

type Tab = 'codeforces' | 'vjudge';

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: 'codeforces', label: 'Codeforces', icon: CodeforcesIcon },
  { id: 'vjudge', label: 'VJudge', icon: VJudgeIcon },
];

export default function CodingProfiles() {
  const [activeTab, setActiveTab] = useState<Tab>('codeforces');
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="coding-profiles"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#080D1A]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/4 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Stats & Activity
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Coding Profiles
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            Explore my competitive programming performance, contest rating progression, and
            problem-solving activity across Codeforces and Virtual Judge.
          </p>
        </div>

        {/* Tab switcher: Codeforces & VJudge ONLY */}
        <div
          className={`flex justify-center mb-8 transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex p-1.5 rounded-2xl bg-[#101A2B] border border-blue-900/40 gap-1.5 shadow-lg shadow-blue-950/20">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        <div
          className={`transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {activeTab === 'codeforces' && <CodeforcesCard />}
          {activeTab === 'vjudge' && <VJudgeCard />}
        </div>
      </div>
    </section>
  );
}
