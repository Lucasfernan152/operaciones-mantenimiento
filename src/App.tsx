import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';

import { useStorage } from './storage/useStorage';

setupIonicReact();

const App: React.FC = () => {
  const { isLoading, userLogged } = useStorage(false);

  if(isLoading){
    return <span>Loading...</span>
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/home"
            component={userLogged ? Home : LoginRedirect}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

const LoginRedirect: React.FC = () => (
  <Redirect to="/login" />
);

export default App;
