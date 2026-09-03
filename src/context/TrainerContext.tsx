import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TrainerProfile,
  Certification,
  PhilosophyPillar,
  ServiceOffering,
  PricingPlan,
  Testimonial,
  GalleryItem,
  FAQItem,
  TrialPass,
  ThemeId,
  ThemeConfig,
  TransformationComparison,
  WorkoutSplit,
} from '../types';
import {
  DEFAULT_TRAINER_PROFILE,
  DEFAULT_CERTIFICATIONS,
  DEFAULT_PHILOSOPHY_PILLARS,
  DEFAULT_SERVICES,
  DEFAULT_PRICING_PLANS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_GALLERY,
  DEFAULT_FAQS,
  DEFAULT_THEMES,
  DEFAULT_TRANSFORMATIONS,
  DEFAULT_WORKOUT_SPLITS,
} from '../data/defaultTrainer';
import {
  addReviewToFirestore,
  addTransformationToFirestore,
  addGalleryPhotoToFirestore,
  subscribeToCloudReviews,
  subscribeToCloudTransformations,
  subscribeToCloudGallery,
} from '../lib/firebaseService';

export type CurrencyType = 'INR' | 'USD' | 'EUR' | 'GBP';

interface TrainerContextType {
  profile: TrainerProfile;
  certifications: Certification[];
  pillars: PhilosophyPillar[];
  services: ServiceOffering[];
  pricingPlans: PricingPlan[];
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Testimonial) => Promise<void>;
  gallery: GalleryItem[];
  addGalleryPhoto: (photo: GalleryItem) => Promise<void>;
  faqs: FAQItem[];
  transformations: TransformationComparison[];
  addTransformation: (transformation: TransformationComparison) => Promise<void>;
  workoutSplits: Record<string, WorkoutSplit[]>;
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  currentThemeConfig: ThemeConfig;
  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  formatPrice: (priceINR: number, priceUSD: number) => string;
  isTrialModalOpen: boolean;
  selectedPlanForTrial: string | null;
  openTrialModal: (planId?: string) => void;
  closeTrialModal: () => void;
  isConfigModalOpen: boolean;
  openConfigModal: () => void;
  closeConfigModal: () => void;
  isBMICalculatorOpen: boolean;
  openBMICalculator: () => void;
  closeBMICalculator: () => void;
  activePass: TrialPass | null;
  setActivePass: (pass: TrialPass | null) => void;
  savedPasses: TrialPass[];
  saveTrialPass: (pass: TrialPass) => void;
  updateProfile: (updated: Partial<TrainerProfile>) => void;
  resetAllDefaults: () => void;
}

const TrainerContext = createContext<TrainerContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'apex_gym_trainer_profile_v15';
const LOCAL_STORAGE_PASSES_KEY = 'apex_gym_trainer_passes_v15';
const LOCAL_STORAGE_CURRENCY_KEY = 'apex_gym_currency_v15';
const LOCAL_STORAGE_THEME_KEY = 'apex_gym_theme_yellow_v15';
const LOCAL_STORAGE_TESTIMONIALS_KEY = 'apex_gym_testimonials_cleared_v15';
const LOCAL_STORAGE_TRANSFORMATIONS_KEY = 'apex_gym_transformations_v15';
const LOCAL_STORAGE_GALLERY_KEY = 'apex_gym_gallery_v15';

export const TrainerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<TrainerProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY) || localStorage.getItem('apex_gym_trainer_profile_v14') || localStorage.getItem('apex_gym_trainer_profile_v13') || localStorage.getItem('apex_gym_trainer_profile_v12');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Sanitize legacy phone number if present
        if (parsed.phone?.includes('96673') || parsed.formattedPhone?.includes('96673') || parsed.whatsappNumber?.includes('96673')) {
          parsed.phone = '+91 92207 57773';
          parsed.formattedPhone = '+91 92207 57773';
          parsed.whatsappNumber = '919220757773';
        }
        if (parsed.openingHours) {
          if (!parsed.openingHours.sunday || parsed.openingHours.sunday.includes('7:00') || parsed.openingHours.sunday.includes('appointment')) {
            parsed.openingHours.sunday = 'CLOSED';
          }
        }
        if (parsed.name === 'Subham Singh' || parsed.name === 'Shubham Singh' || parsed.name === 'Subham' || parsed.name === 'Start the Elevate') {
          parsed.name = 'START WITH ELEVATE';
        }
        if (parsed.gymName === 'Wave Fitness' || !parsed.gymName) {
          parsed.gymName = 'Shubham Singh';
        }
        if (!parsed.instagramUrl || parsed.instagramUrl.includes('_shub__singh_')) {
          parsed.instagramUrl = 'https://www.instagram.com/start_with_elevate_77';
          parsed.instagramHandle = '@start_with_elevate_77';
        }
        if (!parsed.youtubeUrl || parsed.youtubeUrl === 'https://youtube.com') {
          parsed.youtubeUrl = 'https://www.youtube.com/@STARTWITHELEVATE77';
        }
        if (parsed.facebookUrl) {
          delete parsed.facebookUrl;
        }
        if (!parsed.trainerHeroImage || parsed.trainerHeroImage.includes('unsplash.com')) {
          parsed.trainerHeroImage = DEFAULT_TRAINER_PROFILE.trainerHeroImage;
        }
        if (!parsed.trainerAboutImage || parsed.trainerAboutImage.includes('unsplash.com')) {
          parsed.trainerAboutImage = DEFAULT_TRAINER_PROFILE.trainerAboutImage;
        }
        return { ...DEFAULT_TRAINER_PROFILE, ...parsed };
      }
    } catch {
      // fallback
    }
    return DEFAULT_TRAINER_PROFILE;
  });

  const [transformations, setTransformations] = useState<TransformationComparison[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_TRANSFORMATIONS_KEY) || localStorage.getItem('apex_gym_transformations_v14');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((t, idx) => {
            const def = DEFAULT_TRANSFORMATIONS[idx];
            if (def && (t.beforeImage?.includes('unsplash.com') || t.afterImage?.includes('unsplash.com'))) {
              return { ...t, beforeImage: def.beforeImage, afterImage: def.afterImage };
            }
            return t;
          });
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_TRANSFORMATIONS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_TESTIMONIALS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Filter out legacy mock data if any
        return Array.isArray(parsed) ? parsed.filter(t => !['test-1', 'test-2', 'test-3'].includes(t.id)) : [];
      }
    } catch {
      // fallback
    }
    return DEFAULT_TESTIMONIALS; // empty array []
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_GALLERY_KEY) || localStorage.getItem('apex_gym_gallery_v14');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((g, idx) => {
            const def = DEFAULT_GALLERY[idx];
            if (def && g.imageUrl?.includes('unsplash.com')) {
              return { ...g, imageUrl: def.imageUrl };
            }
            return g;
          });
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_GALLERY;
  });

  const [theme, setThemeState] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as ThemeId;
      if (saved && DEFAULT_THEMES[saved]) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'yellow';
  });

  const [currency, setCurrencyState] = useState<CurrencyType>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CURRENCY_KEY) as CurrencyType;
      if (saved && ['INR', 'USD', 'EUR', 'GBP'].includes(saved)) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'INR';
  });

  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [selectedPlanForTrial, setSelectedPlanForTrial] = useState<string | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isBMICalculatorOpen, setIsBMICalculatorOpen] = useState(false);
  const [activePass, setActivePass] = useState<TrialPass | null>(null);

  const [savedPasses, setSavedPasses] = useState<TrialPass[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PASSES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  });

  // Connect Firebase Real-time Synchronization on Mount
  useEffect(() => {
    // 1. Live Reviews listener
    const unsubReviews = subscribeToCloudReviews((cloudReviews) => {
      // Filter out any legacy IDs
      const cleanReviews = cloudReviews.filter(r => !['test-1', 'test-2', 'test-3'].includes(r.id));
      setTestimonials(cleanReviews);
      setProfile((prev) => ({
        ...prev,
        reviewCount: cleanReviews.length,
      }));
    });

    // 2. Live Transformations listener
    const unsubTrans = subscribeToCloudTransformations((cloudTrans) => {
      if (cloudTrans.length > 0) {
        setTransformations((prev) => {
          const cloudIds = new Set(cloudTrans.map((t) => t.id));
          const existingNonCloud = prev.filter((p) => !cloudIds.has(p.id) && !p.id.startsWith('cloud-'));
          return [...cloudTrans, ...existingNonCloud];
        });
      }
    });

    // 3. Live Gallery listener
    const unsubGallery = subscribeToCloudGallery((cloudGallery) => {
      if (cloudGallery.length > 0) {
        setGallery((prev) => {
          const cloudIds = new Set(cloudGallery.map((g) => g.id));
          const existingNonCloud = prev.filter((p) => !cloudIds.has(p.id) && !p.id.startsWith('cloud-'));
          return [...cloudGallery, ...existingNonCloud];
        });
      }
    });

    return () => {
      unsubReviews();
      unsubTrans();
      unsubGallery();
    };
  }, []);

  // Local Storage Backups
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to persist trainer profile', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    } catch (e) {
      console.error('Failed to persist theme', e);
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CURRENCY_KEY, currency);
    } catch (e) {
      console.error('Failed to persist currency', e);
    }
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PASSES_KEY, JSON.stringify(savedPasses));
    } catch (e) {
      console.error('Failed to persist passes', e);
    }
  }, [savedPasses]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_TESTIMONIALS_KEY, JSON.stringify(testimonials));
    } catch (e) {
      console.error('Failed to persist testimonials', e);
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_TRANSFORMATIONS_KEY, JSON.stringify(transformations));
    } catch (e) {
      console.error('Failed to persist transformations', e);
    }
  }, [transformations]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_GALLERY_KEY, JSON.stringify(gallery));
    } catch (e) {
      console.error('Failed to persist gallery', e);
    }
  }, [gallery]);

  const addTestimonial = async (testimonial: Testimonial) => {
    // 1. Immediate local state update for instant UI feedback
    setTestimonials((prev) => [testimonial, ...prev]);
    setProfile((prev) => ({
      ...prev,
      reviewCount: (prev.reviewCount || 0) + 1,
    }));

    // 2. Persist to Firebase Cloud Firestore for global visibility across all devices
    await addReviewToFirestore(testimonial);
  };

  const addTransformation = async (transformation: TransformationComparison) => {
    // 1. Immediate local update
    setTransformations((prev) => [transformation, ...prev]);
    setProfile((prev) => ({
      ...prev,
      clientsTransformed: (prev.clientsTransformed || 0) + 1,
    }));

    // 2. Persist to Firebase Cloud Firestore
    await addTransformationToFirestore(transformation);
  };

  const addGalleryPhoto = async (photo: GalleryItem) => {
    setGallery((prev) => [photo, ...prev]);
    await addGalleryPhotoToFirestore(photo);
  };

  const setTheme = (t: ThemeId) => {
    setThemeState(t);
  };

  const setCurrency = (c: CurrencyType) => {
    setCurrencyState(c);
  };

  const currentThemeConfig = DEFAULT_THEMES[theme] || DEFAULT_THEMES.volt;

  const formatPrice = (priceINR: number, priceUSD: number): string => {
    switch (currency) {
      case 'INR':
        return `₹${priceINR.toLocaleString('en-IN')}`;
      case 'USD':
        return `$${priceUSD.toLocaleString('en-US')}`;
      case 'EUR':
        return `€${Math.round(priceUSD * 0.92).toLocaleString('en-EU')}`;
      case 'GBP':
        return `£${Math.round(priceUSD * 0.79).toLocaleString('en-GB')}`;
      default:
        return `₹${priceINR.toLocaleString('en-IN')}`;
    }
  };

  const openTrialModal = (planId?: string) => {
    setSelectedPlanForTrial(planId || null);
    setIsTrialModalOpen(true);
  };

  const closeTrialModal = () => {
    setIsTrialModalOpen(false);
    setSelectedPlanForTrial(null);
  };

  const openConfigModal = () => setIsConfigModalOpen(true);
  const closeConfigModal = () => setIsConfigModalOpen(false);

  const openBMICalculator = () => setIsBMICalculatorOpen(true);
  const closeBMICalculator = () => setIsBMICalculatorOpen(false);

  const saveTrialPass = (pass: TrialPass) => {
    setSavedPasses((prev) => [pass, ...prev]);
    setActivePass(pass);
  };

  const updateProfile = (updated: Partial<TrainerProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const resetAllDefaults = () => {
    setProfile(DEFAULT_TRAINER_PROFILE);
    setTestimonials(DEFAULT_TESTIMONIALS);
    setTransformations(DEFAULT_TRANSFORMATIONS);
    setGallery(DEFAULT_GALLERY);
    setThemeState('yellow');
    setCurrencyState('INR');
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_CURRENCY_KEY);
    localStorage.removeItem(LOCAL_STORAGE_THEME_KEY);
    localStorage.removeItem(LOCAL_STORAGE_TESTIMONIALS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_TRANSFORMATIONS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_GALLERY_KEY);
  };

  return (
    <TrainerContext.Provider
      value={{
        profile,
        certifications: DEFAULT_CERTIFICATIONS,
        pillars: DEFAULT_PHILOSOPHY_PILLARS,
        services: DEFAULT_SERVICES,
        pricingPlans: DEFAULT_PRICING_PLANS,
        testimonials,
        addTestimonial,
        gallery,
        addGalleryPhoto,
        faqs: DEFAULT_FAQS,
        transformations,
        addTransformation,
        workoutSplits: DEFAULT_WORKOUT_SPLITS,
        theme,
        setTheme,
        currentThemeConfig,
        currency,
        setCurrency,
        formatPrice,
        isTrialModalOpen,
        selectedPlanForTrial,
        openTrialModal,
        closeTrialModal,
        isConfigModalOpen,
        openConfigModal,
        closeConfigModal,
        isBMICalculatorOpen,
        openBMICalculator,
        closeBMICalculator,
        activePass,
        setActivePass,
        savedPasses,
        saveTrialPass,
        updateProfile,
        resetAllDefaults,
      }}
    >
      {children}
    </TrainerContext.Provider>
  );
};

export const useTrainer = () => {
  const context = useContext(TrainerContext);
  if (!context) {
    throw new Error('useTrainer must be used within a TrainerProvider');
  }
  return context;
};
