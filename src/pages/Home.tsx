import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useStorage } from '../storage/useStorage';

const Home: React.FC = () => {
  const { userLogged } = useStorage(true);
  debugger

  return (
      userLogged &&
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Usuario Logeado: {userLogged?.nombre}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ExploreContainer/>
        </IonContent>
      </IonPage>
  );
};

export default Home;
