import { setupIonicReact } from '@ionic/react';

import { AppRouter } from './router/AppRouter';


setupIonicReact();


export const OperacionesApp: React.FC = () => (
    <AppRouter/>
);

