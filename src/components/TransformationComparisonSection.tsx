import React, { useState, useRef, useCallback } from 'react';
import { useTrainer } from '../context/TrainerContext';
import {
  Award,
  TrendingUp,
  Star,
  Quote,
  Calendar,
  CheckCircle,
  ArrowLeftRight,
  UploadCloud
} from 'lucide-react';
import { WriteReviewModal } from './WriteReviewModal';

export const TransformationComparisonSection: React.FC = () => {
  const { transformations = [], currentThemeConfig, openTrialModal } = useTrainer();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentItem = transformations[selectedIdx] || transformations[0];

  const handleSliderMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  if (!transformations || transformations.length === 0) {
    return null;
  }

  const clientName = currentItem?.name || 'Client';
  const timeframe = currentItem?.durationWeeks ? `${currentItem.durationWeeks} Weeks` : '16 Weeks';
  const program = currentItem?.program || '1-on-1 Transformation Program';
  const beforeWeight = currentItem?.beforeWeight || '85 kg';
  const afterWeight = currentItem?.afterWeight || '72 kg';
  const fatLoss = currentItem?.fatLoss || '-13 kg Fat Loss';
  const muscleGain = currentItem?.muscleGain || '+3.5 kg Lean Mass';
  const quote = currentItem?.quote || 'Consistent coaching and nutrition structure changed everything for me.';
  const routineHighlight = currentItem?.routineHighlight || '4x/week Strength + Progressive Overload';

  const milestones = [
    fatLoss,
    muscleGain,
    routineHighlight,
  ].filter(Boolean);

  return (
    <section id="transformations" className="py-20 bg-stone-950 border-b border-stone-800/80 relative overflow-hidden">
      
      {/* Background glow */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-15"
        style={{ backgroundColor: currentThemeConfig.primaryHex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 border"
            style={{
              backgroundColor: `${currentThemeConfig.primaryHex}15`,
              borderColor: `${currentThemeConfig.primaryHex}40`,
              color: currentThemeConfig.primaryHex
            }}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Documented Client Transformations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-100 tracking-tight leading-tight">
            Real Results. No Gimmicks.
          </h2>
          <p className="mt-4 text-stone-400 text-base sm:text-lg leading-relaxed">
            Drag the visual slider to inspect client muscle composition, posture corrections, and body fat reductions achieved through structured 1-on-1 coaching.
          </p>
        </div>

        {/* Client Selection Pills + Add Your Transformation Button */}
        <div className="flex sm:flex-wrap items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar snap-x">
          {(transformations || []).map((item, idx) => {
            const isSelected = selectedIdx === idx;
            const itemTimeframe = item.durationWeeks ? `${item.durationWeeks} Wks` : '16 Wks';
            return (
              <button
                key={item.id || idx}
                onClick={() => {
                  setSelectedIdx(idx);
                  setSliderPosition(50);
                }}
                className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border snap-start shrink-0 ${
                  isSelected
                    ? `${currentThemeConfig.buttonClass} shadow-lg scale-105`
                    : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>{item.name}</span>
                <span className="text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded bg-stone-950/40 text-stone-200 font-normal">
                  {itemTimeframe}
                </span>
              </button>
            );
          })}

          {/* Quick upload button */}
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border border-dashed border-stone-700 text-stone-300 hover:text-stone-100 hover:border-stone-500 bg-stone-900/40 hover:bg-stone-900/90 snap-start shrink-0"
          >
            <UploadCloud className="w-4 h-4" style={{ color: currentThemeConfig.primaryHex }} />
            <span>+ Upload Your Photos</span>
          </button>
        </div>

        {/* Main Transformation Spotlight Card */}
        {currentItem && (
          <div className="bg-stone-900/70 border border-stone-800 rounded-3xl p-4 sm:p-10 shadow-2xl backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              
              {/* Left Column: Interactive Before / After Image Slider */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div
                  ref={containerRef}
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                  onMouseMove={handleMouseMove}
                  onTouchStart={() => setIsDragging(true)}
                  onTouchEnd={() => setIsDragging(false)}
                  onTouchMove={handleTouchMove}
                  className="relative w-full aspect-[4/5] max-w-md rounded-2xl overflow-hidden select-none cursor-ew-resize border-2 border-stone-800 shadow-2xl group"
                >
                  {/* "After" Image (Full background) */}
                  <img
                    src={currentItem.afterImage}
                    alt={`${clientName} After`}
                    className="absolute inset-0 w-full h-full object-cover object-center filter brightness-100"
                    draggable={false}
                  />
                  <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-sm text-[10px] sm:text-[11px] font-black uppercase text-emerald-400 border border-emerald-500/30">
                    After ({timeframe})
                  </div>

                  {/* "Before" Image (Clipped overlay) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={currentItem.beforeImage}
                      alt={`${clientName} Before`}
                      className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 max-w-none"
                      style={{
                        width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                        height: '100%'
                      }}
                      draggable={false}
                    />
                    <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-sm text-[10px] sm:text-[11px] font-black uppercase text-stone-400 border border-stone-800">
                      Before
                    </div>
                  </div>

                  {/* Partition Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 z-30 w-1 bg-white shadow-2xl transition-transform pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    {/* Draggable Circle Knob */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-950 border-2 border-white shadow-xl flex items-center justify-center text-stone-100"
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Mobile Quick-Tap Comparison Toggles */}
                <div className="w-full max-w-md mt-3 flex items-center justify-between gap-2 p-1 bg-stone-950 rounded-xl border border-stone-800 text-xs font-bold">
                  <button
                    onClick={() => setSliderPosition(95)}
                    className={`flex-1 py-1.5 rounded-lg transition-all text-center ${
                      sliderPosition > 85
                        ? 'bg-stone-800 text-stone-100'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Before
                  </button>
                  <button
                    onClick={() => setSliderPosition(50)}
                    className={`flex-1 py-1.5 rounded-lg transition-all text-center ${
                      sliderPosition >= 40 && sliderPosition <= 60
                        ? 'bg-stone-800 text-stone-100'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    50 / 50 Split
                  </button>
                  <button
                    onClick={() => setSliderPosition(5)}
                    className={`flex-1 py-1.5 rounded-lg transition-all text-center ${
                      sliderPosition < 15
                        ? 'bg-stone-800 text-stone-100'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    After
                  </button>
                </div>

                <p className="text-[11px] text-stone-400 mt-2 flex items-center gap-1.5 font-medium">
                  <ArrowLeftRight className="w-3.5 h-3.5" style={{ color: currentThemeConfig.primaryHex }} />
                  <span>Swipe slider horizontally or tap buttons above</span>
                </p>
              </div>


              {/* Right Column: Client Breakdown & Stats */}
              <div className="lg:col-span-6 space-y-6 text-left">
                
                {/* Client Header */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: `${currentThemeConfig.primaryHex}15`,
                        borderColor: `${currentThemeConfig.primaryHex}40`,
                        color: currentThemeConfig.primaryHex
                      }}
                    >
                      {program}
                    </span>
                    <span className="text-xs text-stone-400">• {timeframe} Transformation</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-stone-100">
                    {clientName}{currentItem.age ? `, ${currentItem.age}` : ''}
                  </h3>
                </div>

                {/* Milestone Stat Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                    <span className="text-[11px] text-stone-500 uppercase font-bold block">Weight Delta</span>
                    <div className="text-base sm:text-lg font-black text-stone-100 mt-0.5">
                      {beforeWeight} → <span style={{ color: currentThemeConfig.primaryHex }}>{afterWeight}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                    <span className="text-[11px] text-stone-500 uppercase font-bold block">Body Fat Lost</span>
                    <div className="text-base sm:text-lg font-black text-emerald-400 mt-0.5">
                      {fatLoss}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 col-span-2 sm:col-span-1">
                    <span className="text-[11px] text-stone-500 uppercase font-bold block">Muscle & Strength</span>
                    <div className="text-xs sm:text-sm font-black text-stone-200 mt-0.5 truncate">
                      {muscleGain}
                    </div>
                  </div>
                </div>

                {/* Key Program Highlights */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                    Program Milestones Achieved:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {milestones.map((milestone, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-2.5 text-xs text-stone-300">
                        <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                        <span>{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real Client Quote */}
                <div className="p-4 rounded-xl bg-stone-950/90 border border-stone-800 relative">
                  <Quote className="w-6 h-6 text-stone-700 absolute top-3 right-3 opacity-40" />
                  <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed pr-6">
                    "{quote}"
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-200">— {clientName}</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={() => openTrialModal()}
                    className={`w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-xl ${currentThemeConfig.buttonClass}`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Start Your Own Transformation</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* Write Review & Transformation Upload Modal */}
      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </section>
  );
};

