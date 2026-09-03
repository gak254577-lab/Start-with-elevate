import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { Testimonial, TransformationComparison, GalleryItem } from '../types';

/**
 * Service to handle Cloud Firestore data persistence & real-time sync
 */

// Helper to safely serialize items for Firestore
export const addReviewToFirestore = async (testimonial: Testimonial) => {
  try {
    const reviewsRef = collection(db, 'reviews');
    const docData = {
      clientName: testimonial.clientName,
      profession: testimonial.profession || 'Gym Member',
      duration: testimonial.duration || '12 Weeks',
      achievement: testimonial.achievement || '',
      quote: testimonial.quote,
      avatar: testimonial.avatar || '',
      rating: testimonial.rating || 5,
      verified: testimonial.verified ?? true,
      program: testimonial.program || 'Personal Training',
      beforeImage: testimonial.beforeImage || null,
      afterImage: testimonial.afterImage || null,
      createdAt: serverTimestamp(),
    };
    const res = await addDoc(reviewsRef, docData);
    return res.id;
  } catch (err) {
    console.warn('Firestore addReview error (fallback to local):', err);
    return null;
  }
};

export const addTransformationToFirestore = async (transformation: TransformationComparison) => {
  try {
    const transRef = collection(db, 'transformations');
    const docData = {
      name: transformation.name,
      age: transformation.age || 28,
      durationWeeks: transformation.durationWeeks || 12,
      beforeWeight: transformation.beforeWeight || '',
      afterWeight: transformation.afterWeight || '',
      fatLoss: transformation.fatLoss || '',
      muscleGain: transformation.muscleGain || '',
      program: transformation.program || 'Custom Coaching',
      beforeImage: transformation.beforeImage,
      afterImage: transformation.afterImage,
      quote: transformation.quote || '',
      routineHighlight: transformation.routineHighlight || '',
      createdAt: serverTimestamp(),
    };
    const res = await addDoc(transRef, docData);
    return res.id;
  } catch (err) {
    console.warn('Firestore addTransformation error (fallback to local):', err);
    return null;
  }
};

export const addGalleryPhotoToFirestore = async (photo: GalleryItem) => {
  try {
    const galleryRef = collection(db, 'gallery');
    const docData = {
      title: photo.title,
      category: photo.category,
      imageUrl: photo.imageUrl,
      caption: photo.caption || '',
      uploadedBy: 'Member / Coach',
      createdAt: serverTimestamp(),
    };
    const res = await addDoc(galleryRef, docData);
    return res.id;
  } catch (err) {
    console.warn('Firestore addGalleryPhoto error (fallback to local):', err);
    return null;
  }
};

// Real-time synchronization hooks
export const subscribeToCloudReviews = (callback: (reviews: Testimonial[]) => void) => {
  try {
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const liveList: Testimonial[] = [];
      snapshot.forEach((docSnap) => {
        const d = docSnap.data();
        liveList.push({
          id: docSnap.id,
          clientName: d.clientName || 'Anonymous',
          profession: d.profession || 'Gym Member',
          duration: d.duration || '12 Weeks',
          achievement: d.achievement || '',
          quote: d.quote || '',
          avatar: d.avatar || '',
          rating: Number(d.rating) || 5,
          verified: d.verified ?? true,
          program: d.program || 'Personal Coaching',
          beforeImage: d.beforeImage || undefined,
          afterImage: d.afterImage || undefined,
        });
      });
      callback(liveList);
    }, (error) => {
      console.warn('Live reviews snapshot listener warning:', error);
    });
  } catch (err) {
    console.warn('Failed to subscribe to cloud reviews:', err);
    return () => {};
  }
};

export const subscribeToCloudTransformations = (callback: (trans: TransformationComparison[]) => void) => {
  try {
    const transRef = collection(db, 'transformations');
    const q = query(transRef, orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const liveList: TransformationComparison[] = [];
      snapshot.forEach((docSnap) => {
        const d = docSnap.data();
        liveList.push({
          id: docSnap.id,
          name: d.name || 'Member',
          age: Number(d.age) || 28,
          durationWeeks: Number(d.durationWeeks) || 12,
          beforeWeight: d.beforeWeight || '',
          afterWeight: d.afterWeight || '',
          fatLoss: d.fatLoss || '',
          muscleGain: d.muscleGain || '',
          program: d.program || 'Custom Coaching',
          beforeImage: d.beforeImage || '',
          afterImage: d.afterImage || '',
          quote: d.quote || '',
          routineHighlight: d.routineHighlight || '',
        });
      });
      callback(liveList);
    }, (error) => {
      console.warn('Live transformations snapshot listener warning:', error);
    });
  } catch (err) {
    console.warn('Failed to subscribe to cloud transformations:', err);
    return () => {};
  }
};

export const subscribeToCloudGallery = (callback: (items: GalleryItem[]) => void) => {
  try {
    const galleryRef = collection(db, 'gallery');
    const q = query(galleryRef, orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const liveList: GalleryItem[] = [];
      snapshot.forEach((docSnap) => {
        const d = docSnap.data();
        liveList.push({
          id: docSnap.id,
          title: d.title || 'Workout Showcase',
          category: (d.category as any) || 'strength',
          imageUrl: d.imageUrl || '',
          caption: d.caption || '',
        });
      });
      callback(liveList);
    }, (error) => {
      console.warn('Live gallery snapshot listener warning:', error);
    });
  } catch (err) {
    console.warn('Failed to subscribe to cloud gallery:', err);
    return () => {};
  }
};
