import React from 'react';
import { useTrainer } from '../context/TrainerContext';
import {
  Check,
  X as XIcon,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Zap,
  HelpCircle
} from 'lucide-react';

export const Pricing: React.FC = () => {
  const { pricingPlans, formatPrice, openTrialModal, currentThemeConfig } = useTrainer();

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-stone-900/60 border-b border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border"
            style={{
              backgroundColor: `${currentThemeConfig.primaryHex}15`,
              borderColor: `${currentThemeConfig.primaryHex}40`,
              color: currentThemeConfig.primaryHex
            }}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Investment in Your Physique</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-100 tracking-tight">
            Transparent Coaching Memberships
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            No hidden gym enrollment fees or locked-in annual traps. Pick the timeline that matches your transformation goal.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl flex flex-col justify-between transition-all duration-300 relative shadow-xl ${
                plan.isPopular
                  ? 'bg-stone-950 border-2 shadow-2xl lg:-translate-y-2'
                  : 'bg-stone-950/80 border border-stone-800/90 hover:border-stone-700'
              }`}
              style={{
                borderColor: plan.isPopular ? currentThemeConfig.primaryHex : undefined
              }}
            >
              {/* Popular / Best Value Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md ${
                      plan.isPopular
                        ? currentThemeConfig.buttonClass
                        : 'bg-stone-800 text-stone-300 border border-stone-700'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Card Header */}
              <div className="p-6 pb-0 text-left">
                <h3 className="text-lg font-black text-stone-100 mb-1">{plan.name}</h3>
                <p className="text-xs text-stone-400 min-h-[36px] leading-relaxed">{plan.tagline}</p>

                {/* Price Display */}
                <div className="mt-5 pb-5 border-b border-stone-800/80">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: currentThemeConfig.primaryHex }}>
                      {formatPrice(plan.discountedPrice, plan.priceUSD)}
                    </span>
                    {plan.actualPrice && plan.actualPrice > plan.discountedPrice && (
                      <>
                        <span className="text-sm font-semibold line-through" style={{ color: currentThemeConfig.primaryHex }}>
                          {formatPrice(plan.actualPrice, plan.priceUSD)}
                        </span>
                        <span className="rounded-full border border-stone-700 bg-stone-900 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-stone-400">
                          {Math.round(((plan.actualPrice - plan.discountedPrice) / plan.actualPrice) * 100)}% Off
                        </span>
                      </>
                    )}
                    <span className="text-xs text-stone-400 font-medium">/{plan.period}</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                    <span>✓ Includes full gym access & amenities</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="py-5 space-y-3 text-xs text-stone-300">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-stone-400 block mb-2">
                    What's Included:
                  </span>
                  {(plan.features || []).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: currentThemeConfig.primaryHex }} />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}

                  {plan.notIncluded && plan.notIncluded.length > 0 && (
                    <div className="pt-2 space-y-2 text-stone-500">
                      {(plan.notIncluded || []).map((nfeat, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <XIcon className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                          <span className="leading-snug line-through">{nfeat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card CTA */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => openTrialModal(plan.id)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all ${
                    plan.isPopular
                      ? `${currentThemeConfig.buttonClass} shadow-lg`
                      : 'bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700/80 hover:text-white'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-4">
            <div
              className="p-3 rounded-xl border shrink-0"
              style={{
                backgroundColor: `${currentThemeConfig.primaryHex}15`,
                borderColor: `${currentThemeConfig.primaryHex}35`,
                color: currentThemeConfig.primaryHex
              }}
            >
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black text-stone-100">100% Commitment & Progress Guarantee</h4>
              <p className="text-xs text-stone-400 max-w-xl mt-0.5">
                If after your first 14 days of following the prescribed training and nutrition plan you do not feel stronger and more energized, we will refund your remaining sessions—zero friction.
              </p>
            </div>
          </div>

          <button
            onClick={() => openTrialModal()}
            className={`whitespace-nowrap px-5 py-3 rounded-xl text-xs font-black transition-all ${currentThemeConfig.buttonClass}`}
          >
            Start with Free Trial Pass
          </button>
        </div>

      </div>
    </section>
  );
};
