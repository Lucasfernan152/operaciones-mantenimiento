import React from 'react';
import { TokenResponse, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useStorage } from '../storage/useStorage';

const Login: React.FC = () => {
    const { userLogged, login, logout } = useStorage(true);

    const handleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => onLogin(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const onLogin = (codeResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                    Accept: 'application/json'
                }
            })
        .then((res) => {
            if(login(res.data)){
                console.log("Login Success");
            } else{
                console.log("Usuario no registrado en el sistema");
            }
        })
        .catch((err) => console.log(err));
    };
    const onLogout = () => {
        googleLogout();
        logout();
    };

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
                    <button onClick={onLogout}>Log out</button>
                </div>
            ) : (
                <button onClick={() => handleLogin()}>Sign in with Google 🚀</button>
            )}
        </div>
    )
}

export default Login;