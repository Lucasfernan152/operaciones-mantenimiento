import { Storage } from '@ionic/storage'

import { useAppDispatch, useAppSelector } from './store.hooks';
import { login, logout } from '../storage/auth';


export const useLocalStorage = () => {

    const dispatch = useAppDispatch();
    

    const setUserInAuthSlice = async() => {
        const storage = new Storage()
        storage.create();
        const valor = await storage.get("auth");

        (valor) ? dispatch(login(valor))
                : dispatch(logout(null))
    }

   
    
    return {       
        setUserInAuthSlice,
    }



}