import { ReactNode } from 'react';

// Definición de las propiedades esperadas en el componente
export interface HomeLayoutProps {
  open: boolean;
  children: ReactNode; // ReactNode representa cualquier contenido React válido (componentes, texto, etc.)
  drawerWidth: number; // El título es opcional y puede ser un string
}