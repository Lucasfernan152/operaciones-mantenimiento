import { Tarea, Estado } from "../../storage/useStorage"



//TODO TIPAR LOS DATOS CORRECTAMENTE


export const createNewTask = (priority:any, device:any, element:any = "element", observations:any, userAsignee:any, currentUser:any) => {

    const tarea1 = new Tarea(
    new Date().getTime().toString(),
    Estado.PENDIENTE,
    currentUser,
    element,
    userAsignee,
    priority,
    device,
    new Date(),
    null,
    observations,
    "",
    true,
    false
    )

    console.log(tarea1)

}
