import { IonRouterOutlet } from '@ionic/react'
import { Route } from 'react-router'
import { LoginPage } from '../auth/pages/LoginPage'


export const AuthRoutes = () => {
  return (
    <IonRouterOutlet>
        <Route path="/login" component={LoginPage} />
    </IonRouterOutlet>
  )
}
