import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDownRight, User } from 'lucide-react';
import { INTRODUCTION_PARAGRAPHS, PROFILE_PHOTO_URL } from '../data/portfolio';

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
      };

  const showPhoto = Boolean(PROFILE_PHOTO_URL) && !imageError;

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-[#2B2D42]/10 bg-[#FDFBF7] py-16 sm:py-20 lg:py-28"
    >
      {/* Subtle warm blush and sage ambient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 h-[26rem] w-[26rem] rounded-full bg-[#E8A598]/18 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 left-12 h-[22rem] w-[22rem] rounded-full bg-[#CCD5AE]/22 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Profile Photograph Frame: Above introduction on mobile (order-1), beside introduction on desktop (lg:order-2) */}
          <motion.div
            {...motionProps}
            className="order-1 flex flex-col items-center lg:order-2 lg:col-span-5 lg:items-end"
          >
            <div className="w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[350px]">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-[2.25rem] border border-[#E8A598]/60 bg-white p-3 shadow-[0_20px_50px_-20px_rgba(43,45,66,0.18)]">
                <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[1.65rem] border border-[#2B2D42]/8 bg-gradient-to-b from-[#FDFBF7] to-[#F4F7F6]">
                  {showPhoto ? (
                    <img
                      src={PROFILE_PHOTO_URL}
                      alt="Pelumi Adejuwon — Registered Nurse and AI Application Developer"
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                      className="h-full w-full object-cover object-[center_35%]"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center px-6 text-center">
                      <div className="mb-3.5 flex h-20 w-20 items-center justify-center rounded-full border border-[#E8A598]/60 bg-[#E8A598]/20 text-[#2B2D42]">
                        <User className="h-9 w-9 stroke-[1.5]" />
                      </div>
                      <p className="font-display text-sm font-semibold text-[#2B2D42]">
                        Pelumi Adejuwon
                      </p>
                      <p className="mt-1 text-xs text-[#2B2D42]/60">
                        Portrait placeholder
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Introduction / About Me: Below photo on mobile (order-2), beside photo on desktop (lg:order-1) */}
          <motion.div
            id="about"
            {...motionProps}
            className="order-2 scroll-mt-24 lg:order-1 lg:col-span-7"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#2B2D42]/75">
              <span>Registered Nurse</span>
              <span aria-hidden="true" className="text-[#D4A373]">
                ·
              </span>
              <span>AI Application Developer</span>
              <span aria-hidden="true" className="text-[#D4A373]">
                ·
              </span>
              <span>Agentic AI & Automation</span>
            </div>

            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#2B2D42] sm:text-4xl lg:text-[2.5rem]">
              Pelumi Adejuwon
            </h1>

            <div className="mt-4 h-[2px] w-14 rounded-full bg-[#E8A598]" aria-hidden="true" />

            <div className="mt-6 max-w-[65ch] space-y-4 text-base leading-[1.75] text-[#2B2D42]/90 sm:text-[1.0625rem]">
              {INTRODUCTION_PARAGRAPHS.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-[#E8A598] px-5 py-2.5 text-sm font-semibold text-[#2B2D42] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#e19586] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B2D42]"
              >
                View Projects
                <ArrowDownRight className="h-4 w-4" />
              </a>
              <a
                href="#tools"
                className="inline-flex items-center justify-center rounded-lg border border-[#CCD5AE] bg-[#CCD5AE]/30 px-5 py-2.5 text-sm font-semibold text-[#2B2D42] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#CCD5AE]/50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B2D42]"
              >
                Tools & Technologies
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
