import { IonApp, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route} from 'react-router';
import { LoginPage } from '../auth/pages/LoginPage';
import { IonReactRouter } from '@ionic/react-router';

export const AppRouter: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/auth" component={LoginPage} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/auth" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);