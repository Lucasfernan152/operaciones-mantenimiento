export type AuthStatus  = 'checking' | 'authenticated' | 'not-authenticated';


export interface User {
    status: AuthStatus,
    uid: string | null,
    email: string | null,
    displayName: string | null,
    photoURL: string | null,
    errorMessage: string | null, 
}

export interface RegisterUser extends Omit<User, 'uid' | 'photoURL' | 'errorMessage' | 'status' > {
    password: string,

}
