import { motion, useReducedMotion } from 'motion/react';
import { AREAS_OF_FOCUS, TOOLS_AND_TECHNOLOGIES } from '../data/portfolio';

export default function CapabilitiesSection() {
  const shouldReduceMotion = useReducedMotion();

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
      id="tools"
      className="scroll-mt-20 border-b border-[#2B2D42]/10 bg-[#F4F7F6] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-[#2B2D42]/70">
            Technical Stack & Focus
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#2B2D42] text-balance sm:text-3xl">
            Tools & Technologies
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#2B2D42]/80">
            Languages, frameworks and core areas I work with to build practical AI applications and automated workflows.
          </p>
        </div>

        <motion.div
          {...motionProps}
          className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10"
        >
          {/* Tools & Technologies — Highlighted with Sage Green (#CCD5AE) */}
          <div className="rounded-2xl border border-[#CCD5AE] bg-[#FDFBF7] p-6 sm:p-8 shadow-[0_10px_30px_-18px_rgba(43,45,66,0.1)] lg:col-span-7">
            <div className="flex items-baseline justify-between gap-4 border-b border-[#2B2D42]/10 pb-4">
              <h3 className="font-display text-lg font-bold text-[#2B2D42]">
                Core Tools & Frameworks
              </h3>
              <span className="font-mono text-xs text-[#2B2D42]/70 tabular-nums">
                {TOOLS_AND_TECHNOLOGIES.length} technologies
              </span>
            </div>

            <ul
              aria-label="Tools and technologies"
              className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {TOOLS_AND_TECHNOLOGIES.map((tool, index) => (
                <li
                  key={tool}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#CCD5AE]/90 bg-[#CCD5AE]/22 px-4 py-3 transition-colors duration-150 hover:bg-[#CCD5AE]/38"
                >
                  <span className="text-sm font-semibold text-[#2B2D42]">
                    {tool}
                  </span>
                  <span className="font-mono text-xs text-[#2B2D42]/60 tabular-nums shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Separate Subsection: Areas of Focus — Warm Dusty Rose (#E8A598) & Sage subtle balance */}
          <div className="rounded-2xl border border-[#E8A598]/60 bg-[#FDFBF7] p-6 sm:p-8 shadow-[0_10px_30px_-18px_rgba(43,45,66,0.1)] lg:col-span-5">
            <div className="flex items-baseline justify-between gap-4 border-b border-[#2B2D42]/10 pb-4">
              <h3 className="font-display text-lg font-bold text-[#2B2D42]">
                Areas of Focus
              </h3>
              <span className="font-mono text-xs text-[#2B2D42]/70 tabular-nums">
                {AREAS_OF_FOCUS.length} areas
              </span>
            </div>

            <ul
              aria-label="Areas of focus"
              className="mt-6 flex flex-col gap-3"
            >
              {AREAS_OF_FOCUS.map((focus) => (
                <li
                  key={focus}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#E8A598]/55 bg-[#E8A598]/16 px-4 py-3 transition-colors duration-150 hover:bg-[#E8A598]/28"
                >
                  <span className="text-sm font-semibold text-[#2B2D42]">
                    {focus}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-4 rounded-full bg-[#CCD5AE] shrink-0"
                  />
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
