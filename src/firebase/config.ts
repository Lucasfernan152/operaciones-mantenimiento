
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDIcNxaDTcLyg1pyPqRu1xAxtDnkI6vYnE",
  authDomain: "operaciones-y-mantenimie-71ced.firebaseapp.com",
  projectId: "operaciones-y-mantenimie-71ced",
  storageBucket: "operaciones-y-mantenimie-71ced.appspot.com",
  messagingSenderId: "1093766863963",
  appId: "1:1093766863963:web:14bafc3dbe761cef64f37e"
};


export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )
