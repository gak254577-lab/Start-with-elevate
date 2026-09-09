// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCuoAxfXtEP_nmIKFkN0AIanbTIv7pKS5s",
  authDomain: "start-with-elevate.firebaseapp.com",
  projectId: "start-with-elevate",
  storageBucket: "start-with-elevate.firebasestorage.app",
  messagingSenderId: "379298906250",
  appId: "1:379298906250:web:c150d006223a4f80736d73",
  measurementId: "G-FT16L5L155"
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
