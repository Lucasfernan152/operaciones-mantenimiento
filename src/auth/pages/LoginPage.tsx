
import { Grid, TextField, Button, Alert } from '@mui/material'
import { AuthLayout } from "../layout/AuthLayout"

import { useAppDispatch, useAppSelector, useForm } from "../../hooks";
import { startLoginWithEmailPassword } from "../../storage/auth";
import { useNavigate } from 'react-router';


export const LoginPage = () => {

  const { errorMessage } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { email, password, onInputChange } = useForm({
    email: '',
    password: '',
  });


  const onLogin = () => dispatch(startLoginWithEmailPassword(email, password));




  return (
    <AuthLayout title="Ingresa con tu cuenta" widthContent={450} >
      <Grid
        display={"flex"}
        container
        sx={{ minWidth: '100%', minHeight: '100%', padding: 4 }}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-5"
        >
          <TextField
            label="Correo"
            type="email"
            variant="standard"
            placeholder='example@edensa.com.ar'
            fullWidth
            name="email"
            value={email}
            onChange={onInputChange}
          />
          <TextField
          variant="standard"
            label="Contraseña"
            type="password"
            placeholder='Contrasena'
            fullWidth
            name="password"
            value={password}
            onChange={onInputChange}
          />

          <Grid
            container
            display={!!errorMessage ? '' : 'none'}
            sx={{ my: 1 }}
          >
            <Grid
              item
              xs={12}
            >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Button
            onClick={onLogin}
            variant="contained"
            sx={{
              backgroundColor: 'primary.main',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem', // Ajusta el valor según lo necesites
              paddingY: '0.625rem',
              marginY: 2,// Ajusta el valor según lo necesites
              borderRadius: '0.375rem', // Ajusta el valor según lo necesites
              fontSize: '1rem', // Ajusta el valor según lo necesites
              fontWeight: '500',// Puedes ajustar el valor según lo necesites
              textTransform: 'none',
              color: 'white',

            }}
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Ingresar
          </Button>
        </form>
      </Grid>
    </AuthLayout>
  )
}