import { IonApp, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route, } from 'react-router';
import { LoginPage } from '../auth/pages/LoginPage';
import { IonReactRouter } from '@ionic/react-router';
import { OperacionesRouter } from '../operaciones/routes/OperacionesRouter';

import { LoadingComponent } from '../ui/components/LoadingComponent';
import { AppMainRoutes } from './AppMainRoutes';
import { AuthRoutes } from './AuthRoutes';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { useAppSelector } from '../hooks';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useEffect } from 'react';


export const AppRouter = () => {

const  {status} = useAppSelector(state => state.auth) 

const { setUserInAuthSlice } = useLocalStorage()

useEffect(() => {
  setUserInAuthSlice()

}, [])


if (status === 'checking') return <LoadingComponent/>


return (
<IonApp>
    <IonReactRouter>

        <Route path="/home">
          <PrivateRoute isAuthenticated={status}>
            <AppMainRoutes />
          </PrivateRoute>
        </Route>

        <Route path="/" >
          <PublicRoute isAuthenticated={status} >
            <AuthRoutes />
          </PublicRoute>
        </Route>

    
    </IonReactRouter>
  </IonApp>
);
}