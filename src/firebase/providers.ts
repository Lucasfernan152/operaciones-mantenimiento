import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth, FirebaseDB } from "./config";
import { doc, setDoc } from "firebase/firestore";
import { RegisterUser, User } from "../storage/auth/interfaces/User.interface";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const credentials = GoogleAuthProvider.credentialFromResult(result);

    const { email, displayName, uid, photoURL } = result.user;

    return {
      ok: true,
      email,
      displayName,
      uid,
      photoURL,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: "Usuario incorrecto",
    };
  }
};

export const logoutFirebase = async () => await FirebaseAuth.signOut();

export const loginFirebase = async (email: any, password: any) => {
  const { user } = await signInWithEmailAndPassword(
    FirebaseAuth,
    email,
    password
  );

  const { uid } = user;

  console.log(user);
};

export const createElement = async () => {
  const id = new Date().getTime().toString();
  await setDoc(doc(FirebaseDB, "Reconectadores", id), {
    id: id,
    local: true,
    deleted: false,
    nombre: "Elemento1",
  });
};

export const loginWithEmailPassword = async (email: any, password: any) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      errorMessage: "",
      email,
    };
  } catch (error) {
    return { ok: false, errorMessage: "Email o contraseña incorrecta" };
  }
};

export const registerWhitEmailPassword = async (user:RegisterUser) => {

  const {email, password, displayName} = user

  const {currentUser} = getAuth();

  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email!,
      password
    );
    console.log(resp)

    updateProfile(currentUser!, {displayName} )

    const { uid, photoURL } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: "Error",
    };
  }
};
