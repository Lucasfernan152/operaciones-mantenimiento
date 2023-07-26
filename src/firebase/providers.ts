import { GoogleAuthProvider, signInWithPopup,  } from 'firebase/auth'
import { FirebaseAuth } from './config';


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