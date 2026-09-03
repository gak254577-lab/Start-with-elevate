import React from 'react';
import { useTrainer } from '../context/TrainerContext';
import {
  Calendar,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Flame,
  Activity,
  Calculator,
  Sparkles,
  Zap,
  Target,
  Clock
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { profile, openTrialModal, openBMICalculator, currentThemeConfig } = useTrainer();

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-10 sm:pb-20 lg:pt-14 lg:pb-24 bg-stone-950 border-b border-stone-800/80">
      {/* Background ambient radial lights using theme primary hex */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px] pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: currentThemeConfig.primaryHex }}
      />
      <div className="absolute top-20 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-[130px] pointer-events-none" />
      
      {/* High tech grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#29252418_1px,transparent_1px),linear-gradient(to_bottom,#29252418_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            
            {/* Top Badge with Live Status */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/90 border text-xs font-bold tracking-wide shadow-sm" style={{ borderColor: `${currentThemeConfig.primaryHex}40` }}>
                <Zap className="w-3.5 h-3.5 animate-pulse" style={{ color: currentThemeConfig.primaryHex }} />
                <span className="text-stone-200">Certified Master Coach</span>
                <span className="w-1 h-1 rounded-full bg-stone-600"></span>
                <span style={{ color: currentThemeConfig.primaryHex }}>{profile.gymName}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-[11px] font-bold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Open for 1-on-1 Sessions</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black text-stone-100 tracking-tight leading-[1.1]">
              Sculpt Your Strongest, <br className="hidden sm:inline" />
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, ${currentThemeConfig.primaryHex}, #ffffff)`
                }}
              >
                Leanest Physique
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl">
              {profile.heroSubheadline}
            </p>

            {/* Quick Benefits Grid (2x2 on all screens) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-300 font-medium">
              <div className="flex items-center gap-2 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/80">
                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: currentThemeConfig.primaryHex }} />
                <span className="text-xs sm:text-sm font-semibold">1-on-1 Biomechanics & Lifting Form</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/80">
                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: currentThemeConfig.primaryHex }} />
                <span className="text-xs sm:text-sm font-semibold">Zero-Starvation Macro Blueprints</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/80">
                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: currentThemeConfig.primaryHex }} />
                <span className="text-xs sm:text-sm font-semibold">Private Olympic Squat & Deadlift Racks</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/80">
                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: currentThemeConfig.primaryHex }} />
                <span className="text-xs sm:text-sm font-semibold">Bi-Weekly InBody Composition Scans</span>
              </div>
            </div>

            {/* CTA Buttons Row - Responsive Ergonomics */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => openTrialModal()}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all text-sm font-black group ${currentThemeConfig.buttonClass}`}
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                <span>Claim Free 60-Min Trial Pass</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={openBMICalculator}
                className="inline-flex items-center justify-center gap-2 bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700/80 px-5 py-3.5 sm:py-4 rounded-xl font-bold text-sm transition-colors shadow-lg active:scale-95"
              >
                <Calculator className="w-4 h-4" style={{ color: currentThemeConfig.primaryHex }} />
                <span>Calculate BMI</span>
              </button>
            </div>

          </div>


          {/* Right Column: High-End Athlete Visual Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Glowing decorative border */}
              <div
                className="absolute -inset-2 rounded-3xl opacity-40 blur-lg transition duration-700 -z-10"
                style={{ backgroundColor: currentThemeConfig.primaryHex }}
              />

              <div className="relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl aspect-[4/5] group">
                <img
                  src={profile.trainerHeroImage}
                  alt={`${profile.name} - Head Coach`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                />
                
                {/* Dark bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/25 to-transparent" />

                {/* Bottom Overlay Info Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-950/85 backdrop-blur-md border border-stone-800 text-left shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-stone-100 font-black text-lg">{profile.name}</h3>
                      <p className={`text-xs font-semibold ${currentThemeConfig.textClass}`}>{profile.tagline}</p>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-lg font-black text-xs border"
                      style={{
                        backgroundColor: `${currentThemeConfig.primaryHex}20`,
                        borderColor: `${currentThemeConfig.primaryHex}50`,
                        color: currentThemeConfig.primaryHex
                      }}
                    >
                      NASM • ACE
                    </span>
                  </div>
                </div>

                {/* Floating pill: Experience */}
                <div className="absolute top-4 left-4 p-2.5 px-3.5 rounded-xl bg-stone-950/90 backdrop-blur-md border border-stone-800 text-left shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="p-1.5 rounded-lg"
                      style={{ backgroundColor: `${currentThemeConfig.primaryHex}25`, color: currentThemeConfig.primaryHex }}
                    >
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-stone-100 font-black text-sm leading-tight">{profile.yearsOfExperience}+ Years</div>
                      <div className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Pro Coaching</div>
                    </div>
                  </div>
                </div>

                {/* Floating pill: Success Count */}
                <div className="absolute top-20 right-4 p-2.5 px-3.5 rounded-xl bg-stone-950/90 backdrop-blur-md border border-stone-800 text-left shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-stone-100 font-black text-sm leading-tight">{profile.clientsTransformed}+</div>
                      <div className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Athletes Built</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Free Trial Guarantee Tag */}
              <div
                onClick={() => openTrialModal()}
                className="mt-3.5 p-3 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-stone-700 cursor-pointer flex items-center justify-between text-xs text-stone-300 transition-all group shadow-md"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium">Free 60-Min Trial • No Commitment</span>
                </span>
                <span className={`font-bold group-hover:underline flex items-center gap-1 ${currentThemeConfig.textClass}`}>
                  Claim Pass →
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Dynamic Metric Tickers */}
        <div className="mt-14 pt-8 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-stone-900/50 border border-stone-800/70 hover:border-stone-700 transition-colors">
            <div className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: currentThemeConfig.primaryHex }}>
              {profile.yearsOfExperience}+
            </div>
            <div className="text-xs text-stone-400 font-semibold mt-1">Years Personal Coaching</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/50 border border-stone-800/70 hover:border-stone-700 transition-colors">
            <div className="text-3xl sm:text-4xl font-black text-stone-100 tracking-tight">
              {profile.clientsTransformed}+
            </div>
            <div className="text-xs text-stone-400 font-semibold mt-1">Verified Client Results</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/50 border border-stone-800/70 hover:border-stone-700 transition-colors">
            <div className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: currentThemeConfig.primaryHex }}>
              100%
            </div>
            <div className="text-xs text-stone-400 font-semibold mt-1">Custom Nutrition & Form</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/50 border border-stone-800/70 hover:border-stone-700 transition-colors">
            <div className="text-3xl sm:text-4xl font-black text-stone-100 tracking-tight">
              {profile.rating} ★
            </div>
            <div className="text-xs text-stone-400 font-semibold mt-1">Studio Client Rating</div>
          </div>
        </div>

      </div>
    </section>
  );
};
