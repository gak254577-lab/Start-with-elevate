import React, { useState } from 'react';
import { useTrainer } from '../context/TrainerContext';
import {
  Target,
  Flame,
  Calendar,
  Sparkles,
  Activity,
  Layers,
  CheckCircle2,
  Dumbbell
} from 'lucide-react';
import { WorkoutSplit } from '../types';

interface SplitCategory {
  id: string;
  name: string;
  badge: string;
  level: string;
  daysCount: string;
  goal: string;
  description: string;
  splits: WorkoutSplit[];
}

export const WorkoutSplitPreview: React.FC = () => {
  const { workoutSplits = {}, currentThemeConfig, openTrialModal } = useTrainer();

  const categories: SplitCategory[] = [
    {
      id: 'fatLoss',
      name: 'Fat Loss & Recomposition',
      badge: 'High Metabolic Burn',
      level: 'All Fitness Levels',
      daysCount: '3 Days / Wk',
      goal: 'Accelerate Fat Oxidation while Preserving Dense Lean Muscle',
      description: 'A non-competing full-body & upper/lower undulating split designed to stimulate muscle protein synthesis with high caloric output.',
      splits: workoutSplits.fatLoss || [],
    },
    {
      id: 'muscleBuilding',
      name: 'Hypertrophy Push • Pull • Legs',
      badge: 'Maximum Muscle Growth',
      level: 'Intermediate - Advanced',
      daysCount: '3-6 Days / Wk',
      goal: 'Maximum Muscle Hypertrophy & Symmetrical Proportions',
      description: 'The golden standard bodybuilding split optimizing weekly volume, localized recovery time, and progressive mechanical tension.',
      splits: workoutSplits.muscleBuilding || [],
    },
  ];

  const [activeCategoryId, setActiveCategoryId] = useState<string>('fatLoss');
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);

  const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];
  const daysList = activeCategory?.splits || [];
  const currentDay = daysList[activeDayIndex] || daysList[0];

  return (
    <section id="workouts" className="py-20 bg-stone-950 border-b border-stone-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-10"
        style={{ backgroundColor: currentThemeConfig.primaryHex }}
      />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-stone-800/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 border"
            style={{
              backgroundColor: `${currentThemeConfig.primaryHex}15`,
              borderColor: `${currentThemeConfig.primaryHex}40`,
              color: currentThemeConfig.primaryHex
            }}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Interactive Coaching Protocols</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-100 tracking-tight leading-tight">
            Scientific Training Blueprints
          </h2>
          <p className="mt-4 text-stone-400 text-base sm:text-lg leading-relaxed">
            Every client receives a periodized program tailored to their biomechanics, joint history, and schedule. Inspect sample training days below.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex sm:flex-wrap items-center justify-start sm:justify-center gap-3 overflow-x-auto pb-2 mb-8 no-scrollbar snap-x">
          {categories.map((cat) => {
            const isSelected = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategoryId(cat.id);
                  setActiveDayIndex(0);
                }}
                className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2.5 border snap-start shrink-0 ${
                  isSelected
                    ? `${currentThemeConfig.buttonClass} shadow-lg scale-105`
                    : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>{cat.name}</span>
                <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-stone-950/40 text-stone-200">
                  {cat.daysCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Split Content Container */}
        {activeCategory && (
          <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-2xl">
            
            {/* Split Top Overview Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-800">
              <div>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-400">
                  Goal Focus: <span className="text-stone-200 font-black">{activeCategory.goal}</span>
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-stone-100 mt-1">
                  {activeCategory.name} Blueprint
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-2xl">
                  {activeCategory.description}
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 text-xs">
                <div className="flex-1 sm:flex-initial px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-stone-950 border border-stone-800 text-center">
                  <span className="text-stone-500 block uppercase font-bold text-[10px]">Level</span>
                  <span className="font-black text-stone-200 text-xs sm:text-sm">{activeCategory.level}</span>
                </div>
                <div className="flex-1 sm:flex-initial px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-stone-950 border border-stone-800 text-center">
                  <span className="text-stone-500 block uppercase font-bold text-[10px]">Frequency</span>
                  <span className="font-black text-stone-200 text-xs sm:text-sm">{activeCategory.daysCount}</span>
                </div>
              </div>
            </div>

            {/* Days Horizontal Tab Selector */}
            {daysList.length > 0 && (
              <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar border-b border-stone-800/80 snap-x">
                {daysList.map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveDayIndex(idx)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 border snap-start shrink-0 ${
                      activeDayIndex === idx
                        ? 'bg-stone-800 text-stone-100 border-stone-600 shadow-md'
                        : 'bg-stone-950/60 text-stone-400 border-stone-800/80 hover:text-stone-200 hover:border-stone-700'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: activeDayIndex === idx ? currentThemeConfig.primaryHex : '#52525b'
                      }}
                    />
                    <span>{day.day}: {day.focus}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Exercises List for Selected Day */}
            {currentDay && (
              <div className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div>
                    <h4 className="text-lg font-black text-stone-100 flex items-center gap-2">
                      <Target className="w-4 h-4" style={{ color: currentThemeConfig.primaryHex }} />
                      <span>{currentDay.day} Protocol: {currentDay.focus}</span>
                    </h4>
                    {currentDay.coachingTip && (
                      <p className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
                        <span className="text-amber-400 font-bold">Coach's Cue:</span>
                        <span>{currentDay.coachingTip}</span>
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-950 border border-stone-800 text-stone-400 self-start sm:self-auto">
                    {(currentDay.exercises || []).length} Prescribed Exercises
                  </span>
                </div>

                {/* Grid of Exercises */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {(currentDay.exercises || []).map((exercise, eIdx) => (
                    <div
                      key={eIdx}
                      className="p-4 rounded-xl bg-stone-950/80 border border-stone-800/80 hover:border-stone-700 transition-colors flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-black"
                              style={{
                                backgroundColor: `${currentThemeConfig.primaryHex}20`,
                                color: currentThemeConfig.primaryHex
                              }}
                            >
                              {eIdx + 1}
                            </span>
                            <div>
                              <h5 className="font-bold text-stone-100 text-sm group-hover:text-white transition-colors">
                                {exercise.name}
                              </h5>
                              <span className="text-[11px] text-stone-400">
                                Target: <strong className="text-stone-300">{exercise.targetMuscle}</strong>
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-black px-2.5 py-1 rounded bg-stone-900 text-stone-200 border border-stone-800">
                            {exercise.sets} • {exercise.reps}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-stone-900/80 flex items-center justify-between text-[11px] text-stone-500 pl-8">
                        <span>Rest: 60-90s</span>
                        <span className="text-stone-400 font-medium">Controlled Eccentric</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Callout & Custom Plan CTA */}
                <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 text-left">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${currentThemeConfig.primaryHex}20`,
                        color: currentThemeConfig.primaryHex
                      }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-black text-stone-100 text-sm">Need a 100% personalized workout & meal split?</h5>
                      <p className="text-xs text-stone-400">
                        During your free 60-min trial, Coach will perform a full movement screen and design your exact routine.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => openTrialModal()}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black whitespace-nowrap shadow-lg flex items-center gap-2 ${currentThemeConfig.buttonClass}`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Get Your Custom Split</span>
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};

