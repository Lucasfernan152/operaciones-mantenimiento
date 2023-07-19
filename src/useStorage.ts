import { useEffect, useState } from "react";
import { Drivers, Storage } from '@ionic/storage';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const ELEMENTOS_KEY = 'elementos';

export class Usuario {
    mail: string
    nombre: string
    picture: string

    constructor(mail: string, nombre: string, picture: string){
        this.mail = mail;
        this.nombre = nombre;
        this.picture = picture;
    }
}

const USUARIO_LOGGED_KEY = 'usuario_logged'

export function useStorage() {
    const [store, setStore] = useState<Storage>();
    const [userLogged, setUserLogged] = useState<Usuario | null>(null);

    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: 'elementosdb'
            });
            const store = await newStore.create();
            setStore(store);

            const storedUserLogged: Usuario | null = await store.get(USUARIO_LOGGED_KEY) || null;
            setUserLogged(storedUserLogged);
        }
        initStorage();
    }, []);

    const login = (usuario: Usuario) => {
        setUserLogged(usuario);
        store?.set(USUARIO_LOGGED_KEY, usuario)
    }
    const logout = () => {
        setUserLogged(null);
        store?.set(USUARIO_LOGGED_KEY, null)
    }

    return {
        userLogged,
        login,
        logout
    }
}