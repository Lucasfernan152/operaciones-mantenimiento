import { FormEventHandler, useState } from "react";

import { useAppSelector, useForm } from "../../hooks";
import { createNewTask, useMappedEnums } from "../hooks"

import { Equipo, Prioridad } from "../../storage/useStorage";

import { HomeLayout } from "../layout/HomeLayout";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { InputSelectComponent } from "../components/InputSelectComponent";
import { DropDownAsyncTask } from "../components/DropDownAsyncTask";


export const NewTaskPage = () => {

  const [taskDataID, setTaskDataID] = useState({
    elemento: '',
    usuario: '',
  })

  const { id } = useAppSelector((state) => state.auth);
  const priorityArray = useMappedEnums(Prioridad);
  const deviceArray = useMappedEnums(Equipo);


  const { observationsValue, onInputChange } = useForm({});

  const handleSelected = (selectedItem: any, collection:string ) => {
    switch(collection){
      case 'Usuarios': {

        setTaskDataID({...taskDataID, usuario: selectedItem.id})
        console.log(taskDataID)
        return
      }
      case 'Elementos': {
        setTaskDataID({...taskDataID, elemento: selectedItem.id})
        console.log(taskDataID)
      }

      default: return
    }

  };

  const onSubmit = (event: any) => {
    event?.preventDefault();

    const form = event.target;

    const formData = new FormData(form);
    const priority = formData.get("Prioridad") as Prioridad;
    const device = formData.get("Equipo") as Equipo;
    
    const { usuario, elemento} = {...taskDataID}


    createNewTask(id!, usuario, elemento, priority, device,  observationsValue!.toString())

    
  };

  return (
    
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          className="bg-gradient-to-tr from-sky-700 to-blue-800 pt-20 pb-6"
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
            display="flex"
            alignItems="center"
            flexDirection={"column"}
            justifyContent="space-between"
            xs={3}
            sx={{
              minWidth: { sm: '500px', xs: "70vw" },
              minHeight: {sm:'550px'},
              backgroundColor: "#f1f1f1",
              padding: 3,
              borderRadius: 2,
            }}
          >
            <h3 className="text-gray-800 text-center mt-4 md:mt-8 text-base font-semibold md:text-4xl  ">Nueva Tarea</h3>
            <hr className="mt-1 md:mt-4 w-40 md:w-72 h-0.5 bg-neutral-300 text-center "/>
            <form className=" w-full mx-4" onSubmit={onSubmit}>
              <FormControl fullWidth>
                <Grid xs={12} display={'flex'} justifyContent={"space-between"} sx={{flexDirection: {xs:"column", md: "row"} ,}}>
                  <DropDownAsyncTask column={'Usuarios'} onSelect={handleSelected}/>
                  <DropDownAsyncTask column={'Elementos'} onSelect={handleSelected}/>
                </Grid>
                <div className="md:mt-4">
                  <TextField
                    label="Observaciones"
                    type="text"
                    placeholder="Observaciones..."
                    fullWidth
                    name="observationsValue"
                    value={observationsValue}
                    onChange={onInputChange}
                  />
                </div>
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
  );
};
