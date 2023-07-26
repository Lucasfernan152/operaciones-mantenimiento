import { logoutFirebase, signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice"
import react from '@vitejs/plugin-react';

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
    }
}


export const startLogout = () => {
    return async(dispatch: any) => {
        
        await logoutFirebase()

        dispatch(logout(null))
        
    }
}