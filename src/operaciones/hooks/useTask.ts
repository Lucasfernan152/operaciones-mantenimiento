
import { addItemAtColumn, updateTask } from "../../firebase/providers"
import { Tarea, Prioridad, Equipo } from "../../storage/useStorage"




//TODO TIPAR LOS DATOS CORRECTAMENTE


export const createNewTask = async (id:string, idAssignedUser: string, idElement:string, priority:Prioridad, device: Equipo, previousDescription: string ) => {

    const tareaCreada = new Tarea( id, idElement, idAssignedUser, priority, device, previousDescription)
    
    await addItemAtColumn({...tareaCreada}, 'Tareas')
    

}

export const taskUpdated = async (id:string, observ:string, state:string) => {

    const setTaskValue = {
        estado:state,
        observacionFinal:observ
    }
    
    await updateTask(id, setTaskValue)
}