import { ReactNode } from "react"
import { AuthStatus } from "../storage/auth/interfaces/User.interface"
import { Redirect } from "react-router"



export const PublicRoute = ({children, isAuthenticated}: {children: ReactNode, isAuthenticated: AuthStatus}) => {

return (isAuthenticated === "not-authenticated") ? children
                                                 : <Redirect to="/home/operaciones" /> 


}