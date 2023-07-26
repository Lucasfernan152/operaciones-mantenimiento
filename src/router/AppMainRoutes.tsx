import { IonRouterOutlet } from '@ionic/react'
import React from 'react'
import { Route } from 'react-router'
import { LoginPage } from '../auth/pages/LoginPage'
import { OperacionesRouter } from '../operaciones/routes/OperacionesRouter';

export const AppMainRoutes = () => {
  return (
    <IonRouterOutlet>
        <OperacionesRouter/>
    </IonRouterOutlet>
  )
}
