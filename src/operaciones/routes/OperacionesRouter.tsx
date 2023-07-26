import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { OperacionesPage } from '../pages/OperacionesPage';

export const OperacionesRouter: React.FC = () => (

    <>
        <Route path="/home/operaciones" exact={true} component={OperacionesPage}/>       
    

        <Redirect to="/home/operaciones" />
    </>
);