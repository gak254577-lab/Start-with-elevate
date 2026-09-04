import React from 'react';
import { useTrainer } from '../context/TrainerContext';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Instagram,
  Youtube,
  Heart
} from 'lucide-react';
import { WaveFitnessLogo } from './WaveFitnessLogo';

export const Footer: React.FC = () => {
  const { profile, currentThemeConfig } = useTrainer();

  const handleNavClick = (href: string) => {
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

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Training Programs', href: '#services' },
    { label: 'Pricing & Plans', href: '#pricing' },
    { label: 'Transformations & Reviews', href: '#transformations' },
    { label: 'Photo Gallery', href: '#gallery' },
    { label: 'FAQs', href: '#faq' },
    { label: 'Book Free Trial', href: '#contact' },
  ];

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 relative overflow-hidden text-left">
      
      {/* Main Footer Links & Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black shadow-lg bg-black border border-stone-800 p-0.5">
                <WaveFitnessLogo
                  variant="full"
                  size={44}
                />
              </div>
              <div>
                <span className="text-lg font-black text-stone-100 block leading-tight">{profile.name}</span>
                <span className={`text-xs font-semibold leading-none ${currentThemeConfig.textClass}`}>
                  {profile.gymName}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed pr-4 max-w-md">
              Science-backed personal training, Olympic strength periodization, and sustainable nutritional coaching designed to build dense lean muscle, strip body fat, and restore pain-free movement.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-900 hover:text-white text-stone-300 border border-stone-800 flex items-center justify-center transition-all hover:scale-105"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)'
                }}
                title="Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={profile.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-900 hover:bg-red-600 hover:text-white text-stone-300 border border-stone-800 flex items-center justify-center transition-all hover:scale-105"
                title="YouTube"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${profile.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-900 hover:bg-emerald-600 hover:text-white text-stone-300 border border-stone-800 flex items-center justify-center transition-all hover:scale-105"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-stone-100 uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <h4 className="text-xs font-bold text-stone-100 uppercase tracking-wider">Gym & Studio</h4>
            
            <div className="space-y-2.5 text-stone-400">
              <a
                href={profile.googleMapDirectionsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${profile.gymName} ${profile.address} ${profile.city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 group hover:text-white transition-colors"
              >
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: currentThemeConfig.primaryHex }} />
                <span>{profile.address}, {profile.city}</span>
              </a>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" style={{ color: currentThemeConfig.primaryHex }} />
                <a href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white">
                  {profile.formattedPhone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" style={{ color: currentThemeConfig.primaryHex }} />
                <a href={`mailto:${profile.email}`} className="hover:text-white truncate">
                  {profile.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 shrink-0" style={{ color: currentThemeConfig.primaryHex }} />
                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white truncate"
                >
                  Instagram: {profile.instagramHandle}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Local SEO Keyword Tags Block */}
        <div className="mt-12 pt-6 border-t border-stone-900 text-[11px] text-stone-600 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="text-stone-500">Local Focus:</span>
            <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800/50">{profile.gymName}</span>
            <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800/50">{profile.city} Personal Trainer</span>
            <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800/50">1-on-1 Weight Loss Coach</span>
            <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800/50">Olympic Strength & Conditioning</span>
            <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800/50">Free Gym Trial Pass</span>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-6 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} {profile.gymName} • {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>•</span>
            <a href="#contact" className="hover:text-stone-300 transition-colors">
              Terms & Privacy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
