import { signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials } from "./authSlice"

export const checkingAuthentication = (email:string , password: string ) => {
    return async (dispatch: any) => {

        dispatch( checkingCredentials() )

    }
}


export const singWithGoogle = () => {
    return async (dispatch: any) => {
        console.log('ejecutando')
        const results = await signInWithGoogle()
        console.log(results)
    }
}