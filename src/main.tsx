import React from 'react';
import { createRoot } from 'react-dom/client';
import { OperacionesApp } from './OperacionesApp';

//Redux-Toolkit

import { Provider } from 'react-redux'
import { store } from './storage';

//MaterialUI

import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { lightTheme } from './theme/lightTheme';

//Tailwind

import './index.css' 


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={ lightTheme }>
      <CssBaseline/>
        <Provider store={ store } >
          <OperacionesApp />
        </Provider>
    </ThemeProvider>
  </React.StrictMode>

);