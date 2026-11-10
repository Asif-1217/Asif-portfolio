import { ExternalLink, Sparkles, Tag } from 'lucide-react';
import { GithubIcon } from '../UI/Icons';
import { projects } from '../../config/projects';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function ProjectCard({ project, delay }: { project: (typeof projects)[0]; delay: number }) {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group relative flex flex-col rounded-2xl bg-[#101A2B] border transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-blue-950/40 ${
        project.placeholder
          ? 'border-violet-500/25 hover:border-violet-400/50'
          : 'border-blue-900/30 hover:border-blue-500/40'
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Placeholder banner */}
      {project.placeholder && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/15 border border-violet-400/25 text-violet-200 text-xs font-medium backdrop-blur-sm">
          <Sparkles size={11} />
          Coming Soon
        </div>
      )}

      {/* Category badge (top-right, only for real projects) */}
      {!project.placeholder && project.category && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-medium backdrop-blur-sm">
          <Tag size={10} />
          {project.category}
        </div>
      )}

      {/* Project image */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-[#0a1224] border-b border-slate-200/80 dark:border-blue-900/30 flex items-center justify-center">
        {project.placeholder ? (
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-violet-500/10 via-[#101A2B] to-fuchsia-500/10">
            <div className="absolute -left-12 -top-16 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-10 h-48 w-48 rounded-full bg-fuchsia-500/10 blur-3xl" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/10 text-violet-200 shadow-lg shadow-violet-950/20">
              <Sparkles size={25} />
            </div>
            <span className="relative mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200/80">
              In Progress
            </span>
          </div>
        ) : project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
              project.id === 'maze-solver'
                ? 'object-cover object-center scale-110'
                : project.imageFit === 'contain'
                  ? 'object-contain p-3.5'
                  : 'object-cover object-top'
            }`}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-3">
                <GithubIcon size={28} className="text-blue-400" />
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-xs">No screenshot available</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <h3 className="text-white font-semibold text-lg mb-0.5 group-hover:text-blue-300 transition-colors duration-200">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="text-blue-400 text-xs font-medium mb-2">{project.subtitle}</p>
        )}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        {project.placeholder ? (
          <div className="mt-auto flex items-center gap-2 border-t border-violet-400/10 pt-4 text-sm text-violet-200/70">
            <Sparkles size={15} />
            <span>Stay tuned for the next project</span>
          </div>
        ) : <div className="flex gap-3 mt-auto">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              <GithubIcon size={15} /> GitHub
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-sm text-gray-600 cursor-not-allowed">
              <GithubIcon size={15} /> GitHub
            </span>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
        </div>}
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#080D1A]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            My Work
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            Projects include a land conflict intelligence prototype, a C++ maze pathfinding application, and a Java campus lost-and-found system. More projects are coming soon.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} delay={idx * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
