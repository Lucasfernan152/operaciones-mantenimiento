
import { AuthLayout } from "../layout/AuthLayout";
import { Alert, Button, Grid, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector, useForm } from "../../hooks";
import { registerWhitEmailPassword } from "../../firebase/providers";
import { RegisterUser } from "../../storage/auth/interfaces/User.interface";

import { startRegisterWithEmailPassword } from "../../storage/auth";

export const RegisterPage = () => {
  const { errorMessage } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { email, password, password2, firstName, lastName, onInputChange } =
    useForm({
      email: "",
      password: "",

    });

  const onRegister = () => {

    const displayName = `${firstName} ${lastName}`

    const newUser: RegisterUser = {

      email: email!.toString(),
      password: password!.toString(),
      displayName,
    
    }

    dispatch( startRegisterWithEmailPassword(newUser) )
  }; 

  

  return (
    <AuthLayout title="Registrar Usuario" widthContent={550}>
      <Grid
        display={"flex"}
        container
        sx={{ minWidth: "100%", minHeight: "100%", padding: 4 }}
      >
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Nombre"
                type="text"
                placeholder="Sergio"
                fullWidth
                name="firstName"
                value={firstName}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Apellido"
                type="text"
                placeholder="Sergio"
                fullWidth
                name="lastName"
                value={lastName}
                onChange={onInputChange}
              />
            </Grid>
          </Grid>
          <TextField
            label="Correo"
            type="email"
            placeholder="example@edensa.com.ar"
            fullWidth
            name="email"
            value={email}
            onChange={onInputChange}
          />
          <TextField
            label="Contraseña"
            type="password"
            placeholder=""
            fullWidth
            name="password"
            value={password}
            onChange={onInputChange}
          />

          <TextField
            label="Confirmar Contraseña"
            type="password"
            placeholder=""
            fullWidth
            name="password2"
            value={password2}
            onChange={onInputChange}
          />

          <Grid container display={!!errorMessage ? "" : "none"} sx={{ my: 1 }}>
            <Grid item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Button
            onClick={onRegister}
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem", // Ajusta el valor según lo necesites
              paddingY: "0.625rem",
              marginY: 2, // Ajusta el valor según lo necesites
              borderRadius: "0.375rem", // Ajusta el valor según lo necesites
              fontSize: "1rem", // Ajusta el valor según lo necesites
              fontWeight: "500", // Puedes ajustar el valor según lo necesites
              textTransform: "none",
              color: "white",
            }}
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Registrar
          </Button>
        </form>
      </Grid>
    </AuthLayout>
  );
};
