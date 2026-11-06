import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Github,
  Maximize2,
  X,
} from 'lucide-react';
import { INITIAL_PROJECTS, ProjectStatus } from '../data/portfolio';

type FilterValue = 'all' | 'completed' | 'in-progress';

const FILTER_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'completed', label: 'Completed' },
  { value: 'in-progress', label: 'In Development & Coming Soon' },
];

export default function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');
  const [activeSlideByProject, setActiveSlideByProject] = useState<Record<string, number>>({});
  const [lightboxState, setLightboxState] = useState<{
    projectTitle: string;
    images: string[];
    index: number;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxState(null);
      }
    };
    if (lightboxState) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [lightboxState]);

  const normalizeExternalUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  const filteredProjects = INITIAL_PROJECTS.filter((project) => {
    if (activeFilter === 'completed') {
      return project.status === ProjectStatus.Completed;
    }
    if (activeFilter === 'in-progress') {
      return (
        project.status === ProjectStatus.InDevelopment ||
        project.status === ProjectStatus.ComingSoon
      );
    }
    return true;
  });

  const renderStatusIndicator = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.Completed:
        return (
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2B2D42]">
            <CheckCircle2 className="h-4 w-4 text-[#6B7B43] shrink-0" />
            <span>Completed</span>
          </div>
        );
      case ProjectStatus.InDevelopment:
        return (
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2B2D42]">
            <Clock className="h-4 w-4 text-[#D4A373] shrink-0" />
            <span>In Development</span>
          </div>
        );
      case ProjectStatus.ComingSoon:
        return (
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2B2D42]/75">
            <CalendarClock className="h-4 w-4 text-[#2B2D42]/60 shrink-0" />
            <span>Coming Soon</span>
          </div>
        );
    }
  };

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-60px' },
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <section
      id="projects"
      className="scroll-mt-20 border-b border-[#2B2D42]/10 bg-[#FDFBF7] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header + Status Filter */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#2B2D42]/70">
              Selected Work & Roadmap
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#2B2D42] text-balance sm:text-4xl">
              Projects
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#2B2D42]/80">
              Applications I have built alongside projects currently in active development and planned next.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter projects by status"
            className="inline-flex flex-wrap items-center gap-1 self-start rounded-xl border border-[#2B2D42]/12 bg-[#F4F7F6] p-1"
          >
            {FILTER_OPTIONS.map((option) => {
              const isActive = activeFilter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setActiveFilter(option.value)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B2D42] ${
                    isActive
                      ? 'bg-[#E8A598] text-[#2B2D42] shadow-xs'
                      : 'text-[#2B2D42]/75 hover:text-[#2B2D42]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Highlight Project Showcase Cards */}
        <div className="mt-12 space-y-10">
          {filteredProjects.map((project, index) => {
            const isCompleted = project.status === ProjectStatus.Completed;
            const screenshots = project.screenshots || [];
            const currentSlide = Math.min(
              activeSlideByProject[project.id] || 0,
              Math.max(0, screenshots.length - 1)
            );
            const hasScreenshots = screenshots.length > 0;

            return (
              <motion.article
                key={project.id}
                {...motionProps}
                className={`group overflow-hidden rounded-3xl transition-all duration-200 ${
                  isCompleted
                    ? 'border border-[#CCD5AE] bg-white shadow-[0_18px_45px_-24px_rgba(43,45,66,0.14)] hover:shadow-[0_24px_55px_-22px_rgba(43,45,66,0.18)]'
                    : 'border border-dashed border-[#2B2D42]/22 bg-[#F4F7F6]/75 hover:border-[#2B2D42]/35'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Screenshot Preview Area */}
                  <div
                    className={`relative flex flex-col justify-between border-b border-[#2B2D42]/10 p-5 sm:p-7 lg:col-span-6 lg:border-r lg:border-b-0 ${
                      isCompleted ? 'bg-[#F4F7F6]' : 'bg-[#FDFBF7]/85'
                    }`}
                  >
                    <div className="overflow-hidden rounded-2xl border border-[#2B2D42]/10 bg-white shadow-xs">
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#FDFBF7] via-[#F4F7F6] to-[#CCD5AE]/20">
                        {hasScreenshots ? (
                          <>
                            <img
                              src={screenshots[currentSlide]}
                              alt={`${project.title} screenshot ${currentSlide + 1}`}
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover object-top"
                            />

                            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-[#2B2D42]/75 via-[#2B2D42]/30 to-transparent p-3">
                              <div className="flex items-center gap-1.5">
                                {screenshots.length > 1 && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setActiveSlideByProject((prev) => ({
                                          ...prev,
                                          [project.id]:
                                            (currentSlide - 1 + screenshots.length) %
                                            screenshots.length,
                                        }))
                                      }
                                      aria-label="Previous screenshot"
                                      className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#FDFBF7]/95 text-[#2B2D42] hover:bg-white"
                                    >
                                      <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <span className="px-1.5 font-mono text-xs font-medium text-[#FDFBF7] tabular-nums">
                                      {currentSlide + 1} / {screenshots.length}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setActiveSlideByProject((prev) => ({
                                          ...prev,
                                          [project.id]: (currentSlide + 1) % screenshots.length,
                                        }))
                                      }
                                      aria-label="Next screenshot"
                                      className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#FDFBF7]/95 text-[#2B2D42] hover:bg-white"
                                    >
                                      <ChevronRight className="h-4 w-4" />
                                    </button>
                                  </>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  setLightboxState({
                                    projectTitle: project.title,
                                    images: screenshots,
                                    index: currentSlide,
                                  })
                                }
                                aria-label="Expand screenshot preview"
                                className="inline-flex items-center gap-1 rounded-md bg-[#FDFBF7]/95 px-2.5 py-1 text-xs font-semibold text-[#2B2D42] hover:bg-white whitespace-nowrap shrink-0"
                              >
                                <Maximize2 className="h-3.5 w-3.5" />
                                Expand
                              </button>
                            </div>
                          </>
                        ) : isCompleted ? (
                          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                            <div
                              aria-hidden="true"
                              className="mb-4 w-full max-w-[240px] rounded-xl border border-[#CCD5AE] bg-white/95 p-3.5 shadow-xs"
                            >
                              <div className="flex items-center justify-between gap-2 border-b border-[#2B2D42]/8 pb-2">
                                <span className="h-2 w-12 rounded-full bg-[#CCD5AE]" />
                                <span className="font-mono text-[10px] font-medium text-[#2B2D42]/60">
                                  {project.id === 'currency-converter'
                                    ? 'USD → GBP'
                                    : project.id === 'business-idea-reality-check'
                                      ? 'Feasibility · Market Insights'
                                      : 'App Preview'}
                                </span>
                              </div>
                              <div className="mt-2.5 grid grid-cols-2 gap-2">
                                <div className="h-6 rounded-md border border-[#2B2D42]/8 bg-[#F4F7F6]" />
                                <div className="h-6 rounded-md border border-[#E8A598]/50 bg-[#E8A598]/25" />
                              </div>
                            </div>
                            <p className="font-display text-sm font-semibold text-[#2B2D42]">
                              {project.title} Preview
                            </p>
                            <p className="mt-1 text-xs text-[#2B2D42]/65">
                              Screenshot placeholder
                            </p>
                          </div>
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                            <div
                              aria-hidden="true"
                              className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-2xl border border-dashed border-[#2B2D42]/25 bg-white/80 text-[#2B2D42]/70"
                            >
                              {project.status === ProjectStatus.InDevelopment ? (
                                <Clock className="h-5 w-5 text-[#D4A373]" />
                              ) : (
                                <CalendarClock className="h-5 w-5 text-[#2B2D42]/60" />
                              )}
                            </div>
                            <p className="font-display text-sm font-semibold text-[#2B2D42]">
                              Preview Coming Soon
                            </p>
                            <p className="mt-1 max-w-[26ch] text-xs leading-relaxed text-[#2B2D42]/65">
                              {project.status === ProjectStatus.InDevelopment
                                ? 'Currently in active development'
                                : 'Planned upcoming project'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2 px-1 text-xs text-[#2B2D42]/60">
                      <span className="font-mono tabular-nums">
                        {String(index + 1).padStart(2, '0')} · {project.status}
                      </span>
                      {screenshots.length > 1 && (
                        <div className="flex items-center gap-1.5" role="tablist" aria-label="Screenshot slides">
                          {screenshots.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() =>
                                setActiveSlideByProject((prev) => ({
                                  ...prev,
                                  [project.id]: i,
                                }))
                              }
                              className={`h-2 rounded-full transition-all ${
                                i === currentSlide
                                  ? 'w-5 bg-[#E8A598]'
                                  : 'w-2 bg-[#2B2D42]/25 hover:bg-[#2B2D42]/45'
                              }`}
                              aria-label={`Go to screenshot ${i + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project Details, Tools & Links */}
                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6 lg:p-9">
                    <div>
                      {renderStatusIndicator(project.status)}

                      <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-[#2B2D42]">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-base leading-relaxed text-[#2B2D42]/85">
                        {project.description}
                      </p>

                      {project.technologies.length > 0 && (
                        <div className="mt-6">
                          <p className="text-xs font-semibold text-[#2B2D42]/65">
                            Tools & Technologies
                          </p>
                          <ul
                            aria-label={`${project.title} technologies`}
                            className="mt-2.5 flex flex-wrap gap-2"
                          >
                            {project.technologies.map((tech) => (
                              <li
                                key={tech}
                                className="rounded-lg border border-[#CCD5AE] bg-[#CCD5AE]/28 px-3 py-1 font-mono text-xs font-medium text-[#2B2D42] whitespace-nowrap shrink-0"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Dedicated Spaces for Live Project Link & GitHub Repository Link */}
                    <div className="mt-8 border-t border-[#2B2D42]/10 pt-5">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {project.liveUrl ? (
                          <a
                            href={normalizeExternalUrl(project.liveUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between gap-2 rounded-xl bg-[#E8A598] px-4 py-2.5 text-xs font-semibold text-[#2B2D42] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#e19586] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B2D42]"
                          >
                            <span>Live Project</span>
                            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                          </a>
                        ) : (
                          <div className="inline-flex items-center justify-between gap-2 rounded-xl border border-[#2B2D42]/12 bg-[#FDFBF7] px-4 py-2.5 text-xs font-medium text-[#2B2D42]/60 whitespace-nowrap shrink-0">
                            <span>
                              {isCompleted ? 'Live Link · Coming Soon' : 'Live Link · Upon Release'}
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 text-[#2B2D42]/40 shrink-0" />
                          </div>
                        )}

                        {project.githubUrl ? (
                          <a
                            href={normalizeExternalUrl(project.githubUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between gap-2 rounded-xl border border-[#2B2D42]/20 bg-white px-4 py-2.5 text-xs font-semibold text-[#2B2D42] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#2B2D42]/45 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B2D42]"
                          >
                            <span>GitHub Repository</span>
                            <Github className="h-3.5 w-3.5 shrink-0" />
                          </a>
                        ) : (
                          <div className="inline-flex items-center justify-between gap-2 rounded-xl border border-[#2B2D42]/12 bg-[#FDFBF7] px-4 py-2.5 text-xs font-medium text-[#2B2D42]/60 whitespace-nowrap shrink-0">
                            <span>GitHub · Coming Soon</span>
                            <Github className="h-3.5 w-3.5 text-[#2B2D42]/40 shrink-0" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox for Application Screenshots */}
      {lightboxState && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxState.projectTitle} screenshot viewer`}
          onClick={() => setLightboxState(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2D42]/85 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[#FDFBF7]/20 bg-[#FDFBF7] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#2B2D42]/10 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <p className="font-display text-sm font-bold text-[#2B2D42]">
                  {lightboxState.projectTitle}
                </p>
                {lightboxState.images.length > 1 && (
                  <span className="font-mono text-xs text-[#2B2D42]/60">
                    {lightboxState.index + 1} / {lightboxState.images.length}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {lightboxState.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxState((prev) =>
                          prev
                            ? {
                                ...prev,
                                index:
                                  (prev.index - 1 + prev.images.length) %
                                  prev.images.length,
                              }
                            : null
                        )
                      }
                      aria-label="Previous screenshot"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#2B2D42]/15 text-[#2B2D42] hover:bg-[#F4F7F6]"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxState((prev) =>
                          prev
                            ? {
                                ...prev,
                                index: (prev.index + 1) % prev.images.length,
                              }
                            : null
                        )
                      }
                      aria-label="Next screenshot"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#2B2D42]/15 text-[#2B2D42] hover:bg-[#F4F7F6]"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setLightboxState(null)}
                  aria-label="Close screenshot preview"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#2B2D42]/15 text-[#2B2D42] hover:bg-[#F4F7F6]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="bg-[#F4F7F6] p-4 sm:p-6">
              <img
                src={lightboxState.images[lightboxState.index]}
                alt={`${lightboxState.projectTitle} full preview`}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] w-full rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
