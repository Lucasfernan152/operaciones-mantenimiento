import { Avatar, Divider, Fab, Skeleton, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { TaskStateTable } from './TaskStateTable'
import { getTimeStamp } from '../helpers'
import { AccessTime, CheckRounded, CloseRounded, EditNoteRounded} from '@mui/icons-material'
import { PriorityIcon } from './PriorityIcon';
import { getTaskById, updateTask } from '../../firebase/providers'
import { useParams } from 'react-router'
import { InputSelectComponent } from './InputSelectComponent'
import { taskUpdated, useMappedEnums } from '../hooks'
import { Estado } from '../../storage/useStorage'


export const TaskPageComponent = () => {
  
  const [task, setTask] = useState<any>()
  const [edit, setEdit] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  const stateArray = useMappedEnums(Estado);

  
  const {id} = useParams()

  const getAsyncTask = async () => {
    const resolvedTask = await getTaskById(id!, true);
    setTask(resolvedTask);
    setLoading(false)
  
  };

  const startUpdateTask = (event: any) => {
    event?.preventDefault();

    const form = event.target;

    const formData = new FormData(form);
    const state = formData.get("Estado") as Estado;
    const observ = formData.get("Observacion") as Estado;


    console.log("llega")
    taskUpdated(id!, observ, state)

    
  };


  useEffect(() => {
    getAsyncTask()
  
  },[loading, edit] )
  
  
  if (loading) return <Skeleton  variant={'rounded'} sx={{height:"80%", borderRadius:'20px', backgroundColor:'#f1f1f1a0'}}/>

  const {elemento, equipo, prioridad, estado ,observacionPrevia, fechaAviso, creador, ejecutor} = task
 

  if (!edit) return (
    <div className="bg-[#f1f1f1] p-5 w-full rounded-xl shadow-2xl ">
        <div className="flex w-full justify-between p-2 items-center">
          <h1 className="font-sans font-bold text-xl">
            <span className="text-sm text-gray-500 font-bold">Elemento</span>
            <br/>{elemento.nombre}
            </h1>
          <Avatar sx={{ backgroundColor: "#151235", width: 48, height: 48, fontSize:24, }}>{ejecutor.nombre.slice(0,1)}</Avatar>
        </div>
        
        <Divider sx={{ marginY: 4 }} />

        <div>
            <h1 className="text-gray-900 font-bold">Observacion previa</h1>
            
            <p className="min-h-[120px] my-4 text-gray-950 font-medium">
                {observacionPrevia}
            </p>
        </div>
        <Divider sx={{ marginY: 4 }} />
        <div className='flex flex-col gap-6'>
        <div className="flex justify-between items-center">
            <h2 className='font-bold text-gray-500'>Fecha de Programacion</h2>
            <p className="flex items-center gap-1 font-bold text-gray-700 px-2"><AccessTime className='text-gray-500' />{getTimeStamp(fechaAviso)}</p>
        </div>
        <div className="flex justify-between items-center">
            <h2 className='font-bold text-gray-500'>Estado</h2>
            <TaskStateTable estado={estado} table={false} />
        </div>
        <div className="flex justify-between items-center">
            <h2 className='font-bold text-gray-500'>Creador</h2>
            <h2 className='font-bold text-gray-800'>{creador.nombre}</h2>
        </div>

        <div className="flex justify-between items-center">
            <h2 className='font-bold text-gray-500'>Prioridad</h2>
            <PriorityIcon priority={prioridad}/>
        </div>
        <div className="flex justify-between items-center">
            <h2 className='font-bold text-gray-500'>Equipo</h2>
            <h2 className='font-bold text-gray-800'>{equipo}</h2>
        </div>

        <div className='flex justify-center items-center w-full'>
          <Fab onClick={()=> setEdit(true)} color="primary" sx={{boxShadow:'0px 5px 10px rgba(0,0,0,0.2)' ,}} size='large' aria-label="Editar Tarea">
            <EditNoteRounded sx={{fontSize:32}} />
          </Fab>
        </div>
        </div>
    </div>
  )

  if(edit) return (
    <>
      <div className="bg-[#f1f1f1] p-5 w-full rounded-xl shadow-2xl ">
        <div className="flex w-full justify-between p-2 items-center">
          <h1 className="font-sans font-bold text-xl">
            <span className="text-sm text-gray-500 font-bold">Elemento</span>
            <br/>{elemento.nombre}
            </h1>
          <Avatar sx={{ backgroundColor: "#151235", width: 48, height: 48, fontSize:24, }}>{ejecutor.nombre.slice(0,1)}</Avatar>
        </div>
        
        <Divider sx={{ marginY: 4 }} />
        <form action="" onSubmit={startUpdateTask}>
        <div className='min-h-[200px] flex flex-col justify-between'>
          
          <TextField
            fullWidth
            id="outlined-multiline-flexible"
            label="Observacion"
            name="Observacion"
            variant='standard'
            multiline
            maxRows={4}
          />
          <InputSelectComponent
                  title={"Estado"}
                  id={"id-state"}
                  variant='standard'
                  selectInput={stateArray}
                />
          
        </div>
        <Divider sx={{ marginY: 4 }} />
        <div className='flex flex-col gap-6'>
        

        <div className='flex justify-around items-center w-full'>
          <Fab type='submit' color="success" sx={{boxShadow:'0px 5px 10px rgba(0,0,0,0.2)' ,}} size='large' aria-label="Editar Tarea">
            <CheckRounded sx={{fontSize:32}} />
            

          </Fab>
          <Fab onClick={()=> setEdit(false)} color="error" sx={{boxShadow:'0px 5px 10px rgba(0,0,0,0.2)' ,}} size='large' aria-label="Editar Tarea">
          <CloseRounded sx={{fontSize:32}} />
            

          </Fab>
        </div>
        </div>
        </form>
    </div>
    </>
  )
}
