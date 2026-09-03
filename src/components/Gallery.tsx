import React, { useState } from 'react';
import { useTrainer } from '../context/TrainerContext';
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export const Gallery: React.FC = () => {
  const { gallery, profile, currentThemeConfig } = useTrainer();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'strength', label: 'Strength & Lifting' },
    { id: 'hiit', label: 'HIIT & Conditioning' },
    { id: 'coaching', label: '1-on-1 Coaching' },
    { id: 'facility', label: 'Gym Facility' },
    { id: 'transformation', label: 'Milestones' },
  ];

  const filteredGallery = activeCategory === 'all'
    ? gallery
    : gallery.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredGallery.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-stone-900/60 border-b border-stone-800/80 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-10">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border"
            style={{
              backgroundColor: `${currentThemeConfig.primaryHex}15`,
              borderColor: `${currentThemeConfig.primaryHex}40`,
              color: currentThemeConfig.primaryHex
            }}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Facility & High-Performance Floor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-100 tracking-tight">
            Inside the Training Ground
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Explore high-performance strength equipment, coaching moments, and training spaces at {profile.gymName}.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition-all border ${
                  isActive
                    ? 'text-stone-950 shadow-lg'
                    : 'bg-stone-950 text-stone-400 hover:text-stone-100 hover:bg-stone-800 border-stone-800'
                }`}
                style={{
                  backgroundColor: isActive ? currentThemeConfig.primaryHex : undefined,
                  borderColor: isActive ? currentThemeConfig.primaryHex : undefined
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 cursor-pointer aspect-[4/3] shadow-xl hover:border-stone-600 transition-all"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              />
              
              {/* Overlay with info */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                <div className="flex justify-end">
                  <span
                    className="p-2 rounded-full bg-stone-950/80 backdrop-blur-sm"
                    style={{ color: currentThemeConfig.primaryHex }}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <span
                    className="text-[11px] font-black uppercase tracking-wider block mb-1"
                    style={{ color: currentThemeConfig.primaryHex }}
                  >
                    {item.category}
                  </span>
                  <h4 className="text-base font-bold text-white leading-tight mb-1">{item.title}</h4>
                  <p className="text-xs text-stone-300 line-clamp-2">{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && filteredGallery[selectedPhotoIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/95 backdrop-blur-lg">
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-3 rounded-full bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 text-stone-200 hover:text-white hover:bg-stone-800 transition-colors z-50 hidden sm:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 text-stone-200 hover:text-white hover:bg-stone-800 transition-colors z-50 hidden sm:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="relative aspect-[16/10] bg-stone-950 flex items-center justify-center">
              <img
                src={filteredGallery[selectedPhotoIndex].imageUrl}
                alt={filteredGallery[selectedPhotoIndex].title}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="p-6 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
              <div>
                <span
                  className="text-xs font-black uppercase tracking-wider"
                  style={{ color: currentThemeConfig.primaryHex }}
                >
                  {filteredGallery[selectedPhotoIndex].category} • Photo {selectedPhotoIndex + 1} of {filteredGallery.length}
                </span>
                <h3 className="text-lg font-bold text-stone-100">{filteredGallery[selectedPhotoIndex].title}</h3>
                <p className="text-xs text-stone-400 mt-1">{filteredGallery[selectedPhotoIndex].caption}</p>
              </div>

              <div className="flex sm:hidden gap-2">
                <button onClick={prevPhoto} className="p-2 bg-stone-900 rounded-lg text-stone-200">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextPhoto} className="p-2 bg-stone-900 rounded-lg text-stone-200">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
