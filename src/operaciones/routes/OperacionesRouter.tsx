import { IonRouterOutlet } from '@ionic/react';
import { Route} from 'react-router';
import { OperacionesPage } from '../pages/OperacionesPage';

export const OperacionesRouter: React.FC = () => (

    <IonRouterOutlet>
        <Route path="/home/operaciones" exact={true}>
            <OperacionesPage />
        </Route>
    </IonRouterOutlet>
);