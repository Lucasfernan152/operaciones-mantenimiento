import { useEffect, useState } from "react";
import { Storage } from '@ionic/storage';
import { FirestoreDataConverter, QueryDocumentSnapshot, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from './firebase';

//Converter de las entidades
const tareasConverter = {
    toFirestore: (tarea: Tarea) => {
        return {
            id: tarea.id,
            estado: tarea.estado,
            creador: tarea.creador,
            elemento: tarea.elemento,
            ejecutor: tarea.ejecutor,
            prioridad: tarea.prioridad,
            equipo: tarea.equipo,
            fechaAviso: tarea.fechaAviso,
            fechaProgramacion: tarea.fechaProgramacion,
            observacionPrevia: tarea.observacionPrevia,
            observacionFinal: tarea.observacionFinal
        };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const tarea = snapshot.data(options);
        return new Tarea(tarea.id, tarea.estado, tarea.creador, tarea.elemento,
            tarea.ejecutor, tarea.prioridad, tarea.equipo, tarea.fechaAviso,
            tarea.fechaProgramacion, tarea.observacionPrevia, tarea.observacionFinal,
            tarea.local, tarea.deleted);
    }
};
const usuariosConverter = {
    toFirestore: (usuario: Usuario) => {
        return {
            id: usuario.id,
            mail: usuario.mail,
            nombre: usuario.nombre
        };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const usuario = snapshot.data(options);
        return new Usuario(usuario.id, usuario.mail, usuario.nombre, usuario.rol, false, false);
    }
};
const elementosConverter = {
    toFirestore: (elemento: Elemento) => {
        return {
            id: elemento.id,
            nombre: elemento.nombre
        };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const elemento = snapshot.data(options);
        return new Elemento(elemento.id, elemento.nombre, false, false);
    }
};
const reconectadoresConverter = {
    toFirestore: (reconectador: Elemento) => {
        return {
            id: reconectador.id,
            nombre: reconectador.nombre,
            local: false,
            deleted: false
        };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const reconectador = snapshot.data(options);
        return {
            id: reconectador.id,
            nombre: reconectador.nombre,
            local: reconectador.local,
            deleted: reconectador.deleted
        }
    }
};

const ELEMENTOS_KEY: string = 'elementos';
const RECONECTADORES_KEY: string = 'reconectadores';
const TAREAS_KEY: string = 'tareas';
const USUARIOS_KEY: string = 'usuarios';
const KEYS: string[] = [ELEMENTOS_KEY, RECONECTADORES_KEY, TAREAS_KEY, USUARIOS_KEY];
const CONVERTERS = new Map<string, any>([
    [ELEMENTOS_KEY, elementosConverter],
    [RECONECTADORES_KEY, reconectadoresConverter],
    [TAREAS_KEY, tareasConverter],
    [USUARIOS_KEY, usuariosConverter]
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

    const downloadChanges = async () => {
        let promises: Promise<any>[] = [];

        KEYS.forEach(key => {
            const collectionRef = collection(db, key).withConverter(CONVERTERS.get(key));
            promises.push(getDocs(collectionRef));
        });

        const responses = await Promise.all(promises);
        responses.forEach(async response => {
            const key: string = response.query._path.segments[0];
            const docs: QueryDocumentSnapshot[] = response.docs;
            const data = docs.map(document => document.data());

            const stored: Item[] = await store?.get(key) || [];
            stored.filter(item => item.id)
            store?.set(key, data);
        })
    }

    const syncChanges = async () => {
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
    }

    const saveUsuario = (usuario: Usuario) => {
        usuario.local = true;
        const index = usuarios.findIndex(user => usuario.id === user.id);
        let newUsuarios = usuarios;
        if (index === -1) {
            newUsuarios.push(usuario);
        }
        else {
            newUsuarios[index] = usuario;
        }
        setUsuarios(newUsuarios);
        store?.set(USUARIOS_KEY, newUsuarios);
        syncChanges();
    }

    const deleteUsuario = (usuario: Usuario) => {
        debugger
        if (usuarios.findIndex(user => usuario.id === user.id) === -1) return
        usuario.deleted = true;
        saveUsuario(usuario);
    }

    return {
        elementos,
        reconectadores,
        tareas,
        saveUsuario,
        deleteUsuario
    }
}