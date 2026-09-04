export type ThemeId = 'yellow' | 'volt' | 'crimson' | 'gold' | 'cyan' | 'sunset';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  badge: string;
  primaryHex: string;
  primaryClass: string;
  bgGlowClass: string;
  textClass: string;
  borderClass: string;
  badgeClass: string;
  buttonClass: string;
}

export interface TransformationComparison {
  id: string;
  name: string;
  age: number;
  durationWeeks: number;
  beforeWeight: string;
  afterWeight: string;
  fatLoss: string;
  muscleGain: string;
  program: string;
  beforeImage: string;
  afterImage: string;
  quote: string;
  routineHighlight: string;
}

export interface WorkoutSplit {
  day: string;
  focus: string;
  exercises: { name: string; sets: string; reps: string; targetMuscle: string }[];
  coachingTip: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  badgeText?: string;
  description: string;
}

export interface PhilosophyPillar {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ServiceOffering {
  id: string;
  title: string;
  category: 'personal' | 'weight-loss' | 'strength' | 'nutrition' | 'group' | 'online';
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  duration: string;
  intensity: 'All Levels' | 'Intermediate' | 'Advanced' | 'Custom';
  suitableFor: string;
  image: string;
  featured?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  discountedPrice: number;
  actualPrice?: number;
  priceUSD: number;
  period: string; // e.g. "per month", "per 3 months", "per session"
  isPopular?: boolean;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  profession: string;
  age?: number;
  duration: string;
  achievement: string; // e.g., "-14kg Fat Lost", "+5kg Lean Muscle"
  quote: string;
  avatar: string;
  rating: number;
  verified: boolean;
  program: string;
  beforeImage?: string;
  afterImage?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'strength' | 'transformation' | 'hiit' | 'facility' | 'coaching';
  imageUrl: string;
  caption: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface TrainerProfile {
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  gymName: string;
  yearsOfExperience: number;
  clientsTransformed: number;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  phone: string;
  formattedPhone: string;
  email: string;
  instagramHandle: string;
  instagramUrl: string;
  youtubeUrl: string;
  facebookUrl?: string;
  whatsappNumber: string; // international digits without + e.g. "919876543210"
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  googleMapEmbedUrl: string;
  googleMapDirectionsUrl: string;
  bioParagraphs: string[];
  specialties: string[];
  trainerHeroImage: string;
  trainerAboutImage: string;
  accentColor: 'amber' | 'emerald' | 'orange' | 'cyan' | 'red';
}

export interface TrialBookingRequest {
  fullName: string;
  email: string;
  phone: string;
  fitnessGoal: string;
  experienceLevel: string;
  preferredDate: string;
  preferredTimeSlot: string;
  planId?: string;
  notes?: string;
}

export interface TrialPass {
  passId: string;
  fullName: string;
  email: string;
  phone: string;
  fitnessGoal: string;
  date: string;
  timeSlot: string;
  gymName: string;
  trainerName: string;
  address: string;
  createdAt: string;
}
