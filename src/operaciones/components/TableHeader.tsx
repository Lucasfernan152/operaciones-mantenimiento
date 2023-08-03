import { Box, Button, TextField } from '@mui/material'
import React from 'react'

export const TableHeader = () => {
  return (
    <Box display={'flex'} justifyContent={'space-between'}>
        <input type="text" />

        <section>
            <Button>Crear nueva tarea</Button>
            <Button>Buscar Operacion</Button>
        </section>
    </Box>
  )
}
