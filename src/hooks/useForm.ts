import { useState, ChangeEvent } from 'react';
import { FormHook, FormState } from './interfaces';

export const useForm = (initialForm: FormState = {}): FormHook => {
  const [formState, setFormState] = useState<FormState>(initialForm);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = (): void => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    onInputChange,
    onResetForm,
  };
};