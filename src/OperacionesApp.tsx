import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppRouter } from './router/AppRouter';


setupIonicReact();

export const OperacionesApp: React.FC = () => (
    <AppRouter/>
);

