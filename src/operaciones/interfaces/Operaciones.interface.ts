import { Elemento, Estado, Prioridad, Tarea, Reconectador } from '../../storage/useStorage';

export type Collection = "Tareas" | "Usuarios" | "Reconectadores" | "Elementos"

export type UserProperties = "id" | "mail" | "nombre"

export type ElementoProperties = "id" | "nombre"

export type EstadoTarea = "Programado" | "No Realizado" | "Realizado" | "Pendiente" 