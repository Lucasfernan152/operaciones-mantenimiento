import { setupIonicReact } from "@ionic/react";

import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";

setupIonicReact();

export const OperacionesApp: React.FC = () => (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);
