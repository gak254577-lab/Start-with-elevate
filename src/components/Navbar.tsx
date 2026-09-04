import React, { useState, useEffect } from 'react';
import { useTrainer } from '../context/TrainerContext';
import {
  Phone,
  MessageSquare,
  Calendar,
  Menu,
  X,
} from 'lucide-react';
import { WaveFitnessLogo } from './WaveFitnessLogo';

export const Navbar: React.FC = () => {
  const {
    profile,
    openTrialModal,
    currentThemeConfig,
  } = useTrainer();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Programs', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Transformations', href: '#transformations' },
    { label: 'Facility', href: '#gallery' },
    { label: 'FAQs', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Main sticky navigation bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
            ? 'bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 shadow-2xl shadow-black/60 py-3'
            : 'bg-stone-950/75 backdrop-blur-sm border-b border-stone-800/40 py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo & Gym Name */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center font-black transition-transform group-hover:scale-105 shadow-xl bg-black border border-stone-800 p-0.5">
                <WaveFitnessLogo
                  variant="full"
                  size={56}
                />
              </div>
              <div
                className="absolute -inset-0.5 rounded-full opacity-40 group-hover:opacity-80 blur transition duration-300 -z-10"
                style={{ backgroundColor: currentThemeConfig.primaryHex }}
              ></div>
            </div>
            <div>
              <span className="text-sm sm:text-lg lg:text-xl font-black tracking-tight text-stone-100 flex items-center gap-1.5 leading-tight whitespace-nowrap">
                {profile.name}
              </span>
              <span className={`text-xs font-semibold block leading-none ${currentThemeConfig.textClass}`}>
                {profile.gymName}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-stone-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`transition-colors py-1 hover:${currentThemeConfig.textClass} relative group`}
              >
                <span>{link.label}</span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-[2px] rounded-full transition-all group-hover:w-full"
                  style={{ backgroundColor: currentThemeConfig.primaryHex }}
                ></span>
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Click to call */}
            <a
              href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
              className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 transition-colors flex items-center justify-center group"
              title={`Call ${profile.formattedPhone}`}
            >
              <Phone className={`w-4 h-4 ${currentThemeConfig.textClass} group-hover:scale-110 transition-transform`} />
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${profile.whatsappNumber}?text=Hi%20${encodeURIComponent(
                profile.name
              )},%20I%20would%20like%20to%20know%20more%20about%20personal%20training%20at%20${encodeURIComponent(
                profile.gymName
              )}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-400 border border-emerald-800/40 transition-colors flex items-center justify-center group"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </a>

            {/* Book Free Trial button */}
            <button
              onClick={() => openTrialModal()}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-lg transition-all text-sm font-bold active:scale-95 group ${currentThemeConfig.buttonClass}`}
            >
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Book Free Trial</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => openTrialModal()}
              className={`sm:hidden text-xs font-black px-3 py-1.5 rounded-lg shadow ${currentThemeConfig.buttonClass}`}
            >
              Free Trial
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 hover:bg-stone-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[64px] z-30 bg-stone-950/95 backdrop-blur-2xl border-b border-stone-800 p-6 shadow-2xl lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">

          <nav className="flex flex-col gap-3 mb-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-stone-200 hover:text-stone-100 font-semibold text-base py-2 border-b border-stone-900 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className={`text-xs ${currentThemeConfig.textClass}`}>→</span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openTrialModal();
              }}
              className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-xl ${currentThemeConfig.buttonClass}`}
            >
              <Calendar className="w-4 h-4" />
              <span>Book 60-Min Free Trial</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
                className="py-2.5 px-3 bg-stone-900 text-stone-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-stone-800"
              >
                <Phone className={`w-3.5 h-3.5 ${currentThemeConfig.textClass}`} />
                <span>Call Coach</span>
              </a>
              <a
                href={`https://wa.me/${profile.whatsappNumber}?text=Hi%20${encodeURIComponent(
                  profile.name
                )},%20I'm%20interested%20in%20a%20free%20trial.`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-emerald-950 text-emerald-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-800/40"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
