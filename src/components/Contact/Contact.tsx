import { useState, useRef } from 'react';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, CodeforcesIcon, VJudgeIcon } from '../UI/Icons';
import { personalInfo } from '../../config/personal';
import { socialLinks, platformUsernames } from '../../config/social';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function Contact() {
  const { ref, visible } = useScrollReveal();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((e) => ({ ...e, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Open mailto - real backend/email service integration required for actual sending
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
      `From: ${form.name} <${form.email}>\n\n${form.message}`
    )}`;
    window.open(mailtoUrl, '_blank');
    setSubmitted(true);
    setForm(INITIAL_FORM);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const socialItems = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'text-blue-400',
    },
    {
      icon: GithubIcon,
      label: 'GitHub',
      value: `@${platformUsernames.github}`,
      href: socialLinks.github,
      color: 'text-gray-300',
    },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      value: 'Asif Al Masud',
      href: socialLinks.linkedin,
      color: 'text-blue-500',
    },
    {
      icon: CodeforcesIcon,
      label: 'Codeforces',
      value: `@${platformUsernames.codeforces}`,
      href: socialLinks.codeforces,
      color: 'text-blue-400',
    },
  ];

  if (socialLinks.vjudge) {
    socialItems.push({
      icon: VJudgeIcon,
      label: 'VJudge',
      value: `@${platformUsernames.vjudge}`,
      href: socialLinks.vjudge,
      color: 'text-cyan-400',
    });
  }

  return (
    <section
      id="contact"
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
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Contact Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            Have a question, opportunity, or just want to connect? I'd love to
            hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact info */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h3 className="text-white font-semibold text-xl mb-2">
              Let's Connect
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              I'm open to discussions about programming, university projects,
              collaborative work, and future opportunities. Feel free to reach
              out through any of the channels below.
            </p>

            <div className="flex items-center gap-2 text-gray-400 text-sm mb-8">
              <MapPin size={15} className="text-blue-400" />
              {personalInfo.location}
            </div>

            <div className="space-y-3">
              {socialItems.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#101A2B] border border-blue-900/30 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Icon size={18} className={color} />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-400 text-xs mb-0.5">{label}</div>
                    <div className="text-white text-sm font-medium">{value}</div>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-gray-600 group-hover:text-gray-400 transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Contact form */}
          <div
            className={`transition-all duration-700 delay-300 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-[#101A2B] border border-blue-900/30">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                  <h4 className="text-white font-semibold text-lg mb-2">
                    Email Client Opened!
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Your message has been pre-filled in your email client.
                    Please send it to complete your message.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1.5">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`w-full px-4 py-3 rounded-xl bg-[#080D1A] border text-white placeholder-gray-600 text-sm outline-none transition-colors duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 ${
                          errors.name
                            ? 'border-red-500/60'
                            : 'border-blue-900/40'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1.5">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 rounded-xl bg-[#080D1A] border text-white placeholder-gray-600 text-sm outline-none transition-colors duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 ${
                          errors.email
                            ? 'border-red-500/60'
                            : 'border-blue-900/40'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm mb-1.5">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      className={`w-full px-4 py-3 rounded-xl bg-[#080D1A] border text-white placeholder-gray-600 text-sm outline-none transition-colors duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 ${
                        errors.subject
                          ? 'border-red-500/60'
                          : 'border-blue-900/40'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-400 text-sm mb-1.5">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl bg-[#080D1A] border text-white placeholder-gray-600 text-sm outline-none transition-colors duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 resize-none ${
                        errors.message
                          ? 'border-red-500/60'
                          : 'border-blue-900/40'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-100"
                  >
                    <Send size={16} />
                    Send Message
                  </button>

                  <p className="text-gray-600 text-xs text-center mt-3">
                    This will open your email client with the message pre-filled.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
