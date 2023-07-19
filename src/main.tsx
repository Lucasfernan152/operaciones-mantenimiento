import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const ID_CLIENT = '841493059579-4nbjj7evmiuepv9e6j18sv4g9k7bk0q3.apps.googleusercontent.com';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <GoogleOAuthProvider clientId={ID_CLIENT}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);