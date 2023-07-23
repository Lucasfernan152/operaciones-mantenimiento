import { Box, Drawer, Toolbar, IconButton } from '@mui/material';
import {MenuOutlined} from '@mui/icons-material';
import { HomeLayoutProps } from "../interfaces";
import { NavBar } from '../components/NavBar';
import { useState } from 'react';


export const HomeLayout = ({children, drawerWidth }: HomeLayoutProps) => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu)
  }

  return (
    <>
    <Box
        component='nav'
        sx={{width: {sm: drawerWidth }, flexShrink: {sm: 0}}}
    >
        <Drawer
            variant='temporary'
            open={menu}
            sx={{
                display:{xs:'block'},
                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <IconButton onClick={handleMenu}>
                    <MenuOutlined/>
                </IconButton>
            </Toolbar>
        </Drawer>
    </Box>
    <NavBar changeMenu={handleMenu} />
      {children}
    </>
  );
}