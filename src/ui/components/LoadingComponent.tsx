import { CircularProgress, Grid } from '@mui/material'


export const LoadingComponent = () => {

    
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

      <Grid container
       display="row"
       justifyContent="center"
       sx={{ 
            width: { sm: 450 }
        }}>

            <CircularProgress color="secondary" size={70} />
            
    </Grid>
    </Grid>
  )
}
