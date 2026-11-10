import { Trophy, Calendar, Award, Code2, Sparkles, CheckCircle, ShieldCheck, Images } from 'lucide-react';
import { contestAchievements, milestoneAchievements } from '../../config/achievements';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import PhotoGallery from './PhotoGallery';

// Distinct badges for different contest roles
function RoleBadge({ role }: { role: string }) {
  if (role === 'Mock Round Setter') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 border border-purple-500/30 text-purple-300 shadow-sm">
        <Sparkles size={12} className="text-purple-400" />
        {role}
      </span>
    );
  }
  if (role === 'Contributor') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 shadow-sm">
        <ShieldCheck size={12} className="text-cyan-400" />
        {role}
      </span>
    );
  }
  if (role === 'Volunteer') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 border border-blue-500/30 text-blue-300 shadow-sm">
        <CheckCircle size={12} className="text-blue-400" />
        {role}
      </span>
    );
  }
  // Contest Participant or general role
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 border border-blue-500/30 text-blue-300 shadow-sm">
      <Trophy size={12} className="text-blue-400" />
      {role}
    </span>
  );
}

export default function Achievements() {
  const { ref, visible } = useScrollReveal();

  const featuredContest = contestAchievements.find((c) => c.featured) || contestAchievements[0];
  const regularContests = contestAchievements.filter((c) => c.id !== featuredContest.id);

  return (
    <section
      id="achievements"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 relative overflow-hidden"
    >
      {/* Background layer */}
      <div className="absolute inset-0 bg-[#101A2B]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent" />

      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Milestones & Contests
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Achievements
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Contest participation, contributions, and problem-solving milestones across programming contests.
          </p>
        </div>

        {/* ========================================================
            1. Featured Achievement: Spring 2026 Take Off Contest
           ======================================================== */}
        <div
          className={`mb-12 transition-all duration-700 delay-150 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/30 via-[#101A2B] to-[#0a1224] border border-blue-500/40 p-6 sm:p-10 shadow-2xl shadow-blue-950/40 hover:border-blue-500/60 transition-all duration-300">
            {/* Ambient inner glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-400/40 text-blue-300 text-xs font-semibold">
                  <Trophy size={13} className="text-cyan-400" />
                  Featured Contest Achievement
                </div>

                <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  <Calendar size={13} />
                  {featuredContest.season}
                </div>
              </div>

              {/* Main 2-column layout */}
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* Left: Info, Roles, Description */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                      {featuredContest.title}
                    </h3>

                    {/* Roles Badges */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-5">
                      {featuredContest.roles.map((role) => (
                        <RoleBadge key={role} role={role} />
                      ))}
                    </div>

                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                      "{featuredContest.description}"
                    </p>
                  </div>
                </div>

                {/* Right: Event Photo Gallery */}
                <div className="lg:col-span-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold text-sm flex items-center gap-2 uppercase tracking-wider text-gray-300">
                      <Images size={15} className="text-blue-400" />
                      Event Gallery
                    </h4>
                    <span className="text-xs text-blue-400 font-medium">Click to expand</span>
                  </div>
                  <PhotoGallery
                    photos={featuredContest.photos}
                    folderHint={featuredContest.galleryFolder}
                    columns={2}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. Contests Grid: Summer 2026 & Fall 2025
           ======================================================== */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <Trophy size={18} className="text-blue-400" />
            <h3 className="text-xl font-bold text-white">
              Contest Participation History
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {regularContests.map((contest, idx) => (
              <div
                key={contest.id}
                className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#080D1A] border border-blue-900/40 hover:border-blue-500/40 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-950/40 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${250 + idx * 120}ms` }}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-300">
                      <Calendar size={12} />
                      {contest.season}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {contest.roles.map((role) => (
                        <RoleBadge key={role} role={role} />
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-white font-bold text-lg sm:text-xl mb-3 group-hover:text-blue-300 transition-colors">
                    {contest.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    "{contest.description}"
                  </p>
                </div>

                {/* Optional Event Gallery Area */}
                <div className="pt-4 border-t border-blue-900/30">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Images size={13} className="text-blue-400" />
                    <span>Event Gallery</span>
                  </div>
                  <PhotoGallery
                    photos={contest.photos}
                    folderHint={contest.galleryFolder}
                    columns={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            3. Preserved Milestones (500+ Solved & Journey)
           ======================================================== */}
        <div
          className={`transition-all duration-700 delay-400 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-[#080D1A] border border-blue-900/30">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Award size={18} className="text-yellow-400" />
              Problem-Solving Milestones
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
              {milestoneAchievements.map((milestone) => (
                <div
                  key={milestone.id}
                  className="p-5 rounded-xl bg-[#101A2B]/60 border border-blue-900/30 flex items-start gap-4 hover:border-blue-500/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-md">
                    {milestone.category === 'milestone' ? <Trophy size={20} /> : <Code2 size={20} />}
                  </div>
                  <div>
                    <div className="text-xs text-blue-400 font-medium mb-1">
                      {milestone.subtitle} • {milestone.date}
                    </div>
                    <h4 className="text-white font-bold text-base mb-1.5">
                      {milestone.title}
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
