import { Box, Drawer, Toolbar, IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid, Typography } from '@mui/material';
import {MenuOutlined, HomeRounded, AddTask, SystemUpdateAlt, Add} from '@mui/icons-material';
import { HomeLayoutProps } from "../interfaces";
import { NavBar } from '../components/NavBar';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getMenuOptions } from '../helpers';
import { useNavigate } from 'react-router';


export const HomeLayout = ({children, drawerWidth }: HomeLayoutProps) => {



    
        const navigate = useNavigate(); // Obtiene la instancia de history
      
        const navigateByMenu = (path:string) => {
            navigate(path); // Redirige a la ruta deseada
        };


  const {displayName, userRol} = useAppSelector(state => state.auth)

  const menuOptions = getMenuOptions(userRol!)

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
            <Toolbar className='flex justify-between'>
                <IconButton onClick={handleMenu}>
                    <MenuOutlined/>
                </IconButton>
                <Typography variant='h6' noWrap component='div'>
                    {displayName}
                </Typography>
               
            </Toolbar>
                <Divider/>
                <List>
                {
                    menuOptions.map( ({ option, icon, path}) => (
                        <ListItem key={ option } onClick={() => navigateByMenu(path)} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={ option } />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Drawer>
    </Box>
    <NavBar changeMenu={handleMenu} />
      {children}
    </>
  );
}