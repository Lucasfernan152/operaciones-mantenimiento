import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store.hooks";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../storage/auth";



export const useCheckAuth = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {

      if (!user) return dispatch(logout(!!user));

      const { uid, displayName, photoURL, email } = user

      dispatch(login({ uid, displayName, photoURL, email }));

    });
  }, []);

  return status;
};
