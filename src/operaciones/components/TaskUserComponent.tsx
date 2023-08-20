import { Avatar, Divider } from "@mui/material";
import {AccessTime} from '@mui/icons-material'
import { TaskStateTable } from "./TaskStateTable";
import { getTimeStamp } from "../helpers";
import { useNavigate } from "react-router";

export const TaskUserComponent = ({fechaAviso, observacionPrevia, elemento, ejecutor, estado, id}: any) => {
  
  const navigate = useNavigate()

  const onSearchTask = () => {
    navigate(`/task/${id}`)
  } 

  
  return (
    <div 
      onClick={onSearchTask}
      className="bg-[#f1f1f1] roundedCard shadow-md mx-auto my-2 p-2 w-[90%]">
        <div className="flex w-full justify-between p-2 items-center">
          <h1 className="font-sans font-bold text-xl">{elemento.nombre}</h1>
          <Avatar sx={{ backgroundColor: "#151235" }}>{ejecutor.nombre.slice(0,1)}</Avatar>
        </div>
        <p className="p-2 font-sans min-h-[50px] text-gray-500 font-semibold">
          {observacionPrevia}
        </p>
        <Divider sx={{ marginY: 1 }} />
        <div className="flex justify-between items-center">
          <p className="font-sans flex items-center gap-1 font-bold text-gray-600 px-2"><AccessTime />{getTimeStamp(fechaAviso)}</p>
          <TaskStateTable estado={estado} table={false} />
        </div>
    </div>
  );
};
