import React from 'react';
import { useTrainer } from '../context/TrainerContext';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Calculator,
  ArrowRight,
  BookOpen,
  HeartHandshake
} from 'lucide-react';

export const About: React.FC = () => {
  const { profile, certifications, openTrialModal, openBMICalculator, currentThemeConfig } = useTrainer();

  return (
    <section id="about" className="py-20 lg:py-28 bg-stone-900/60 border-b border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border"
            style={{
              backgroundColor: `${currentThemeConfig.primaryHex}15`,
              borderColor: `${currentThemeConfig.primaryHex}40`,
              color: currentThemeConfig.primaryHex
            }}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Meet Your Master Coach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-100 tracking-tight">
            Backed by Science. Built for Longevity.
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            No cookie-cutter routines or unsustainable starvation diets. Every protocol is customized to your biomechanics, hormone profile, and daily schedule.
          </p>
        </div>

        {/* Bio & Coach Profile Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Trainer portrait & Credentials Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shadow-2xl aspect-[4/5] group">
              <img
                src={profile.trainerAboutImage}
                alt={`${profile.name} coaching in gym`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="p-4 rounded-xl bg-stone-900/95 backdrop-blur-md border border-stone-700/60 shadow-xl">
                  <div className="text-stone-100 font-bold text-lg">{profile.name}</div>
                  <div className={`text-xs font-semibold mb-2 ${currentThemeConfig.textClass}`}>
                    {profile.gymName} • Head Coach
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(profile.specialties || []).slice(0, 3).map((spec, i) => (
                      <span key={i} className="text-[11px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded border border-stone-700 font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick interactive BMI calculator trigger card */}
            <div
              className="mt-4 p-4 rounded-xl border flex items-center justify-between shadow-md"
              style={{
                backgroundColor: `${currentThemeConfig.primaryHex}10`,
                borderColor: `${currentThemeConfig.primaryHex}35`
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="p-2.5 rounded-lg"
                  style={{
                    backgroundColor: `${currentThemeConfig.primaryHex}25`,
                    color: currentThemeConfig.primaryHex
                  }}
                >
                  <Calculator className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-stone-100">Want to check your target stats?</div>
                  <div className="text-xs text-stone-400">Calculate BMI & target calories for free</div>
                </div>
              </div>
              <button
                onClick={openBMICalculator}
                className={`px-3.5 py-2 rounded-lg font-bold text-xs transition-all shadow ${currentThemeConfig.buttonClass}`}
              >
                Calculate
              </button>
            </div>
          </div>

          {/* Trainer Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <span className={`font-bold text-xs uppercase tracking-wider ${currentThemeConfig.textClass}`}>
                Background & Coaching Heritage
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-100 mt-1">
                {profile.yearsOfExperience} Years of Transforming Everyday Lives into Peak Performers
              </h3>
            </div>

            {(profile.bioParagraphs || []).map((para, idx) => (
              <p key={idx} className="text-stone-300 leading-relaxed text-base">
                {para}
              </p>
            ))}

            {/* Specialties Checklist */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-wider text-stone-400 font-bold mb-3">Core Specialties & Coaching Domains</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(profile.specialties || []).map((specialty, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-stone-200">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: currentThemeConfig.primaryHex }} />
                    <span className="font-medium">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openTrialModal()}
                className={`inline-flex items-center gap-2 font-black px-6 py-3.5 rounded-xl shadow-lg text-sm ${currentThemeConfig.buttonClass}`}
              >
                <span>Schedule 1-on-1 Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-stone-400 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                Zero obligation • 60-min in-person trial
              </span>
            </div>
          </div>

        </div>

        {/* Certifications Grid */}
        <div>
          <div className="text-left mb-8 flex items-center justify-between">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${currentThemeConfig.textClass}`}>
                Accreditations & Credentials
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-100 mt-1">Gold-Standard Industry Certifications</h3>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-stone-300 bg-stone-950 px-3.5 py-2 rounded-xl border border-stone-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Active Credentials</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-2xl bg-stone-950 border border-stone-800/80 hover:border-stone-700 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[11px] font-black px-2 py-0.5 rounded border"
                      style={{
                        backgroundColor: `${currentThemeConfig.primaryHex}15`,
                        borderColor: `${currentThemeConfig.primaryHex}35`,
                        color: currentThemeConfig.primaryHex
                      }}
                    >
                      {cert.badgeText || 'Certified'}
                    </span>
                    <span className="text-xs text-stone-500 font-mono font-bold">{cert.year}</span>
                  </div>
                  <h4 className="text-base font-black text-stone-100 leading-snug mb-1">{cert.name}</h4>
                  <p className={`text-xs font-semibold mb-2.5 ${currentThemeConfig.textClass}`}>{cert.issuer}</p>
                  <p className="text-xs text-stone-400 leading-relaxed">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
