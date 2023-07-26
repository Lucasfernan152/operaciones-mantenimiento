import React, { useRef } from 'react';
import { Rol, Usuario, useStorage } from '../storage/useStorage';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../storage/firebase';

const Login: React.FC = () => {
    const userEmailRef = useRef<HTMLInputElement>(null);
    const userPasswordRef = useRef<HTMLInputElement>(null);
    const { userLogged, login, logout } = useStorage(true);

    const handleLogout = async () => {
        logout();
        await signOut(auth);
    }

    const handleLogin = async () => {
        const userCredential = await signInWithEmailAndPassword(auth, userEmailRef.current?.value || '', userPasswordRef.current?.value || '');
        login(new Usuario(userCredential.user.uid, userCredential.user.email || '',
                        userCredential.user.displayName || '', 
                        Rol.USUARIO, 
                        userCredential.user.photoURL || '', 
                        true, false));
    }

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        const userCredential = await signInWithPopup(auth, provider);
        login(new Usuario(userCredential.user.uid, userCredential.user.email || '',
                        userCredential.user.displayName || '', 
                        Rol.USUARIO, 
                        userCredential.user.photoURL || '', 
                        true, false));
    }

    const handleRegister = async () => {
        const userCredential = await createUserWithEmailAndPassword(auth, userEmailRef.current?.value || '', userPasswordRef.current?.value || '');
        login(new Usuario(userCredential.user.uid, userCredential.user.email || '',
                        userCredential.user.displayName || '', 
                        Rol.USUARIO, 
                        userCredential.user.photoURL || '', 
                        true, false));
    }

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {userLogged ? (
                <div>
                    <img src={userLogged.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {userLogged.nombre}</p>
                    <p>Email Address: {userLogged.mail}</p>
                    <br />
                    <br />
                    <button onClick={handleLogout}>Log out</button>
                </div>
            ) : (
                <>
                    <input ref={userEmailRef} type='email' placeholder='Ingrese email'></input>
                    <input ref={userPasswordRef} type='password' placeholder='Ingrese contraseña'></input>
                    <button onClick={() => handleLogin()}>Iniciar Sesion</button>
                    <button onClick={() => handleGoogleLogin()}>Iniciar Sesion con google</button>
                    <br/>
                    <button onClick={() => handleRegister()}>Registrarse</button>
                </>
            )}
        </div>
    )
}

export default Login;