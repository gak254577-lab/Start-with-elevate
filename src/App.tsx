/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TrainerProvider, useTrainer } from './context/TrainerContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Gallery } from './components/Gallery';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TrialBookingModal } from './components/TrialBookingModal';
import { BMICalculatorModal } from './components/BMICalculatorModal';
import {
  MessageSquare,
  ChevronUp
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { profile, openTrialModal, openBMICalculator, currentThemeConfig } = useTrainer();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 400);

      const sections = ['home', 'services', 'pricing', 'transformations', 'gallery', 'faq', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-stone-100 flex flex-col selection:bg-yellow-400 selection:text-black">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 pb-28 sm:pb-12">
        {/* 1. Hero Section */}
        <div id="home">
          <Hero />
        </div>

        {/* 2. Services Offerings Section */}
        <Services />

        {/* 3. Pricing & Transformation Packages Section */}
        <Pricing />

        {/* 6. Client Transformations & Member Reviews Section */}
        <Testimonials />

        {/* 7. Gym & Training Gallery Section */}
        <Gallery />

        {/* 8. FAQ Section */}
        <FAQ />

        {/* 9. Contact & Free Trial Booking Section */}
        <ContactSection />
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Global Modals & Drawers */}
      <TrialBookingModal />
      <BMICalculatorModal />

      {/* Floating Action Controls (Visible Across Entire Website on Desktop, Tablet & Mobile) */}
      <div className="fixed right-5 bottom-6 z-50 flex items-center gap-3">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-xl bg-stone-900/90 text-stone-300 border border-stone-800 hover:border-stone-700 hover:text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all active:scale-95"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating Dark Outlined WhatsApp Button */}
        <a
          href={`https://wa.me/${profile.whatsappNumber}?text=Hi%20${encodeURIComponent(
            profile.name
          )},%20I'm%20interested%20in%20a%20free%20trial%20session%20at%20${encodeURIComponent(
            profile.gymName
          )}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 px-3.5 rounded-2xl bg-stone-950/90 hover:bg-stone-900 border border-emerald-500/80 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 font-bold text-sm flex items-center gap-2 shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 stroke-[2.2] text-emerald-400" />
          <span className="font-bold tracking-tight whitespace-nowrap">WhatsApp</span>
        </a>
      </div>
    </div>
  );
};


export default function App() {
  return (
    <TrainerProvider>
      <MainLayout />
    </TrainerProvider>
  );
}
