import { IonRouterOutlet } from '@ionic/react'
import { Route } from 'react-router'
import { LoginPage } from '../auth/pages/LoginPage'
import { RegisterPage } from '../auth/pages/RegisterPage'


export const AuthRoutes = () => {
  return (
    <IonRouterOutlet>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
    </IonRouterOutlet>
  )
}
