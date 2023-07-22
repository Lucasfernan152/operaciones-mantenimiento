import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

    try {
        console.log('SignIn With Google')
        const result = await signInWithPopup( FirebaseAuth, googleProvider )
        const credentials = GoogleAuthProvider.credentialFromResult( result )

    } catch (error) {
        
    }
}