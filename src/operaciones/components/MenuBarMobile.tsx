
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { Grid } from '@mui/material';
import { MenuButtonComponent } from './MenuButtonComponent';
import { AccountCircle, HomeRounded } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router';


export const MenuBarMobile = () => {

  const navigate = useNavigate()

  const navigateToMenu = () => {
    navigate('/home/operaciones')
  }

  const [value, setValue] = useState('recents');

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return ( 
    <Grid className='mb-4' sx={{position:'fixed', bottom:0, width:'92%'}}>
    <BottomNavigation className='rounded-xl shadow-lg bg-[#f1f1f1]' sx={{ width: '100%', height:'58px', }} value={value} onChange={handleChange}>
      <BottomNavigationAction
      onClick={navigateToMenu}
      showLabel={false}
        color='primary.main'
        value="recents"
        icon={<HomeRounded sx={{ fontSize: 36 }}/>}
      />
      <MenuButtonComponent/>
      <BottomNavigationAction color='primary.main' value="folder" icon={<AccountCircle sx={{ fontSize: 36 }} />} />
    </BottomNavigation>
    </Grid>
  );
}