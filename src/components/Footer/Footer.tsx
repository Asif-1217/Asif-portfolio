import { Mail, Heart, ExternalLink, Code2, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, CodeforcesIcon } from '../UI/Icons';
import { personalInfo } from '../../config/personal';
import { socialLinks } from '../../config/social';

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Coding Profiles', href: '#coding-profiles' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  { icon: GithubIcon, href: socialLinks.github, label: 'GitHub' },
  { icon: LinkedinIcon, href: socialLinks.linkedin, label: 'LinkedIn' },
  { icon: CodeforcesIcon, href: socialLinks.codeforces, label: 'Codeforces' },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
];

export default function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060C18] border-t border-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Code2 size={16} className="text-white" />
              </div>
              <span className="font-bold text-white text-lg">
                Asif<span className="text-blue-400">.</span>dev
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              {personalInfo.title}
              <br />
              {personalInfo.university}
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg text-gray-600 hover:text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 transition-all duration-200"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {NAV.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="text-left text-gray-500 text-sm hover:text-blue-400 transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-gray-500 text-sm hover:text-blue-400 transition-colors duration-200"
              >
                <Mail size={14} />
                {personalInfo.email}
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 text-sm hover:text-blue-400 transition-colors duration-200"
              >
                <GithubIcon size={14} />
                github.com/Asif-1217
                <ExternalLink size={11} />
              </a>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin size={14} className="text-blue-400 shrink-0" />
                {personalInfo.location}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-blue-900/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs flex items-center gap-1">
            Built with <Heart size={11} className="text-red-500" /> using React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
