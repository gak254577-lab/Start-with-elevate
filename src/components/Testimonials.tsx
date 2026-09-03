import React, { useState } from 'react';
import { useTrainer } from '../context/TrainerContext';
import {
  Star,
  Quote,
  CheckCircle2,
  TrendingUp,
  MessageSquareHeart,
  PenLine,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { WriteReviewModal } from './WriteReviewModal';

export const Testimonials: React.FC = () => {
  const { testimonials, profile, currentThemeConfig } = useTrainer();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayedTestimonials = showAllReviews ? testimonials : testimonials.slice(0, 3);
  const hasMoreReviews = testimonials.length > 3;

  const averageRating = testimonials.length > 0
    ? (testimonials.reduce((acc, t) => acc + (t.rating || 5), 0) / testimonials.length).toFixed(1)
    : '5.0';

  return (
    <section id="transformations" className="py-20 lg:py-28 bg-stone-950 border-b border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border"
            style={{
              backgroundColor: `${currentThemeConfig.primaryHex}15`,
              borderColor: `${currentThemeConfig.primaryHex}40`,
              color: currentThemeConfig.primaryHex
            }}
          >
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>Proven Success</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-100 tracking-tight">
            Client Transformations & Stories
          </h2>
          <p className="text-stone-400 text-base sm:text-lg">
            Real clients who transformed their health, body composition, and confidence under {profile.name}’s guidance.
          </p>

          <div className="pt-2 flex items-center justify-center">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 ${currentThemeConfig.buttonClass}`}
            >
              <PenLine className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Empty State when no reviews exist */}
        {testimonials.length === 0 ? (
          <div className="max-w-xl mx-auto p-8 sm:p-10 rounded-2xl bg-stone-900/50 border border-stone-800/80 text-center space-y-4 shadow-xl">
            <div
              className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center border"
              style={{
                backgroundColor: `${currentThemeConfig.primaryHex}15`,
                borderColor: `${currentThemeConfig.primaryHex}35`,
                color: currentThemeConfig.primaryHex,
              }}
            >
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-stone-100">
              Member Reviews & Testimonials
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed max-w-md mx-auto">
              Be the first member to share your transformation story, progress results, and coaching feedback!
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 ${currentThemeConfig.buttonClass}`}
              >
                <PenLine className="w-4 h-4" />
                <span>Write the First Review</span>
              </button>
            </div>
          </div>
        ) : (
          /* Testimonials Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {displayedTestimonials.map((test) => (
              <div
                key={test.id}
                className="rounded-2xl bg-stone-900/70 border border-stone-800 hover:border-stone-700 transition-all p-7 flex flex-col justify-between relative group shadow-xl"
              >
                {/* Quote icon watermark */}
                <div className="absolute top-6 right-6 text-stone-800/80 transition-colors pointer-events-none">
                  <Quote className="w-10 h-10" />
                </div>

                <div>
                  {/* Achievement Tag */}
                  {test.achievement && (
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold mb-4"
                      style={{
                        backgroundColor: `${currentThemeConfig.primaryHex}15`,
                        borderColor: `${currentThemeConfig.primaryHex}35`,
                        color: currentThemeConfig.primaryHex
                      }}
                    >
                      <TrendingUp className="w-3.5 h-3.5 shrink-0" style={{ color: currentThemeConfig.primaryHex }} />
                      <span>{test.achievement}</span>
                    </div>
                  )}

                  {/* Rating stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(Math.max(1, Math.min(5, Math.round(test.rating || 5))))].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current"
                        style={{ color: currentThemeConfig.primaryHex }}
                      />
                    ))}
                    <span className="text-xs font-bold text-stone-300 ml-1.5">{(test.rating || 5).toFixed(1)}</span>
                  </div>

                  {/* Client Quote */}
                  <p className="text-stone-300 text-sm leading-relaxed italic mb-6">
                    "{test.quote}"
                  </p>

                  {/* Attached Transformation Photos (if user uploaded) */}
                  {test.beforeImage && test.afterImage && (
                    <div className="mb-6 p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                        Verified Member Photos:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-stone-800 bg-stone-900">
                          <img
                            src={test.beforeImage}
                            alt={`${test.clientName} Before`}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-bold text-stone-200 uppercase">
                            Before
                          </span>
                        </div>
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-stone-800 bg-stone-900">
                          <img
                            src={test.afterImage}
                            alt={`${test.clientName} After`}
                            className="w-full h-full object-cover"
                          />
                          <span
                            className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-black uppercase text-stone-950"
                            style={{ backgroundColor: currentThemeConfig.primaryHex }}
                          >
                            After
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Client Info Footer */}
                <div className="pt-4 border-t border-stone-800">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-stone-100 font-bold text-sm">{test.clientName}</h4>
                      {test.verified && (
                        <CheckCircle2
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: currentThemeConfig.primaryHex }}
                          title="Verified Client"
                        />
                      )}
                    </div>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {test.duration}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">{test.profession}</p>
                  <p className={`text-[11px] font-semibold truncate mt-1 ${currentThemeConfig.textClass}`}>
                    {test.program}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View More / View Less Button */}
        {hasMoreReviews && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAllReviews((prev) => !prev)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-800 bg-stone-900/80 hover:bg-stone-800/90 text-stone-200 text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:border-stone-700 active:scale-95"
            >
              {showAllReviews ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>Show Less Reviews</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>View More Reviews ({testimonials.length - 3} more)</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Rating summary bar */}
        <div className="mt-14 p-6 rounded-2xl bg-stone-900/50 border border-stone-800 text-center flex flex-wrap items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-black" style={{ color: currentThemeConfig.primaryHex }}>
              {averageRating}
            </div>
            <div>
              <div className="flex" style={{ color: currentThemeConfig.primaryHex }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <div className="text-xs text-stone-400 font-medium">
                {testimonials.length > 0
                  ? `Average Rating (${testimonials.length} ${testimonials.length === 1 ? 'Review' : 'Reviews'})`
                  : 'Certified 5.0 Rating Standard'}
              </div>
            </div>
          </div>

          <div className="h-8 w-px bg-stone-800 hidden sm:block" />

          <div>
            <div className="text-stone-100 font-bold text-sm">100% Verified Local Feedback</div>
            <div className="text-xs text-stone-400">Gym Floor Check-ins & Digital Reviews</div>
          </div>

          <div className="h-8 w-px bg-stone-800 hidden sm:block" />

          <div>
            <div className="text-stone-100 font-bold text-sm">Trained with {profile.name}?</div>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="text-xs font-bold transition-opacity hover:opacity-80 underline underline-offset-4"
              style={{ color: currentThemeConfig.primaryHex }}
            >
              Share your transformation story →
            </button>
          </div>
        </div>

      </div>

      {/* Review Submission Modal */}
      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </section>
  );
};
