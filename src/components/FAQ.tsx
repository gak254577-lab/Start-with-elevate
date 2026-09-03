import React, { useState } from 'react';
import { useTrainer } from '../context/TrainerContext';
import {
  HelpCircle,
  ChevronDown,
  Phone,
  MessageSquare,
  Search,
  Sparkles
} from 'lucide-react';

export const FAQ: React.FC = () => {
  const { faqs, profile, currentThemeConfig } = useTrainer();
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 lg:py-28 bg-stone-950 border-b border-stone-800/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border"
            style={{
              backgroundColor: `${currentThemeConfig.primaryHex}15`,
              borderColor: `${currentThemeConfig.primaryHex}40`,
              color: currentThemeConfig.primaryHex
            }}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Answers & Details</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-100 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-400 text-base sm:text-lg">
            Everything you need to know about trial sessions, gym policies, equipment, and starting your fitness transformation.
          </p>

          {/* Quick Search */}
          <div className="max-w-md mx-auto pt-3">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions (e.g., trial, diet, cancellation)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-900/90 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-stone-600 transition-colors shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 text-left">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden shadow-lg ${
                  isOpen
                    ? 'bg-stone-900 shadow-xl'
                    : 'bg-stone-900/50 border-stone-800/80 hover:border-stone-700'
                }`}
                style={{
                  borderColor: isOpen ? `${currentThemeConfig.primaryHex}60` : undefined
                }}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: currentThemeConfig.primaryHex }}
                    />
                    <span className="font-bold text-stone-100 text-base leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    style={{ color: currentThemeConfig.primaryHex }}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-stone-300 text-sm leading-relaxed border-t border-stone-800/60 mt-1">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 text-stone-500 text-sm">
              No matching questions found for "{searchQuery}". Contact {profile.name} directly below!
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-14 p-6 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-5 text-left shadow-xl">
          <div>
            <h4 className="text-base font-black text-stone-100">Have a specific question or health condition?</h4>
            <p className="text-xs text-stone-400 mt-1">Reach out directly to {profile.name} for custom guidance.</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
              className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center justify-center gap-2 border border-stone-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" style={{ color: currentThemeConfig.primaryHex }} />
              <span>Call Direct</span>
            </a>
            <a
              href={`https://wa.me/${profile.whatsappNumber}?text=Hi%20${encodeURIComponent(
                profile.name
              )},%20I%20have%20a%20question%20about%20your%20training%20program.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 border border-emerald-800/40 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
