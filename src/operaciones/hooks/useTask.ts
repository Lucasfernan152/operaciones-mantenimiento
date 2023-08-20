
import { addItemAtColumn, updateTask } from "../../firebase/providers"
import { Tarea, Prioridad, Equipo } from "../../storage/useStorage"




//TODO TIPAR LOS DATOS CORRECTAMENTE


export const createNewTask = async (id:string, idAssignedUser: string, idElement:string, priority:Prioridad, device: Equipo, previousDescription: string ) => {

    const tareaCreada = new Tarea( id, idElement, idAssignedUser, priority, device, previousDescription)
    
    console.log(tareaCreada)

    await addItemAtColumn({...tareaCreada}, 'Tareas')
    

}

export const taskUpdated = async (id:string, observ:string, state:string, device:string ,priority:string, rol:string) => {

    const setTaskValue:any = {
        estado:state,
        observacionFinal:observ,
    }
    
    console.log(rol)

    if (rol === "ADMIN") {

        setTaskValue.equipo = device
        setTaskValue.prioridad = priority

        }
    
    console.log(setTaskValue)

    await updateTask(id, setTaskValue)
}