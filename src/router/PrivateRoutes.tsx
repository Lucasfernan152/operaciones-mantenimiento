import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { OperacionesPage } from '../operaciones/pages/OperacionesPage'
import { TaskByIdPage } from '../operaciones/pages/TaskByIdPage'
import { SearchTaskPage } from '../operaciones/pages/SearchTaskPage'
import { NewTaskPage } from '../operaciones/pages/NewTaskPage'
import { NewElementPage } from '../operaciones/pages/NewElementPage'
import { UpdateElementPage } from '../operaciones/pages/UpdateElementPage'
import { HomeLayout } from '../operaciones/layout/HomeLayout'
import { HomeLayoutMobile } from '../operaciones/layout/HomeLayoutMobile'
import { useMediaQuery } from '@mui/material'


export const ResponsiveDesign = ({children, mobile}:{children: any, mobile:boolean}) => {

    

    return ((mobile)? (<HomeLayout drawerWidth={250}>{children}</HomeLayout>)
                    :(<HomeLayoutMobile>{children}</HomeLayoutMobile>))
     
}
   

export const PrivateRoutes = () => {

    const matches = useMediaQuery('(min-width:600px)');

  return (
    <ResponsiveDesign mobile={matches}>
    <Routes>
          <Route path="/home/operaciones" element={<OperacionesPage />} />
          <Route path="/home/new-task" element={<NewTaskPage />} />
          <Route path="/home/new-element" element={<NewElementPage />} />
          <Route path="/update-element" element={<UpdateElementPage />} />
          <Route path="/search-task" element={<SearchTaskPage />} />
          <Route path="/task/:id" element={<TaskByIdPage />} />
          <Route path="*" element={<Navigate to="/home/operaciones" />} />
    </Routes >
    </ResponsiveDesign>
  )
}
