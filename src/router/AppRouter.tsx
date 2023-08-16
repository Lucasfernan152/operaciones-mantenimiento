import { Navigate, Route, Routes } from 'react-router';
import { LoginPage } from '../auth/pages/LoginPage';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ReactNode, useEffect } from 'react';
import { useAppSelector } from '../hooks';
import { LoadingComponent } from '../ui/components/LoadingComponent';
import { AuthStatus } from '../storage/auth/interfaces/User.interface';
import { HomeLayout } from '../operaciones/layout/HomeLayout';
import { NewElementPage } from '../operaciones/pages/NewElementPage';
import { NewTaskPage } from '../operaciones/pages/NewTaskPage';
import { OperacionesPage } from '../operaciones/pages/OperacionesPage';
import { SearchTaskPage } from '../operaciones/pages/SearchTaskPage';
import { TaskByIdPage } from '../operaciones/pages/TaskByIdPage';
import { UpdateElementPage } from '../operaciones/pages/UpdateElementPage';
import { BrowserRouter } from 'react-router-dom';
import { RegisterPage } from '../auth/pages/RegisterPage';

export const AppRouter = () => {

  const { status } = useAppSelector(state => state.auth)

  const { setUserInAuthSlice } = useLocalStorage()

  useEffect(() => {
    setUserInAuthSlice()

  }, [])

  if (status === 'checking') return <LoadingComponent />

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home/operaciones" element={<PrivateRoute isAuthenticated={status}><OperacionesPage /></PrivateRoute>} />
          <Route path="/home/new-task" element={<PrivateRoute isAuthenticated={status}><NewTaskPage /></PrivateRoute>} />
          <Route path="/home/new-element" element={<PrivateRoute isAuthenticated={status}><NewElementPage /></PrivateRoute>} />
          <Route path="/update-element" element={<PrivateRoute isAuthenticated={status}><UpdateElementPage /></PrivateRoute>} />
          <Route path="/search-task" element={<PrivateRoute isAuthenticated={status}><SearchTaskPage /></PrivateRoute>} />
          <Route path="/task/:id" element={<TaskByIdPage />} />
          <Route path="*" element={<Navigate to="/home/operaciones" />} />
        </Routes >
    </BrowserRouter>
  );
}

export const PrivateRoute = ({ children, isAuthenticated }: { children: ReactNode, isAuthenticated: AuthStatus }) => {
  return (isAuthenticated === "authenticated") ? <HomeLayout drawerWidth={250}>{children}</HomeLayout> : <Navigate to="/login" />
}