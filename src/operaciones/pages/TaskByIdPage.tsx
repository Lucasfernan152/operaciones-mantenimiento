import { Grid, Paper } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router'
import { TaskPageComponent } from '../components/TaskPageComponent';

export const TaskByIdPage = () => {

  const params = useParams()

  return (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="start"
        className=" bg-gradient-to-tr from-sky-700 to-blue-800 pt-4 md:pt-20 pb-6"
        sx={{
          minHeight: "100vh",
          height: "auto", // Cambiar a 100vh
          minWidth: "100vw",
          overflowY: "auto", // Cambiar a overflowY para permitir el scroll vertical
        }}>
          <Grid  className='h-[100%] w-[92%] '>
              <TaskPageComponent/>
          </Grid>
      </Grid>
  )
}
