export type AuthStatus  = 'checking' | 'authenticated' | 'not-authenticated';


export interface User {
    id: string | null,
    userRol:Rol | null,
    status: AuthStatus,
    uid: string | null,
    email: string | null,
    displayName: string | null,
    photoURL: string | null,
    errorMessage: string | null, 
}

export interface RegisterUser extends Omit<User, 'uid' | 'photoURL' | 'errorMessage' | 'status' > {
    password: string,
    id: string,
    rol: Rol
}


export interface UserToWhitelist {
    id: string
    mail: string
    nombre: string
    rol: Rol
}


export type Rol = "ADMIN" | "USUARIO"