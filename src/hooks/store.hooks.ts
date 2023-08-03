import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../storage";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch


// Esto es un hook para el tipado de datos del dispatch y selector del redux.
// Es lo mismo que usar useSelector o useDispatch, nada mas que te ahorra el tipado.
