import { Grid } from "@mui/material"
import { HomeLayout } from "../layout/HomeLayout"
import UserTable from '../components/UserTable';



export const OperacionesPage = () => {

    

  return (
    <>
        <HomeLayout drawerWidth={250} >
            <h1>Hola Mundo</h1>
            <Grid
              container
              spacing={ 0 }
              direction="column"
              alignItems="center"
              justifyContent="center"
              className="bg-blue-200"
              sx={{ minHeight: '100vh', padding: 4, minWidth:'100vw' , }}
              >
                <Grid
                  item
                  className='shadow-xl'
                  alignItems="center"
                  justifyContent="center"
                  xs={ 3 }
                  sx={{ 
                       width: { sm: '80%', xs: '70vw' },
                       backgroundColor: 'white', 
                       padding: 3, 
                       borderRadius: 2 
                   }}
                  >
                    <UserTable />
                </Grid>
            </Grid>
        </HomeLayout >
    </>
  )
}
