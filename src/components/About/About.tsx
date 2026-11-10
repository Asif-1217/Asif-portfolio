import { useState } from 'react';
import { User, MapPin, GraduationCap, Target, Code2, Trophy } from 'lucide-react';
import { personalInfo } from '../../config/personal';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const highlights = [
  {
    icon: GraduationCap,
    title: 'Education',
    desc: 'CSE Student at Daffodil International University',
  },
  {
    icon: Trophy,
    title: 'Problem Solving',
    desc: 'Competitive programming & algorithms',
  },
  {
    icon: Code2,
    title: 'Focus',
    desc: 'Algorithms, data structures & clean code',
  },
  {
    icon: Target,
    title: 'Goal',
    desc: 'Become a skilled software engineer',
  },
];

export default function About() {
  const [imgError, setImgError] = useState(false);
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#101A2B]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Who I Am
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Profile card */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative">
              {/* Profile image placeholder */}
              <div className="relative w-72 h-72 mx-auto lg:mx-0">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/30 to-cyan-500/20 blur-xl" />
                <div className="relative w-full h-full rounded-2xl bg-slate-100 dark:bg-gradient-to-br dark:from-[#1a2744] dark:to-[#0d1829] border border-slate-200 dark:border-blue-900/40 shadow-xl shadow-slate-200/80 dark:shadow-none flex items-center justify-center overflow-hidden">
                  {/* Try loading profile image, fallback to initials */}
                  {!imgError ? (
                    <img
                      src={personalInfo.profileImage}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-blue-500/20 border-2 border-blue-500/40 flex items-center justify-center mb-3">
                        <User size={40} className="text-blue-400" />
                      </div>
                      <span className="text-blue-400 font-bold text-2xl">AM</span>
                      <span className="text-gray-500 text-xs mt-1">
                        Add profile photo
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Info pills below image */}
              <div className="mt-8 flex flex-col gap-2">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <MapPin size={15} className="text-blue-400 shrink-0" />
                  {personalInfo.location}
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <GraduationCap size={15} className="text-blue-400 shrink-0" />
                  {personalInfo.university} · Class of {personalInfo.graduationYear}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio & highlights */}
          <div
            className={`transition-all duration-700 delay-300 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              Turning Algorithms into{' '}
              <span className="text-blue-400">Solutions</span>
            </h3>

            <div className="space-y-4 text-gray-400 leading-relaxed mb-8">
              {personalInfo.bio.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="p-4 rounded-xl bg-white/3 border border-white/8 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-200 group"
                >
                  <Icon
                    size={18}
                    className="text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-200"
                  />
                  <div className="text-white text-sm font-medium">{title}</div>
                  <div className="text-gray-500 text-xs mt-1">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
