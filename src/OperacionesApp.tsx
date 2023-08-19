import { setupIonicReact } from "@ionic/react";
import { Toaster } from "sonner";

import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";

setupIonicReact();

export const OperacionesApp: React.FC = () => (
  <BrowserRouter>
    <AppRouter />
    <Toaster position="top-center" richColors/>
  </BrowserRouter>
);
