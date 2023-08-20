import { TextField } from '@mui/material'
import { InputSelectComponent } from './InputSelectComponent'
import { Equipo, Estado, Prioridad } from '../../storage/useStorage';
import { useMappedEnums } from '../hooks';

const stateArray = useMappedEnums(Estado);
const deviceArray = useMappedEnums(Equipo);
const priorityArray = useMappedEnums(Prioridad)

export const TaskEditFormComponent = () => {

    

  return (
    <>
        <TextField
                fullWidth
                id="outlined-multiline-flexible"
                label="Observacion"
                name="Observacion"
                variant="standard"
                multiline
                maxRows={4}
              />

              
        <InputSelectComponent
                title={"Estado"}
                id={"id-state"}
                variant="standard"
                selectInput={stateArray}
              />
    </>
  )
}

export const TaskEditAdminFormComponent = () => {

    const stateArray = useMappedEnums(Estado);

  return (
    <>
        <TextField
                fullWidth
                id="outlined-multiline-flexible"
                label="Observacion"
                name="Observacion"
                variant="standard"
                multiline
                maxRows={4}
              />
              
        <InputSelectComponent
                title={"Equipo"}
                id={"id-device"}
                variant="standard"
                selectInput={deviceArray}
              />
        <InputSelectComponent
                title={"Prioridad"}
                id={"id-priority"}
                variant="standard"
                selectInput={priorityArray}
              />
        <InputSelectComponent
                title={"Estado"}
                id={"id-state"}
                variant="standard"
                selectInput={stateArray}
              />
        
    </>
  )
}
