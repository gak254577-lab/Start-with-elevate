/**
 * Centralized Image Assets Registry
 *
 * All website images are managed from the centralized `/public/images/` directory
 * (also mirrored in `/assets/images/`).
 *
 * To change any image on the site, simply replace the corresponding image file in `/public/images/`
 * using the same filename, or update the image path mappings here.
 */

export const IMAGES = {
  // Trainer Profile & Main Sections
  trainerHero: '/images/hero-trainer.jpg',
  trainerAbout: '/images/about-trainer.jpg',

  // Service Offerings
  servicePersonalTraining: '/images/service-personal-training.jpg',
  serviceStrengthHypertrophy: '/images/service-strength-hypertrophy.jpg',
  serviceFatLoss: '/images/service-fat-loss.jpg',
  serviceNutrition: '/images/service-nutrition.jpg',
  serviceAthleticConditioning: '/images/service-athletic-conditioning.jpg',
  serviceRehabMobility: '/images/service-rehab-mobility.jpg',

  // Studio & Workout Gallery
  galleryStrengthFloor: '/images/gallery-strength-floor.jpg',
  galleryDumbbellConditioning: '/images/gallery-dumbbell-conditioning.jpg',
  galleryFunctionalCable: '/images/gallery-functional-cable.jpg',
  galleryCardioTurf: '/images/gallery-cardio-turf.jpg',
  galleryKettlebellTechnique: '/images/gallery-kettlebell-technique.jpg',
  galleryMobilityRecovery: '/images/gallery-mobility-recovery.jpg',

  // Client Transformations (Before / After)
  transformation1Before: '/images/transformation-1-before.jpg',
  transformation1After: '/images/transformation-1-after.jpg',
  transformation2Before: '/images/transformation-2-before.jpg',
  transformation2After: '/images/transformation-2-after.jpg',
  transformation3Before: '/images/transformation-3-before.jpg',
  transformation3After: '/images/transformation-3-after.jpg',
} as const;

/**
 * Centralized Logo Assets Registry
 * 
 * All website logos are managed from the dedicated `/public/logo/` folder.
 * Replacing any file in `/public/logo/` with the same filename will automatically
 * update the logo everywhere across the site.
 */
export const LOGOS = {
  main: '/logo/logo.svg',
  full: '/logo/logo-full.svg',
  icon: '/logo/logo-icon.svg',
  waveFitness: '/logo/wave-fitness-logo.svg',
  favicon: '/logo/favicon.svg',
} as const;

export type ImageKey = keyof typeof IMAGES;
export type LogoKey = keyof typeof LOGOS;
export default IMAGES;
