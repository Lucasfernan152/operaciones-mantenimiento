
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDFamZwuYurg0OiJqnQejfHj01R8YSocA8",
  authDomain: "pruebas-firebase-28cfc.firebaseapp.com",
  projectId: "pruebas-firebase-28cfc",
  storageBucket: "pruebas-firebase-28cfc.appspot.com",
  messagingSenderId: "461492718345",
  appId: "1:461492718345:web:f2d695c1ee32adee0761d8"
};


export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )