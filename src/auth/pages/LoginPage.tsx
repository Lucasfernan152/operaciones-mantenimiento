import { IonPage } from "@ionic/react"
import { Grid, TextField, Button } from '@mui/material'
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from 'react-redux'
import { singWithGoogle } from "../../storage/auth"
import { signInWithGoogle } from '../../firebase/providers';

export const LoginPage = () => {

  const {} = useSelector((state:any) => state.auth)
  const dispatch = useDispatch()

  const {email, password, onInputChange} = useForm({
    email: '',
    password: '',
  })

  const onGoogleSignIn = async() => {
  
    const results = await signInWithGoogle()


    

  }



  return (
    <AuthLayout title="Ingresa con tu cuenta">
        <Grid
        display={"flex"}
        container
        sx={{ minWidth: '100%', minHeight:'100%', padding: 4 }}
        >
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-5"
                >
                    <TextField 
                      label="Correo" 
                      type="email" 
                      placeholder='example@edensa.com.ar' 
                      fullWidth
                      name="email"
                      value={email}
                      onChange={onInputChange}
                    />
                    <TextField 
                      label="Contraseña" 
                      type="password" 
                      placeholder='Contrasena' 
                      fullWidth
                      name="password"
                      value={password}
                      onChange={onInputChange}
                    />
                    
                    <Button
                        variant="contained"
                        sx={{
                        backgroundColor: 'primary.main',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem', // Ajusta el valor según lo necesites
                        paddingY: '0.625rem', 
                        marginY:2,// Ajusta el valor según lo necesites
                        borderRadius: '0.375rem', // Ajusta el valor según lo necesites
                        fontSize: '1rem', // Ajusta el valor según lo necesites
                        fontWeight: '500',// Puedes ajustar el valor según lo necesites
                        textTransform:'none',
                        color: 'white',
                          
                        }}
                        type="submit"
                          className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                        >
                          Ingresar
                      </Button>
                </form>
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
                        marginY:2,// Ajusta el valor según lo necesites
                        border: '0.4px solid #16161655', // Puedes agregar el color de borde aquí
                        borderRadius: '0.375rem', // Ajusta el valor según lo necesites
                        fontSize: '1rem', // Ajusta el valor según lo necesites
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
