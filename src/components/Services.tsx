import React, { useState } from 'react';
import { useTrainer } from '../context/TrainerContext';
import {
  Dumbbell,
  Flame,
  Zap,
  Salad,
  Users,
  Smartphone,
  Check,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ServiceOffering } from '../types';

export const Services: React.FC = () => {
  const { services, openTrialModal, currentThemeConfig } = useTrainer();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalService, setActiveModalService] = useState<ServiceOffering | null>(null);

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'personal', label: '1-on-1 Training' },
    { id: 'weight-loss', label: 'Fat Loss & Recomp' },
    { id: 'strength', label: 'Strength & Muscle' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'group', label: 'Small Group' },
    { id: 'online', label: 'Online Remote' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter((s) => s.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'personal':
        return <Dumbbell className="w-5 h-5" style={{ color: currentThemeConfig.primaryHex }} />;
      case 'weight-loss':
        return <Flame className="w-5 h-5" style={{ color: currentThemeConfig.primaryHex }} />;
      case 'strength':
        return <Zap className="w-5 h-5" style={{ color: currentThemeConfig.primaryHex }} />;
      case 'nutrition':
        return <Salad className="w-5 h-5" style={{ color: currentThemeConfig.primaryHex }} />;
      case 'group':
        return <Users className="w-5 h-5" style={{ color: currentThemeConfig.primaryHex }} />;
      case 'online':
        return <Smartphone className="w-5 h-5" style={{ color: currentThemeConfig.primaryHex }} />;
      default:
        return <Dumbbell className="w-5 h-5" style={{ color: currentThemeConfig.primaryHex }} />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-stone-950 border-b border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
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
            <span>Training Programs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-100 tracking-tight">
            Specialized Coaching Built For Results
          </h2>
          <p className="text-stone-400 text-base sm:text-lg">
            Choose the coaching format that fits your lifestyle. Every service includes form mastery, dedicated progressive planning, and habit support.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? `${currentThemeConfig.buttonClass} shadow-md`
                  : 'bg-stone-900/90 text-stone-400 hover:text-stone-100 hover:bg-stone-800 border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl bg-stone-900/70 border border-stone-800 hover:border-stone-700 transition-all flex flex-col overflow-hidden group shadow-xl"
            >
              {/* Image preview with intensity & duration badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                
                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="p-2 rounded-lg bg-stone-950/80 backdrop-blur-sm border border-stone-800">
                    {getCategoryIcon(service.category)}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-stone-950/90 backdrop-blur-sm text-stone-300 border border-stone-800">
                      {service.intensity}
                    </span>
                    {service.featured && (
                      <span
                        className="text-[11px] font-black px-2.5 py-1 rounded-full text-stone-950 shadow-sm"
                        style={{ backgroundColor: currentThemeConfig.primaryHex }}
                      >
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Duration bottom-right tag */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] font-medium text-stone-300 bg-stone-950/90 px-2.5 py-1 rounded-lg border border-stone-800/80 backdrop-blur-sm">
                  <Clock className="w-3 h-3" style={{ color: currentThemeConfig.primaryHex }} />
                  <span>{service.duration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5 text-left">
                <div>
                  <h3 className="text-xl font-bold text-stone-100 group-hover:text-white transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm text-stone-400 mt-2 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="mt-4 pt-4 border-t border-stone-800/80 space-y-2">
                    {(service.highlights || []).slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                        <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: currentThemeConfig.primaryHex }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => openTrialModal(service.id)}
                    className={`flex-1 py-2.5 px-4 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-all ${currentThemeConfig.buttonClass}`}
                  >
                    <span>Book Trial Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold rounded-xl transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Details Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={activeModalService.image}
                alt={activeModalService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/50" />
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-950/70 text-stone-200 hover:text-white hover:bg-stone-900 transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-3 left-4 right-4">
                <span className={`text-xs font-bold uppercase tracking-wider block ${currentThemeConfig.textClass}`}>
                  Training Service
                </span>
                <h3 className="text-xl font-bold text-white leading-tight">{activeModalService.title}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-stone-300 leading-relaxed">{activeModalService.fullDescription}</p>
              
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-400">Duration:</span>
                  <span className="font-semibold text-stone-200">{activeModalService.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Intensity Level:</span>
                  <span className="font-semibold" style={{ color: currentThemeConfig.primaryHex }}>
                    {activeModalService.intensity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Ideal For:</span>
                  <span className="font-semibold text-stone-200 text-right max-w-[240px] truncate">{activeModalService.suitableFor}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">What is Included:</h4>
                <div className="space-y-1.5">
                  {(activeModalService.highlights || []).map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-300">
                      <Check className="w-3.5 h-3.5 shrink-0" style={{ color: currentThemeConfig.primaryHex }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => {
                    const sid = activeModalService.id;
                    setActiveModalService(null);
                    openTrialModal(sid);
                  }}
                  className={`w-full py-3 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg text-sm transition-all ${currentThemeConfig.buttonClass}`}
                >
                  <span>Book Free Trial for This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
