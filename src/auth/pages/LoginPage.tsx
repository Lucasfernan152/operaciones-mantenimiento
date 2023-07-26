import { signWithGoogle } from '../../storage/auth'


import { useAppDispatch, useAppSelector, useForm } from '../../hooks'

import { AuthLayout } from '../layout/AuthLayout'

import { Grid, Button, Alert } from '@mui/material'
import { useMemo } from 'react'

export const LoginPage = () => {

  const {errorMessage} = useAppSelector( state => state.auth)
  const dispatch = useAppDispatch()



  const onGoogleSignIn = () => {
      dispatch(signWithGoogle())
  }

  const setError = (useMemo(() => {
    
  }, [errorMessage]))




  return (
    <AuthLayout title="Ingresa con tu cuenta">
        <Grid
        display={"flex"}
        container
        sx={{ minWidth: '100%', minHeight:'100%', padding: {md: 4, sx: 2} }}
        >
              
          <Alert 
            variant='filled'
            style={{
              display: (!!errorMessage) ? '' : 'none',
            }}
            severity='error' 
            sx={{
              width: "100%",
              fontSize:{md:'1rem', xs: '0.8rem'},
              textAlign: 'center'
             }} 
            >
              {errorMessage}
          </Alert>
                <Button
                  onClick={ onGoogleSignIn }
                  variant="outlined"
                  
                  sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem', // Ajusta el valor según lo necesites
                        paddingY: '0.625rem', 
                        marginY: 1,// Ajusta el valor según lo necesites
                        border: '0.4px solid #16161655', // Puedes agregar el color de borde aquí
                        borderRadius: '0.375rem', // Ajusta el valor según lo necesites
                        fontSize: {md:'1rem', xs: '0.8rem'}, // Ajusta el valor según lo necesites
                        fontWeight: '500',// Puedes ajustar el valor según lo necesites
                        textTransform:'none',
                        color: 'black',
                        '&:hover': {
                          border: '0.4px solid #16161677',
                          backgroundColor:'#e6e6e6' // Cambiar el color del texto al hacer hover
                        } // Cambiar el color del texto a negro
                         // Cambiar el color del borde a negro
                      }}
                    className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg shadow-lg text-sm font-medium">
                    <img src="../../../public/google.svg" width={18} />
                    Continuar con Google
                </Button>    
        </Grid>
    </AuthLayout>
  )
}
