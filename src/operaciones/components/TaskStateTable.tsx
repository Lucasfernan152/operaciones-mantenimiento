import React, { useState } from "react";
import { EstadoTarea } from "../interfaces/Operaciones.interface";


export const TaskStateTable = ({ estado, table }: {estado:EstadoTarea, table: boolean}) => {

 

  if (estado === "Pendiente")
    return (
      <div className={`w-min px-2 ${table ? 'mx-auto' : ''} gap-1  h-5 flex justify-around bg-opacity-40 bg-sky-400 items-center rounded-3xl`}>
      <div className={`bg-sky-400 w-3 h-3 rounded-full flex items-center justify-center pulse-animation`}>
        <div className="bg-sky-700 w-2 h-2 rounded-full animate-ping"></div>
      </div>
        <span className="font-semibold font-sans text-sm text-sky-950 ">Pendiente</span>
      </div>
    );
  if (estado === "No Realizado")
    return (
        <div className={`w-[118px] px-2 gap-1 ${table ? 'mx-auto' : ''} h-5 flex justify-around bg-opacity-60 items-center rounded-3xl bg-red-600`}>
        
        <div className="bg-red-400 w-3 h-3 rounded-full flex items-center justify-center ">
          <div className="bg-red-700 w-2 h-2 rounded-full "></div>
        </div>
        <span className="font-semibold font-sans text-sm text-red-900 ">No Realizado</span>
      </div>
    );
  if (estado === "Programado")
    return (
        <div className={`w-min px-2 gap-1 ${table ? 'mx-auto' : ''} h-5 flex justify-around bg-opacity-40 items-center rounded-3xl bg-amber-400 `}>
        
        <div className="bg-amber-400 w-3 h-3 rounded-full flex items-center justify-center ">
          <div className="bg-amber-700  w-2 h-2 rounded-full "></div>
        </div>
        <span className="font-semibold font-sans text-sm text-amber-900 ">Programado</span>
      </div>
    );
  if (estado === "Realizado")
    return (
      <div className={`w-min px-2 gap-1 ${table ? 'mx-auto' : ''} h-5 flex justify-around bg-opacity-40 items-center rounded-3xl bg-green-400 `}>
        
        <div className="bg-green-400 w-3 h-3 rounded-full flex items-center justify-center pulse-animation">
          <div className="bg-green-700 w-2 h-2 rounded-full pulse-animation"></div>
        </div>
        <span className="font-semibold font-sans text-sm text-green-900 ">Realizado</span>
      </div>
    );
};
