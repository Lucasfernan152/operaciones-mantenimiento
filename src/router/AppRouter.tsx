import { IonApp, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route} from 'react-router';
import { LoginPage } from '../auth/pages/LoginPage';
import { IonReactRouter } from '@ionic/react-router';
import { OperacionesRouter } from '../operaciones/routes/OperacionesRouter';

export const AppRouter: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/auth" component={LoginPage} exact={true} />
        <Route path="/home">
          <OperacionesRouter />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);