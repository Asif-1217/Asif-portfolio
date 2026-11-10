import { Code2, Cpu, Trophy, Wrench } from 'lucide-react';
import { skillCategories } from '../../config/skills';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2,
  Cpu,
  Trophy,
  Wrench,
};

// Language-specific colors for skill chips
const skillColors: Record<string, string> = {
  C: 'from-blue-600 to-blue-400',
  'C++': 'from-blue-500 to-cyan-400',
  Java: 'from-orange-500 to-orange-400',
  Python: 'from-yellow-500 to-yellow-400',
  Git: 'from-orange-600 to-red-500',
  GitHub: 'from-gray-500 to-gray-400',
  'Visual Studio Code': 'from-blue-500 to-blue-400',
  Codeforces: 'from-blue-600 to-blue-400',
  VJudge: 'from-blue-600 to-indigo-500',
};

export default function Skills() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 relative overflow-hidden"
    >
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
            Skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            My toolkit for solving complex problems and building efficient solutions.
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, catIdx) => {
            const Icon = iconMap[cat.icon] || Code2;
            return (
              <div
                key={cat.title}
                className={`p-6 rounded-2xl bg-[#080D1A] border border-blue-900/30 hover:border-blue-500/40 transition-all duration-500 group hover:shadow-xl hover:shadow-blue-950/30 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + catIdx * 100}ms` }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-sm leading-tight">
                    {cat.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => {
                    const gradient = skillColors[skill.name];
                    return (
                      <div
                        key={skill.name}
                        className={`group/chip relative overflow-hidden px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-default ${
                          gradient
                            ? 'bg-gradient-to-r text-white shadow-sm'
                            : 'bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40'
                        }`}
                        style={
                          gradient
                            ? {
                                background: `linear-gradient(135deg, ${
                                  gradient.includes('blue-600')
                                    ? '#2563eb, #60a5fa'
                                    : gradient.includes('orange-500')
                                    ? '#f97316, #fb923c'
                                    : gradient.includes('yellow-500')
                                    ? '#eab308, #facc15'
                                    : gradient.includes('cyan')
                                    ? '#0891b2, #22d3ee'
                                    : '#3b82f6, #22d3ee'
                                })`,
                              }
                            : {}
                        }
                      >
                        {skill.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-600 text-sm mt-8">
          Skills are categorized without artificial proficiency ratings — quality over metrics.
        </p>
      </div>
    </section>
  );
}
