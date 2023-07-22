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
            width: { sm: 450 },
            backgroundColor: 'white', 
            padding: 3, 
            borderRadius: 2 
        }}>

                <img src="../../../public/logo.png" width={100} className="mx-auto" /> 
                <h3 className="text-gray-800 text-center mt-8 text-2xl font-semibold sm:text-3xl">{title}</h3>
                <hr className="mt-4 mb-16 w-72 text-center mx-auto"/>
            { children }
        </Grid>

    </Grid>

  )
}
