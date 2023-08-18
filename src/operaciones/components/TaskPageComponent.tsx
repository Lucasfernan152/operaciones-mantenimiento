import { Avatar, Divider, Fab } from '@mui/material'
import React from 'react'
import { TaskStateTable } from './TaskStateTable'
import { getTimeStamp } from '../helpers'
import { AccessTime, EditNoteRounded, KeyboardArrowDown, KeyboardArrowUp, KeyboardDoubleArrowUp } from '@mui/icons-material'

export const TaskPageComponent = () => {
  return (
    <div 
      
      className="bg-[#f1f1f1] p-5 w-full rounded-xl">
        <div className="flex w-full justify-between p-2 items-center">
          <h1 className="font-sans font-bold text-xl">
            <span className="text-sm text-gray-500 font-bold">Elemento</span>
            <br/>Elemento 1
            </h1>
          <Avatar sx={{ backgroundColor: "#151235", width: 48, height: 48, fontSize:24, }}>P</Avatar>
        </div>
        
        <Divider sx={{ marginY: 4 }} />

        <div>
            <h1 className="text-gray-900 font-bold">Observacion previa</h1>
            
            <p className="min-h-[120px] my-4 text-gray-950 font-medium">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio non fugit repellendus. Itaque repudiandae et, iure fugiat quam corporis deleniti quia maxime ipsam dolores possimus, aperiam veritatis veniam praesentium dicta.
            </p>
        </div>
        <Divider sx={{ marginY: 4 }} />
        <div className='flex flex-col gap-6'>
        <div className="flex justify-between items-center">
            <h2 className='font-bold text-gray-500'>Fecha de Programacion</h2>
            <p className="flex items-center gap-1 font-bold text-gray-700 px-2"><AccessTime className='text-gray-500' />20/3/10</p>
        </div>
        <div className="flex justify-between items-center">
            <h2 className='font-bold text-gray-500'>Estado</h2>
            <TaskStateTable estado={"No Realizado"} table={false} />
        </div>
        <div className="flex justify-between items-center">
            <h2 className='font-bold text-gray-500'>Creador</h2>
            <h2 className='font-bold text-gray-800'>Julian Vega</h2>
        </div>

        <div className="flex justify-between items-center">
            <h2 className='font-bold text-gray-500'>Prioridad</h2>
            <div className='flex justify-center'>
              <h2 className=' font-bold text-gray-800'>ALTA</h2>
              <KeyboardArrowUp className='pb-[0.20rem] text-amber-600'/>
            </div>
        </div>
        <div className="flex justify-between items-center">
            <h2 className='font-bold text-gray-500'>Equipo</h2>
            <h2 className='font-bold text-gray-800'>Elemento</h2>
        </div>

        <div className='flex justify-center items-center w-full'>
          <Fab color="primary" sx={{boxShadow:'0px 5px 10px rgba(0,0,0,0.2)' ,}} size='large' aria-label="Editar Tarea">
            <EditNoteRounded sx={{fontSize:32}} />
          </Fab>
        </div>
        </div>
    </div>
  )
}
