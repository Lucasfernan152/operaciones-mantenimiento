import { AppBar, Toolbar, IconButton, Grid, Avatar, Tooltip } from '@mui/material';
import {LogoutOutlined, MenuOutlined} from '@mui/icons-material';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { startLogout } from '../../storage/auth';

export const NavBar = ({changeMenu}: any) => {

  const {photoURL} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const onLogout = () => {
    dispatch(startLogout())
  }


  return (
    <AppBar
        position='fixed'
        
        sx={{ backgroundColor: 'white'}}
    >
        <Toolbar>
            <IconButton onClick={changeMenu}>
                <MenuOutlined/>
            </IconButton>

            <Grid container display="flex" justifyContent="end" alignItems="center" >
            <Tooltip title="Cerrar sesión">
              <IconButton onClick={onLogout}>
                <LogoutOutlined />
              </IconButton>
            </Tooltip>
            </Grid>
        </Toolbar>

       
    </AppBar>
  )
}
