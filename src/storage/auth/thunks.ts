import { logoutFirebase, signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice"

import { Storage } from '@ionic/storage'

// funciones para interactuar con el localStorage
const storage = new Storage();

async function initializeStorage() {
    await storage.create();
}

async function saveUserInLocalStorage(key: string, value: any) {
    await initializeStorage();
    await storage.set(key, value);
}

async function cleanAuthLocalStorage(key: string) {
    await initializeStorage();
    await storage.remove(key);
}



export const checkingAuthentication = (email:string , password: string ) => {
    return async (dispatch: any) => {

        dispatch( checkingCredentials() )

    }
}


export const signWithGoogle = () => {
    return async (dispatch: any) => {
        
        dispatch(checkingCredentials())

        const results = await signInWithGoogle()

        
        
        if(!results.ok) return dispatch(logout(results.errorMessage))

        

        dispatch(login(results))

        saveUserInLocalStorage('auth', results)
    }
}


export const startLogout = () => {
    return async(dispatch: any) => {
        
        await logoutFirebase()

        dispatch(logout(null))
        cleanAuthLocalStorage("auth")
    }
}