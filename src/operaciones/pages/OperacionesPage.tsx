import { Grid, Divider, Typography } from '@mui/material';
import { HomeLayout } from "../layout/HomeLayout"
import { UserTable } from '../components/UserTable';
import {usuarios} from '../../storage/tareas'
import { useState } from "react";
import { TableHeader } from '../components/TableHeader';



export const OperacionesPage = () => {




  return (
    <>
        <HomeLayout drawerWidth={250} >
            
            <Grid
                
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                className="bg-neutral-900 pt-20 pb-6"
                sx={{
                    minHeight:'100%' ,
                    height: 'auto',  // Cambiar a 100vh
                    minWidth: '100vw',
                    overflowY: 'auto'  // Cambiar a overflowY para permitir el scroll vertical
                }}
            >
                <Grid
                    item
                    className='shadow-xl'
                    alignItems="center"
                    justifyContent="center"
                    xs={3}
                    sx={{ 
                        width: { sm: '80%', xs: '70vw' },
                        backgroundColor: '#f1f1f1',
                        padding: 3,
                        borderRadius: 2
                    }}
                >
                  <TableHeader/>
                    <UserTable/>
                </Grid>
            </Grid>
        </HomeLayout >
    </>
  )
}
