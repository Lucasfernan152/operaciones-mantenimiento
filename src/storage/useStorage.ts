import { useEffect, useState } from "react";
import { Storage } from '@ionic/storage';
import { FirestoreDataConverter, QueryDocumentSnapshot, collection, deleteDoc, doc, getDocs, setDoc, DocumentData } from 'firebase/firestore';
import { db } from './firebase';

const ELEMENTOS_KEY: string = 'elementos';
const RECONECTADORES_KEY: string = 'reconectadores';
const TAREAS_KEY: string = 'tareas';
const USUARIOS_KEY: string = 'usuarios';
const KEYS: string[] = [ELEMENTOS_KEY, RECONECTADORES_KEY, TAREAS_KEY, USUARIOS_KEY];

const elementoConverter = (elemento: DocumentData): Item => {
    return new Elemento(elemento.id, elemento.nombre, false, false);
}
const reconectadorConverter = (reconectador: DocumentData): Item => {
    return new Reconectador(reconectador.id, reconectador.nombre, false, false);
}
const usuarioConverter = (usuario: DocumentData): Item => {
    return new Usuario(usuario.id, usuario.mail, usuario.nombre, usuario.rol, false, false);
}
const tareaConverter = (tarea: DocumentData): Item => {
    return new Tarea(tarea.id, tarea.estado, tarea.creador, tarea.elemento, tarea.ejecutor,
        tarea.prioridad, tarea.equipo, tarea.fechaAviso,tarea.fechaProgramacion,
        tarea.observacionPrevia, tarea.observacionFinal, false, false);
}
const CONVERTERS = new Map<string, any>([
    [ELEMENTOS_KEY, elementoConverter],
    [RECONECTADORES_KEY, reconectadorConverter],
    [TAREAS_KEY, tareaConverter],
    [USUARIOS_KEY, usuarioConverter]
]);

export class Item {
    id: string
    local: Boolean
    deleted: Boolean

    constructor(id: string, local: Boolean, deleted: Boolean) {
        this.id = id;
        this.local = local;
        this.deleted = deleted;
    }
}

export class Elemento extends Item {
    nombre: String

    constructor(id: string, nombre: String, local: Boolean, deleted: Boolean) {
        super(id, local, deleted);
        this.nombre = nombre;
    }
}

export class Reconectador extends Item {
    nombre: String

    constructor(id: string, nombre: String, local: Boolean, deleted: Boolean) {
        super(id, local, deleted);
        this.nombre = nombre;
    }
}

export class Tarea extends Item {
    estado: Estado
    creador: Usuario
    elemento: Elemento | Reconectador
    ejecutor: Usuario
    prioridad: Prioridad
    equipo: Equipo
    fechaAviso: Date
    fechaProgramacion: Date | null
    observacionPrevia: String
    observacionFinal: String

    constructor(id: string, estado: Estado, creador: Usuario, elemento: Elemento | Reconectador,
        ejecutor: Usuario, prioridad: Prioridad, equipo: Equipo, fechaAviso: Date,
        fechaProgramacion: Date | null, observacionPrevia: String, observacionFinal: String,
        local: Boolean, deleted: Boolean) {
        super(id, local, deleted);
        this.estado = estado;
        this.creador = creador;
        this.elemento = elemento;
        this.ejecutor = ejecutor;
        this.prioridad = prioridad;
        this.equipo = equipo;
        this.fechaAviso = fechaAviso;
        this.fechaProgramacion = fechaProgramacion;
        this.observacionPrevia = observacionPrevia;
        this.observacionFinal = observacionFinal;
    }
}

export class Usuario extends Item {
    mail: String
    nombre: String
    rol: Rol

    constructor(id: string, mail: String, nombre: String, rol: Rol, local: Boolean, deleted: Boolean) {
        super(id, local, deleted);
        this.mail = mail;
        this.nombre = nombre;
        this.rol = rol;
    }
}

export enum Equipo {
    BOOSTER = 'Booster',
    RECONECTADOR = 'Reconectador',
    ELEMENTOS = 'Elementos',
    OTROS = 'Otros'
}

export enum Prioridad {
    MUY_BAJA = 'Muy Baja',
    BAJA = 'Baja',
    MEDIA = 'Media',
    ALTA = 'Alta',
    MUY_ALTA = 'Muy Alta'
}


export enum Rol {
    USUARIO = 'Usuario',
    ADMIN = 'Administador'
}

export enum Estado {
    PENDIENTE = 'Pendiente',
    PROGRAMADO = 'Programado',
    PROCESADO = 'Procesado',
    REALIZADO = 'Realizado',
    NO_REALIZADO = 'No Realizado',
    CANCELADO = 'Cancelado',
    CERRADO = 'Cerrado'
}

export function useStorage() {
    const [store, setStore] = useState<Storage>();

    const [elementos, setElementos] = useState<Elemento[]>([]);
    const [reconectadores, setReconectadores] = useState<Reconectador[]>([]);
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [isLoading, setIsLoading] = useState<Boolean>(true);

    const SETTERS = new Map<string, any>([
        [ELEMENTOS_KEY, setElementos],
        [RECONECTADORES_KEY, setReconectadores],
        [TAREAS_KEY, setTareas],
        [USUARIOS_KEY, setUsuarios]
    ]);

    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: 'operaciones_mantenimiento_db'
            });
            const store = await newStore.create();
            setStore(store);
            syncChanges();
        }
        initStorage();
    }, []);

    const syncChanges = async () => {
        setIsLoading(true);
        let promises: Promise<void>[] = [];

        KEYS.forEach(async key => {
            const storedItems: Item[] = await store?.get(key) || [];
            storedItems.filter(item => item.local).forEach(item => {
                if (item.deleted) {
                    promises.push(deleteDoc(doc(db, key, item.id)));
                }
                else {
                    promises.push(setDoc(doc(db, key, item.id), item));
                }
            });
        });

        Promise.all(promises).then(() => {
            downloadChanges();
        })
        .catch(() => {
            setIsLoading(false);
        });
    }
    const downloadChanges = async () => {
        let promises: Promise<any>[] = KEYS.map(key => getDocs(collection(db, key)));

        Promise.all(promises)
        .then(responses => {
            responses.forEach(async response => {
                const key: string = response.query._path.segments[0];
                const docs: QueryDocumentSnapshot[] = response.docs;
    
                const cloudData: Item[] = docs.map(document => CONVERTERS.get(key)(document.data()));
                const localData: Item[] = await store?.get(key) || [];
                const mergedData: Item[] = mergeData(cloudData, localData);
                
                store?.set(key, mergedData);
                SETTERS.get(key)(mergedData);
            });
            setIsLoading(false);
        })
        .catch(() => {
            setIsLoading(false);
        });
    }
    const mergeData = (cloudData: Item[], localData: Item[]): Item[] => {
        let mergedData: Item[] = cloudData;
        
        localData.forEach(item => {
            debugger
            let index = mergedData.findIndex(mergedItem => mergedItem.id === item.id);
            if(index === -1 && !item.deleted) mergedData.push(item)
            if(index !== -1 && item.deleted) mergedData[index] = item;
        });

        return mergedData;
    }

    const saveUsuario = (newUser: Usuario) => {
        newUser.local = true;
        const index = usuarios.findIndex(user => newUser.id === user.id);
        let newUsuarios = usuarios;
        if (index === -1) {
            newUsuarios.push(newUser);
        }
        else {
            newUsuarios[index] = newUser;
        }
        setUsuarios(newUsuarios);
        store?.set(USUARIOS_KEY, newUsuarios);
        syncChanges();
    }
    const deleteUsuario = (deletedUser: Usuario) => {
        deletedUser.deleted = true;
        if(usuarios.findIndex(usuario => usuario.id === deletedUser.id) !== -1) saveUsuario(deletedUser);
    }

    const saveTarea = (newTarea: Tarea) => {
        newTarea.local = true;
        const index = tareas.findIndex(tarea => newTarea.id === tarea.id);
        let newTareas = tareas;
        if (index === -1) {
            newTareas.push(newTarea);
        }
        else {
            newTareas[index] = newTarea;
        }
        store?.set(TAREAS_KEY, newTareas);
        syncChanges();
    }
    const deleteTarea = (deletedTarea: Tarea) => {
        deletedTarea.deleted = true;
        if(tareas.findIndex(tarea => tarea.id === deletedTarea.id) !== -1) saveTarea(deletedTarea);
    }

    const saveElemento = (newElemento: Elemento) => {
        newElemento.local = true;
        const index = elementos.findIndex(elemento => newElemento.id === elemento.id);
        let newElementos = elementos;
        if (index === -1) {
            newElementos.push(newElemento);
        }
        else {
            newElementos[index] = newElemento;
        }
        store?.set(ELEMENTOS_KEY, newElementos);
        syncChanges();
    }
    const deleteElemento = (deletedElemento: Elemento) => {
        deletedElemento.deleted = true;
        if(elementos.findIndex(elemento => elemento.id === deletedElemento.id) !== -1) saveElemento(deletedElemento);
    }

    const saveReconectador = (newReconectador: Reconectador) => {
        newReconectador.local = true;
        const index = reconectadores.findIndex(reconectador => newReconectador.id === reconectador.id);
        let newReconectadores = reconectadores;
        if (index === -1) {
            newReconectadores.push(newReconectador);
        }
        else {
            newReconectadores[index] = newReconectador;
        }
        store?.set(RECONECTADORES_KEY, newReconectadores);
        syncChanges();
    }
    const deleteReconectador = (deletedReconectador: Reconectador) => {
        deletedReconectador.deleted = true;
        if(reconectadores.findIndex(reconectador => reconectador.id === deletedReconectador.id) !== -1) saveReconectador(deletedReconectador);
    }

    return {
        isLoading,
        elementos,
        reconectadores,
        tareas,
        usuarios,
        saveUsuario,
        deleteUsuario,
        saveTarea,
        deleteTarea,
        saveElemento,
        deleteElemento,
        saveReconectador,
        deleteReconectador
    }
}