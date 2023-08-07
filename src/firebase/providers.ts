import { GoogleAuthProvider, signInWithPopup,  } from 'firebase/auth'
import { FirebaseAuth, FirebaseDB } from './config';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

    try {

        const result = await signInWithPopup( FirebaseAuth, googleProvider )
        const credentials = GoogleAuthProvider.credentialFromResult(result)
        
        const { email, displayName, uid, photoURL } = result.user
        
        return {
            ok: true,
            email, displayName, uid, photoURL,
        }

    } catch (error) {

        return { 
            ok: false,
            errorMessage: 'Usuario incorrecto'
        }
    }
}

export const logoutFirebase = async() => await FirebaseAuth.signOut();




export const createElement = async () => { 
    const id = new Date().getTime().toString();
    await setDoc(doc(FirebaseDB, "Reconectadores", id), {
        id: id,
        local: true,
        deleted: false,
        nombre: "Elemento1"
    })
}