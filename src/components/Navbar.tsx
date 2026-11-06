import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Tools & Technologies', href: '#tools' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#2B2D42]/10 bg-[#FDFBF7]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight text-[#2B2D42] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8A598]"
        >
          Pelumi Adejuwon
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#2B2D42]/80"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 text-[#2B2D42]/80 transition-colors duration-150 hover:text-[#2B2D42] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#E8A598] after:transition-all after:duration-150 hover:after:w-full whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8A598]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#E8A598] px-4 py-2 text-xs font-semibold text-[#2B2D42] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#e19586] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B2D42]"
          >
            Get in Touch
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#2B2D42]/15 bg-white/70 text-[#2B2D42] transition-colors duration-150 hover:border-[#E8A598] md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B2D42]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-[#2B2D42]/10 bg-[#FDFBF7] px-6 py-4 shadow-sm md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#2B2D42] transition-colors duration-150 hover:bg-[#F4F7F6]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleNavClick}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-[#E8A598] px-4 py-2.5 text-sm font-semibold text-[#2B2D42] transition-colors duration-150 hover:bg-[#e19586]"
            >
              Get in Touch
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
