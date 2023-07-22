import { ChangeEvent } from 'react'

export type FormState = {
    [key: string]: string;
  };
  
export type FormHook = {
    [key: string]: undefined | ((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void);
  };