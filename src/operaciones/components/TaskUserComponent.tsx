import { Avatar, Divider } from "@mui/material";

import { TaskStateTable } from "./TaskStateTable";
import { getTimeStamp } from "../helpers";

export const TaskUserComponent = ({fechaAviso, observacionPrevia, elemento, ejecutor, estado}: any) => {
   
   
  return (
    <div
    
    className="bg-white m-2 p-2 w-full rounded-md">
      <div className="flex w-full justify-between p-4 items-center">
        <h1 className="font-sans font-bold text-xl">{elemento.nombre}</h1>
        <Avatar sx={{ backgroundColor: "#151235" }}>{ejecutor.nombre.slice(0,1)}</Avatar>
      </div>
      <p className="p-2 font-sans min-h-[50px] text-gray-500 font-semibold">
        {observacionPrevia}
      </p>
      <Divider sx={{ marginY: 1 }} />
      <div className="flex justify-between items-center">
        <p className="font-sans font-bold text-gray-600 px-2">{getTimeStamp(fechaAviso)}</p>
        <TaskStateTable estado={estado} table={false} />
      </div>
    </div>
  );
};
