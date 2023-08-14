import { loginWithEmailPassword, logoutFirebase, registerWhitEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice"

import { Storage } from '@ionic/storage'
import { RegisterUser } from "./interfaces/User.interface";

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


export const startLogout = () => {
    return async(dispatch: any) => {
        
        await logoutFirebase()

        dispatch(logout(null))
        cleanAuthLocalStorage("auth")
    }
}

export const startLoginWithEmailPassword = ( email:any, password:any ) =>{
    return async( dispatch: any ) =>{

        dispatch( checkingCredentials() );   

        const resp = await loginWithEmailPassword( email, password);

        if( !resp.ok ) return dispatch(logout( resp.errorMessage));
        console.log(resp)
        dispatch(login(resp));

        saveUserInLocalStorage('auth', resp);
    }
} 


export const startRegisterWithEmailPassword = (user:RegisterUser)=>{
    return async( dispatch:any ) => {
        
        dispatch(checkingCredentials());

        const resp = await registerWhitEmailPassword(user)
        console.log()

        if( !resp.ok ) return dispatch(logout( resp.errorMessage));
        dispatch(login(resp));

        saveUserInLocalStorage('auth', resp);
    }
}