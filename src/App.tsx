/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CapabilitiesSection from './components/CapabilitiesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';

export default function App() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2B2D42] flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-[#E8A598] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#2B2D42]"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1">
        <HeroSection />
        <CapabilitiesSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <footer className="border-t border-[#2B2D42]/10 bg-[#FDFBF7] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-[#2B2D42]/70 sm:flex-row lg:px-8">
          <p>
            © {currentYear} Pelumi Adejuwon · Registered Nurse & AI Application Developer
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="#home"
              className="transition-colors hover:text-[#2B2D42] whitespace-nowrap shrink-0"
            >
              Home
            </a>
            <a
              href="#about"
              className="transition-colors hover:text-[#2B2D42] whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#tools"
              className="transition-colors hover:text-[#2B2D42] whitespace-nowrap shrink-0"
            >
              Tools & Technologies
            </a>
            <a
              href="#projects"
              className="transition-colors hover:text-[#2B2D42] whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-[#2B2D42] whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
