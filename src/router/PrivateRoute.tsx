import { ReactNode } from "react"
import { AuthStatus } from "../storage/auth/interfaces/User.interface"
import { Redirect } from "react-router"



export const PrivateRoute = ({children, isAuthenticated}: {children: ReactNode, isAuthenticated: AuthStatus}) => {

return (isAuthenticated === "authenticated") ? children
                                             : <Redirect to="/login" />



}