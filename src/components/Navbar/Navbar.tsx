import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Code2 } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Coding Profiles', href: '#coding-profiles' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      const offsets = sections.map((id) => {
        const el = document.getElementById(id);
        return el ? { id, top: el.getBoundingClientRect().top } : null;
      });

      const visible = offsets.filter((o) => o && o.top <= 120);
      if (visible.length > 0) {
        setActiveSection(visible[visible.length - 1]!.id);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === 'dark'
            ? 'bg-[#080D1A]/95 backdrop-blur-md border-b border-blue-900/30 shadow-lg shadow-blue-950/20'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg shadow-slate-900/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/40 transition-all duration-300">
              <Code2 size={16} className="text-white" />
            </div>
            <span
              className={`font-bold text-lg tracking-tight transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              Asif<span className="text-blue-500">.</span>dev
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-blue-500 bg-blue-500/10 font-semibold'
                      : theme === 'dark'
                      ? 'text-gray-300 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right side: Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className={`flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-200 cursor-pointer ${
                theme === 'dark'
                  ? 'border-blue-900/40 text-yellow-400 hover:text-yellow-300 hover:bg-white/5 shadow-sm'
                  : 'border-slate-300 bg-white text-slate-700 hover:text-blue-600 hover:bg-slate-50 shadow-sm'
              }`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun size={18} className="animate-spin-slow text-yellow-400" />
              ) : (
                <Moon size={18} className="text-slate-700" />
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                theme === 'dark'
                  ? 'border-blue-900/40 text-gray-300 hover:text-white hover:bg-white/5'
                  : 'border-slate-300 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className={`lg:hidden backdrop-blur-md border-b transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-[#080D1A]/98 border-blue-900/30'
              : 'bg-white/98 border-slate-200 shadow-xl'
          }`}
        >
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-blue-500 bg-blue-500/10 font-semibold'
                      : theme === 'dark'
                      ? 'text-gray-300 hover:text-white hover:bg-white/5'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Direct Theme Toggle Option inside Mobile Menu */}
            <div className="pt-2 border-t border-slate-200/20">
              <button
                onClick={() => {
                  onToggleTheme();
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer border ${
                  theme === 'dark'
                    ? 'bg-blue-500/10 border-blue-500/20 text-blue-300'
                    : 'bg-blue-50 border-blue-200 text-blue-700'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  {theme === 'dark' ? (
                    <Sun size={17} className="text-yellow-400" />
                  ) : (
                    <Moon size={17} className="text-slate-700" />
                  )}
                  <span>
                    Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
                  </span>
                </span>
                <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10">
                  {theme}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
