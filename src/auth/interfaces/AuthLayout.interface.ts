import { ReactNode } from 'react';

// Definición de las propiedades esperadas en el componente
export interface AuthLayoutProps {
  children: ReactNode; // ReactNode representa cualquier contenido React válido (componentes, texto, etc.)
  title: string; // El título es opcional y puede ser un string
  widthContent: number;
}