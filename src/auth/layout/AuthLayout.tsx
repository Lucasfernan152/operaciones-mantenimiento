import { Grid, Typography } from '@mui/material';
import { AuthLayoutProps } from '../interfaces/';


export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title = '' }) => {
  return (
    
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="bg-gradient-to-r from-blue-950 from-0% via-blue-800 via-60% to-sky-600 to-90%"
      sx={{ minHeight: '100vh', padding: 4, minWidth:'100vw' , }}
    >

      <Grid item
       className='shadow-xl'
       alignItems="center"
       justifyContent="center"
       xs={ 3 }
       sx={{ 
            width: { sm: 450, xs: '300' },
            height: {xs: 500},
            backgroundColor: '#f1f1f1', 
            padding: {sm: 3, xs: 2}, 
            borderRadius: 2 
        }}>

                <img src="../../../public/logo.png" className="mx-auto w-20 md:w-32" /> 
                <h3 className="text-gray-800 text-center mt-4 md:mt-8 text-base font-semibold md:text-3xl  ">{title}</h3>
                <hr className="mt-1 md:mt-4 w-40 md:w-72 h-0.5 bg-neutral-300 text-center mx-auto"/>
            { children }
        </Grid>

    </Grid>

  )
}
