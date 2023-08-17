import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import { Grid } from '@mui/material';
import { MenuButtonComponent } from './MenuButtonComponent';
import { AccountCircle, HomeRounded } from '@mui/icons-material';


export const MenuBarMobile = () => {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Grid className='mb-4 ' sx={{position:'fixed', bottom:0, width:'92%'}}>
    <BottomNavigation className='rounded-xl shadow-lg bg-[#f1f1f1]' sx={{ width: '100%', height:'58px', }} value={value} onChange={handleChange}>
      <BottomNavigationAction
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