import { AppBar, Toolbar, IconButton } from '@mui/material';
import {MenuOutlined} from '@mui/icons-material';
import React from 'react'

export const NavBar = ({changeMenu}: any) => {
  return (
    <AppBar
        position='fixed'
        sx={{ backgroundColor: 'blue'}}
    >
        <Toolbar>
            <IconButton onClick={changeMenu}>
                <MenuOutlined/>
            </IconButton>
        </Toolbar>

    </AppBar>
  )
}
