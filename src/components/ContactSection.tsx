import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { DEFAULT_CONTACT_LINKS } from '../data/portfolio';

export default function ContactSection() {
  const shouldReduceMotion = useReducedMotion();

  const normalizeExternalUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  const contactItems = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      value: DEFAULT_CONTACT_LINKS.linkedin,
      placeholderText: 'Profile link placeholder',
      href: DEFAULT_CONTACT_LINKS.linkedin
        ? normalizeExternalUrl(DEFAULT_CONTACT_LINKS.linkedin)
        : null,
      external: true,
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: Github,
      value: DEFAULT_CONTACT_LINKS.github,
      placeholderText: 'Profile link placeholder',
      href: DEFAULT_CONTACT_LINKS.github
        ? normalizeExternalUrl(DEFAULT_CONTACT_LINKS.github)
        : null,
      external: true,
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      value: DEFAULT_CONTACT_LINKS.email,
      placeholderText: 'Email placeholder',
      href: DEFAULT_CONTACT_LINKS.email ? `mailto:${DEFAULT_CONTACT_LINKS.email}` : null,
      external: false,
    },
  ];

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-60px' },
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-[#F4F7F6] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          {...motionProps}
          className="rounded-3xl border border-[#2B2D42]/10 bg-[#FDFBF7] p-6 sm:p-10 lg:p-12 shadow-[0_14px_38px_-22px_rgba(43,45,66,0.12)]"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold text-[#2B2D42]/70">Connect</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#2B2D42] text-balance sm:text-3xl">
              Contact
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#2B2D42]/80">
              Interested in connecting around AI application development, Agentic AI workflows, or healthcare technology? Reach out below.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {contactItems.map((item) => {
              const Icon = item.icon;

              if (item.href) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-[#CCD5AE] bg-white p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-[#E8A598] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B2D42]"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#2B2D42]">
                        <Icon className="h-4 w-4 text-[#2B2D42] shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      <p className="mt-1.5 truncate text-xs text-[#2B2D42]/75">
                        {item.value}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[#2B2D42]/60 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#2B2D42] shrink-0" />
                  </a>
                );
              }

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-[#2B2D42]/12 bg-white/85 p-5"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#2B2D42]">
                      <Icon className="h-4 w-4 text-[#2B2D42]/75 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    <p className="mt-1.5 truncate text-xs text-[#2B2D42]/60">
                      {item.placeholderText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
