import { Navigate, Route, Routes } from "react-router";
import { LoginPage } from "../auth/pages/LoginPage";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../hooks";
import { LoadingComponent } from "../ui/components/LoadingComponent";
import { AuthStatus } from "../storage/auth/interfaces/User.interface";
import { HomeLayout } from "../operaciones/layout/HomeLayout";
import { NewElementPage } from "../operaciones/pages/NewElementPage";
import { NewTaskPage } from "../operaciones/pages/NewTaskPage";
import { OperacionesPage } from "../operaciones/pages/OperacionesPage";
import { SearchTaskPage } from "../operaciones/pages/SearchTaskPage";
import { TaskByIdPage } from "../operaciones/pages/TaskByIdPage";
import { UpdateElementPage } from "../operaciones/pages/UpdateElementPage";
import { BrowserRouter } from "react-router-dom";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

export const AppRouter = () => {
  const { status } = useAppSelector((state) => state.auth);

  const { setUserInAuthSlice } = useLocalStorage();

  useEffect(() => {
    setUserInAuthSlice();
  }, []);

  if (status === "checking") return <LoadingComponent />;

  return (
    <>

      {
      (status === "not-authenticated") ? <PublicRoutes /> 
                                       : <PrivateRoutes />
      }
    </>
  );
};
