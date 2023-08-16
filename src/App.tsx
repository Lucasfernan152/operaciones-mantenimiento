
import { setupIonicReact } from '@ionic/react';
import { AppRouter } from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

setupIonicReact();

export const OperacionesApp: React.FC = () => {

  return (
      <AppRouter/>
  )
};