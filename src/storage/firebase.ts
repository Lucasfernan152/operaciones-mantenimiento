import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDIcNxaDTcLyg1pyPqRu1xAxtDnkI6vYnE",
  authDomain: "operaciones-y-mantenimie-71ced.firebaseapp.com",
  projectId: "operaciones-y-mantenimie-71ced",
  storageBucket: "operaciones-y-mantenimie-71ced.appspot.com",
  messagingSenderId: "1093766863963",
  appId: "1:1093766863963:web:14bafc3dbe761cef64f37e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);