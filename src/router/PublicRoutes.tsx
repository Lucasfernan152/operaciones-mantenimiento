import { ReactNode } from "react"
import { AuthStatus } from "../storage/auth/interfaces/User.interface"
import { Navigate, Route, Routes } from 'react-router';
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";




export const PublicRoutes = () => {

return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/*" element={<Navigate to="/login"/>}/>
    </Routes>
) 



}