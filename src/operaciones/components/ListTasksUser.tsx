import { Grid } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { getAllTaskOfUser } from '../../firebase/providers';
import { TaskUserComponent } from './TaskUserComponent';


export const ListTasksUser = () => {

  const { photoURL, id } = useAppSelector(state => state.auth);
  const [tareas, setTareas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const setAsyncUsers = async () => {
    const allUsers = await getAllTaskOfUser(id!, true);
    const resolvedUsers = await Promise.all(allUsers);
    setTareas(resolvedUsers);
    setLoading(false)
  
  };

  useEffect(() => {
    setAsyncUsers();
  }, []);


  return (
    <div className="overflow-y-scroll w-full h-screen">
    <Grid container className="w-full ">
      {tareas.map(task => (
        <TaskUserComponent key={task.id} {...task} />
      ))}
      
    </Grid>
  </div>
  )
}
