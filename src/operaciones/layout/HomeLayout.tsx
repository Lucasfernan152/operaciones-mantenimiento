import { Box, Drawer, Toolbar, IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid, Typography } from '@mui/material';
import {MenuOutlined, TurnedInNot} from '@mui/icons-material';
import { HomeLayoutProps } from "../interfaces";
import { NavBar } from '../components/NavBar';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';


export const HomeLayout = ({children, drawerWidth }: HomeLayoutProps) => {

  const {displayName} = useAppSelector(state => state.auth)

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
                <Typography variant='h6' noWrap component='div'>
                    {displayName}
                </Typography>
               
            </Toolbar>
                <Divider/>
                <List>
                {
                    ['Enero','Febrero','Marzo','Abril'].map( text => (
                        <ListItem key={ text } disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={ text } />
                                    <ListItemText secondary={ 'Exercitation cillum irure elit consectetur.' } />
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