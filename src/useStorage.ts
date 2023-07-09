import { useEffect, useState } from "react";
import { Drivers, Storage } from '@ionic/storage';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const ELEMENTOS_KEY = 'elementos';

export interface Elemento {
}

export function useStorage() {
    const [store, setStore] = useState<Storage>();
    const [elementos, setElementos] = useState<Elemento[]>([]);

    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: 'elementosdb'
            });
            const store = await newStore.create();
            setStore(store);

            const storedElementos = await store.get(ELEMENTOS_KEY || []);
            setElementos(storedElementos);

            const elementosCollectionRef = collection(db, 'elementos');
            getDocs(elementosCollectionRef)
                .then(response => {
                    const elementosCol = response.docs.map(doc => doc.data())
                    if(elementosCol.length !== 0){
                        var elementos: Elemento[] = [];
                        elementosCol.forEach(elemento =>
                            elementos.push({ 
                            })
                        )
                        setElementos(elementos);
                        store.set(ELEMENTOS_KEY, elementos);
                    }
                });
        }
        initStorage();
    }, []);

    return {
        elementos
    }
}