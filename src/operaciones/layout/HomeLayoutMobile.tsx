
import { Button } from '@mui/material';
import { MenuBarMobile } from '../components/MenuBarMobile';
import { ArrowBackIosNew, NotificationsRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router';

export const HomeLayoutMobile = ({children}:any) => {

  const navigate = useNavigate()


  return (
    <div className='flex justify-center'>
      <div className='fixed top-0 z-[80] flex justify-between items-center bg-[#f1f1f1] h-16 w-[92%] shadow-xl rounded-b-2xl'>
        <Button sx={{borderRadius:'50%', height:40, width:10,}} onClick={() => navigate(-1) }><ArrowBackIosNew/></Button>
        <h1 className='text-2xl font-bold'>Inicio</h1>
        <Button><NotificationsRounded sx={{ fontSize:28,borderRadius:'50%'}}/></Button>
      </div>
     
      {children}
      <MenuBarMobile/>
    </div>
  )
}
