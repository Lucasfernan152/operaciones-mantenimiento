import React, { useEffect, useState } from 'react'
import { Estado } from '../../storage/useStorage'
import { Chip } from '@mui/material'

export const TaskStateTable = ({estado}: any ) => {

  


if (estado === 'PENDIENTE') return <Chip sx={{fontSize: '0.8rem' , fontWeight: 600, borderRadius: '6px', py: '4px', height: 'min-content' , width: 'min-content' ,  }} label={'Pendiente'} color="info" />
if (estado === "NO REALIZADO") return <Chip label={'No Realizado'} sx={{fontSize: '0.8rem' , fontWeight: 600, borderRadius: '6px', py: '4px', height: 'min-content' , width: 'min-content' ,  }} color="error" />
if (estado === "PROGRAMADO") return <Chip label={'Programado'} sx={{fontSize: '0.8rem' , fontWeight: 600, borderRadius: '6px', py: '4px', height: 'min-content' , width: 'min-content' ,  }} color="warning" />
if (estado === "REALIZADO") return <Chip label={'Realizado'} sx={{fontSize: '0.8rem' , fontWeight: 600, borderRadius: '6px', py: '4px' , height: 'min-content' , width: 'min-content' ,  }} color="success" />  

  

  



  
}
