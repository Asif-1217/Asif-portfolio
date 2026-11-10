import { Trophy, ChevronDown, Terminal, Code2, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, CodeforcesIcon } from '../UI/Icons';
import { socialLinks } from '../../config/social';
import { personalInfo } from '../../config/personal';

const TYPED_LINES = [
  'Competitive Programmer',
  'C++ Developer',
  'Algorithm Enthusiast',
  'Problem Solver',
];

import { useEffect, useState } from 'react';

function TypedText() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPED_LINES[lineIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), 70);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), 40);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setLineIdx((i) => (i + 1) % TYPED_LINES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, lineIdx]);

  return (
    <span className="text-blue-400">
      {TYPED_LINES[lineIdx].slice(0, charIdx)}
      <span className="animate-pulse text-cyan-400">|</span>
    </span>
  );
}

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#080D1A] via-[#0d1829] to-[#080D1A]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      {/* Floating code snippets - decorative */}
      <div className="absolute top-24 left-8 hidden xl:block opacity-20 animate-float-slow">
        <div className="font-mono text-xs text-blue-400 bg-blue-950/40 border border-blue-900/40 rounded-lg p-3">
          <div>
            <span className="text-cyan-400">#include</span>{' '}
            <span className="text-green-400">&lt;bits/stdc++.h&gt;</span>
          </div>
          <div>
            <span className="text-cyan-400">using namespace</span> std;
          </div>
          <div className="mt-1">
            <span className="text-yellow-400">int</span> main() {'{'}{' '}
          </div>
          <div className="pl-2">
            <span className="text-purple-400">solve</span>();
          </div>
          <div>{'}'}</div>
        </div>
      </div>

      <div className="absolute bottom-32 right-8 hidden xl:block opacity-20 animate-float">
        <div className="font-mono text-xs text-blue-400 bg-blue-950/40 border border-blue-900/40 rounded-lg p-3">
          <div>
            <span className="text-cyan-400">for</span> i{' '}
            <span className="text-cyan-400">in range</span>(500):
          </div>
          <div className="pl-4">solve(problems[i])</div>
          <div>
            <span className="text-green-400"># 500+ solved!</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Info & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              Available for opportunities
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Hi, I'm{' '}
              {personalInfo.name.split(' ').map((word, i) => (
                <span key={i}>
                  {i === 0 ? (
                    <span className="text-white">{word}</span>
                  ) : (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                      {' '}{word}
                    </span>
                  )}
                </span>
              ))}
            </h1>

            {/* Dynamic typed title */}
            <div className="text-xl sm:text-2xl font-medium text-gray-300 mb-4 h-9">
              <TypedText />
            </div>

            {/* Subtitle & University */}
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-3 leading-relaxed">
              {personalInfo.title} at{' '}
              <span className="text-blue-300 font-semibold">{personalInfo.university}</span>
            </p>
            <p className="text-gray-500 text-sm mb-8 flex items-center justify-center lg:justify-start gap-2">
              <MapPin size={15} className="text-blue-400 shrink-0" />
              {personalInfo.location}
            </p>

            {/* Stats pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-8">
              {[
                { icon: Terminal, label: '500+ Problems Solved' },
                { icon: Code2, label: 'C / C++ / Java / Python' },
                { icon: Trophy, label: 'Codeforces Rated' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs sm:text-sm hover:border-blue-500/30 transition-colors"
                >
                  <Icon size={14} className="text-blue-400" />
                  {label}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start mb-8">
              <button
                onClick={() => handleScroll('#coding-profiles')}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-100"
              >
                View Coding Profiles
              </button>
              <button
                onClick={() => handleScroll('#contact')}
                className="px-7 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] active:scale-100"
              >
                Contact Me
              </button>
            </div>

            {/* Social links */}
            <div className="flex justify-center lg:justify-start gap-3">
              {[
                { href: socialLinks.github, icon: GithubIcon, label: 'GitHub' },
                { href: socialLinks.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
                { href: socialLinks.codeforces, icon: CodeforcesIcon, label: 'Codeforces' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Profile Image Showcase */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative">
              {/* Outer decorative ambient glows */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 to-cyan-500/30 rounded-3xl blur-2xl opacity-60 animate-pulse" />
              
              {/* Avatar Frame Card */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-1 bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-700 shadow-2xl shadow-blue-500/20 dark:shadow-blue-950/60">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-100 dark:bg-[#0a1224] relative flex items-center justify-center">
                  
                  {/* Actual Photo */}
                  {!imgError ? (
                    <img
                      src={personalInfo.profileImage}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-center relative z-10 transition-transform duration-500 hover:scale-105"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    /* Fallback when photo cannot be loaded */
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0c162d] to-[#122244] p-6 text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600/40 to-cyan-400/30 border-2 border-blue-400/50 flex items-center justify-center mb-3 shadow-inner">
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
                          AM
                        </span>
                      </div>
                      <div className="text-white font-semibold text-base mb-1">
                        Asif Al Masud
                      </div>
                      <div className="text-xs text-blue-400 font-mono bg-blue-950/70 border border-blue-800/40 px-2 py-1 rounded">
                        public/images/profile.jpg
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => handleScroll('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors duration-200 group"
        aria-label="Scroll down"
      >
        <span className="text-xs font-medium tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown
          size={20}
          className="animate-bounce group-hover:text-blue-400 transition-colors"
        />
      </button>
    </section>
  );
}
