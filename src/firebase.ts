import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyB6O0WH0Fwwda4h9RdOuuC6hn9hFxo6xt0",
  authDomain: "gen-lang-client-0028772304.firebaseapp.com",
  projectId: "gen-lang-client-0028772304",
  storageBucket: "gen-lang-client-0028772304.firebasestorage.app",
  messagingSenderId: "649654780201",
  appId: "1:649654780201:web:9c956ec3ec252b30d2f738"
};

// Initialize Firebase app safely
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = async (): Promise<User> => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const signInAdminWithEmail = async (email: string, pass: string): Promise<User> => {
  const result = await signInWithEmailAndPassword(auth, email, pass);
  return result.user;
};

export const registerAdminWithEmail = async (email: string, pass: string): Promise<User> => {
  const result = await createUserWithEmailAndPassword(auth, email, pass);
  return result.user;
};

export const logOutAdmin = async (): Promise<void> => {
  await signOut(auth);
};
