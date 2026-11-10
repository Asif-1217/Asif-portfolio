import { GraduationCap, BookOpen, Award } from 'lucide-react';
import { educationData } from '../../config/personal';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const levelIcons = {
  university: GraduationCap,
  college: BookOpen,
  school: Award,
};

const levelColors = {
  university: 'from-blue-600 to-blue-400',
  college: 'from-cyan-600 to-cyan-400',
  school: 'from-indigo-600 to-indigo-400',
};

export default function Education() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="education"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#080D1A]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Education
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Academic Background
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/50 via-blue-500/30 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {educationData.map((edu, idx) => {
              const Icon = levelIcons[edu.level];
              const gradient = levelColors[edu.level];

              return (
                <div
                  key={idx}
                  className={`relative transition-all duration-700 ${
                    visible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${200 + idx * 150}ms` }}
                >
                  <div className="sm:flex gap-6 items-start">
                    {/* Icon circle */}
                    <div className="hidden sm:flex shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br items-center justify-center shadow-lg relative z-10"
                         style={{
                           background: `linear-gradient(135deg, ${edu.level === 'university' ? '#2563eb, #60a5fa' : edu.level === 'college' ? '#0891b2, #22d3ee' : '#4f46e5, #818cf8'})`,
                         }}
                    >
                      <Icon size={24} className="text-white" />
                    </div>

                    {/* Card */}
                    <div className="flex-1 p-6 rounded-2xl bg-[#101A2B] border border-blue-900/30 hover:border-blue-500/40 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-950/40">
                      <div className="sm:flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            {/* Mobile icon */}
                            <div className={`sm:hidden w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${gradient}`}>
                              <Icon size={16} className="text-white" />
                            </div>
                            <h3 className="text-white font-semibold text-lg group-hover:text-blue-300 transition-colors duration-200">
                              {edu.degree}
                            </h3>
                          </div>
                          <p className="text-blue-400 font-medium mb-1">
                            {edu.institution}
                          </p>
                          <p className="text-gray-500 text-sm">{edu.year}</p>
                        </div>

                        <div className="mt-3 sm:mt-0 flex flex-col items-start sm:items-end gap-2">
                          {edu.gpa && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                              GPA: {edu.gpa}
                            </div>
                          )}
                          {edu.status && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs">
                              {edu.status === 'Currently Enrolled' && (
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                                </span>
                              )}
                              {edu.status}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
