import { Button, FormControl, Grid, TextField } from "@mui/material";
import { HomeLayout } from "../layout/HomeLayout";
import { useAppSelector, useForm } from "../../hooks";

import { InputSelectComponent } from "../components/InputSelectComponent";
import { useMappedEnums } from "../hooks/useMappedEnums";
import { Equipo, Prioridad } from "../../storage/useStorage";
import { createNewTask } from "../hooks/useNewTask";

export const NewTaskPage = () => {
  
  const {displayName, email} = useAppSelector(state => state.auth)
  const priorityArray = useMappedEnums(Prioridad);
  const deviceArray = useMappedEnums(Equipo);

  const { userAsignedValue ,observationsValue, onInputChange } = useForm({});


  const onSubmit = (event:any) => {
    event.preventDefault()
    
    const form = event.target

    const formData = new FormData(form);
    const priority = formData.get('Prioridad')
    const device = formData.get('Equipo')

    
    createNewTask(priority, device, email , observationsValue, userAsignedValue, displayName)

    
  }


  return (
    <>
      <HomeLayout drawerWidth={250}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          className="bg-neutral-900 pt-20 pb-6"
          sx={{
            minHeight: "100%",
            height: "auto", // Cambiar a 100vh
            minWidth: "100vw",
            overflowY: "auto", // Cambiar a overflowY para permitir el scroll vertical
          }}
        >
          <Grid
            item
            className="shadow-xl"
            alignItems="center"
            justifyContent="center"
            xs={3}
            sx={{
              width: { sm: "80%", xs: "70vw" },
              backgroundColor: "#f1f1f1",
              padding: 3,
              borderRadius: 2,
            }}
          >
            <form onSubmit={onSubmit}>
              <FormControl fullWidth>
                <TextField
                  label="Observaciones"
                  type="text"
                  placeholder="Observaciones..."
                  fullWidth
                  name="observationsValue"
                  value={observationsValue}
                  onChange={onInputChange}
                />
                <TextField
                  label="Observaciones"
                  type="text"
                  placeholder="Observaciones..."
                  fullWidth
                  name="userAsignedValue"
                  value={userAsignedValue}
                  onChange={onInputChange}
                />

                <InputSelectComponent
                  title={"Prioridad"}
                  id={"id-priority"}
                  selectInput={priorityArray}
                />

                <InputSelectComponent
                  title={"Equipo"}
                  id={"id-device"}
                  selectInput={deviceArray}
                />
              </FormControl>

              <Button
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
                Crear Tarea
              </Button>
            </form>
          </Grid>
        </Grid>
      </HomeLayout>
    </>
  );
};
