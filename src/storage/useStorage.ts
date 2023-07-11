import { useEffect, useState } from "react";
import { Storage } from '@ionic/storage';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
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
            observacionFinal: tarea.observacionFinal,
            local: false,
            deleted: false
        };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const tarea = snapshot.data(options);
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
            observacionFinal: tarea.observacionFinal,
            local: tarea.local,
            deleted: tarea.deleted
        }
    }
};
const usuariosConverter = {
    toFirestore: (usuario: Usuario) => {
        return {
            id: usuario.id,
            mail: usuario.mail,
            nombre: usuario.nombre,
            local: false,
            deleted: false
        };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const usuario = snapshot.data(options);
        return {
            id: usuario.id,
            mail: usuario.mail,
            nombre: usuario.nombre,
            rol: usuario.rol,
            local: usuario.local,
            deleted: usuario.deleted
        }
    }
};
const elementosConverter = {
    toFirestore: (elemento: Elemento) => {
        return {
            id: elemento.id,
            nombre: elemento.nombre,
            local: false,
            deleted: false
        };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const elemento = snapshot.data(options);
        return {
            id: elemento.id,
            nombre: elemento.nombre,
            local: elemento.local,
            deleted: elemento.deleted
        }
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

const ELEMENTOS_KEY = 'elementos';
const RECONECTADORES_KEY = 'reconectadores';
const TAREAS_KEY = 'tareas';
const USUARIOS_KEY = 'usuarios';

export interface Elemento {
    id: String,
    nombre: String,
    local: Boolean,
    deleted: Boolean
}

export interface Reconectador {
    id: String,
    nombre: String,
    local: Boolean,
    deleted: Boolean
}

export interface Tarea {
    id: String,
    estado: Estado,
    creador: Usuario,
    elemento: Elemento | Reconectador,
    ejecutor: Usuario,
    prioridad: Prioridad,
    equipo: Equipo,
    fechaAviso: Date,
    fechaProgramacion: Date | null,
    observacionPrevia: String,
    observacionFinal: String,
    local: Boolean,
    deleted: Boolean
}

export interface Usuario {
    id: String,
    mail: String,
    nombre: String,
    rol: Rol,
    local: Boolean,
    deleted: Boolean
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
        const storedUsuarios = await store?.get(USUARIOS_KEY) || [];
        setElementos(storedUsuarios);

        const usuariosCollectionRef = collection(db, USUARIOS_KEY).withConverter(usuariosConverter);
        getDocs(usuariosCollectionRef)
            .then(response => {
                const usuariosCol: Usuario[] = response.docs.map(doc => doc.data())
                if (usuariosCol.length !== 0) {
                    const usersLocal: String[] = usuarios.filter(usuario => usuario.local).map(usuario => usuario.id);
                    setUsuarios(usuariosCol.filter(usuario => !usersLocal.includes(usuario.id)));
                    store?.set(USUARIOS_KEY, usuarios);
                }
            });

        const storedElementos = await store?.get(ELEMENTOS_KEY) || [];
        setElementos(storedElementos);

        const elementosCollectionRef = collection(db, ELEMENTOS_KEY).withConverter(elementosConverter);
        getDocs(elementosCollectionRef)
            .then(response => {
                const elementosCol = response.docs.map(doc => doc.data())
                if (elementosCol.length !== 0) {
                    const elementosLocal: String[] = elementos.filter(elemento => elemento.local).map(elemento => elemento.id);
                    setElementos(elementosCol.filter(elemento => !elementosLocal.includes(elemento.id)));
                    store?.set(ELEMENTOS_KEY, elementos);
                }
            });

        const storedReconectadores = await store?.get(RECONECTADORES_KEY) || [];
        setReconectadores(storedReconectadores);

        const reconectadoresCollectionRef = collection(db, RECONECTADORES_KEY).withConverter(reconectadoresConverter);
        getDocs(reconectadoresCollectionRef)
            .then(response => {
                const reconectadoresCol = response.docs.map(doc => doc.data())
                if (reconectadoresCol.length !== 0) {
                    const reconectadoresLocal: String[] = reconectadores.filter(reconectador => reconectador.local).map(reconectador => reconectador.id);
                    setElementos(reconectadoresCol.filter(reconectador => !reconectadoresLocal.includes(reconectador.id)));
                    store?.set(RECONECTADORES_KEY, reconectadores);
                }
            });

        const storedTareas = await store?.get(TAREAS_KEY) || [];
        setTareas(storedTareas);

        const tareasCollectionRef = collection(db, TAREAS_KEY).withConverter(tareasConverter);
        getDocs(tareasCollectionRef)
            .then(response => {
                const tareasCol: Tarea[] = response.docs.map(doc => doc.data())
                if (tareasCol.length !== 0) {
                    const tareasLocal: String[] = tareas.filter(tarea => tarea.local).map(tarea => tarea.id);
                    setTareas(tareasCol.filter(tarea => tareasLocal.includes(tarea.id)));
                    store?.set(TAREAS_KEY, tareas);
                }
            });
    }

    const syncChanges = async () => {
        let promises: Promise<void>[] = [];

        tareas.filter(tarea => tarea.local).forEach(tarea => {
            tarea.local = false;
            if (tarea.deleted) {
                promises.push(deleteDoc(doc(db, TAREAS_KEY, tarea.id.toString())));
            }
            else {
                promises.push(setDoc(doc(db, TAREAS_KEY, tarea.id.toString()), tarea));
            }
        });

        usuarios.filter(usuario => usuario.local).forEach(usuario => {
            usuario.local = false;
            if (usuario.deleted) {
                promises.push(deleteDoc(doc(db, USUARIOS_KEY, usuario.id.toString())));
            }
            else {
                promises.push(setDoc(doc(db, USUARIOS_KEY, usuario.id.toString()), usuario));
            }
        });

        elementos.filter(elemento => elemento.local).forEach(elemento => {
            elemento.local = false;
            if (elemento.deleted) {
                promises.push(deleteDoc(doc(db, ELEMENTOS_KEY, elemento.id.toString())));
            }
            else {
                promises.push(setDoc(doc(db, ELEMENTOS_KEY, elemento.id.toString()), elemento));
            }
        });

        reconectadores.filter(reconectador => reconectador.local).forEach(reconectador => {
            reconectador.local = false;
            if (reconectador.deleted) {
                promises.push(deleteDoc(doc(db, RECONECTADORES_KEY, reconectador.id.toString())));
            }
            else {
                promises.push(setDoc(doc(db, RECONECTADORES_KEY, reconectador.id.toString()), reconectador));
            }
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