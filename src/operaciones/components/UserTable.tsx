import React from 'react'
import { usuarios } from '../../storage/tareas'
import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { TaskStateTable } from './TaskStateTable';
import { useAppSelector } from '../../hooks';

export const UserTable = () => {
  const {photoURL} = useAppSelector(state => state.auth)
  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600,}}  >Usuario Asignado</TableCell>
            <TableCell sx={{ fontWeight: 600,}} align="center">Elemento</TableCell>
            <TableCell sx={{ fontWeight: 600,}} align="center">Observacion Prev</TableCell>
            <TableCell sx={{ fontWeight: 600,}} align="center">Estado</TableCell>
            <TableCell sx={{ fontWeight: 600,}} align="center">Fecha Aviso</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" sx={{display: 'flex', justifyContent:'start', alignItems:'center',}} scope="row">
                <Avatar  src={`${photoURL}`} sx={{mr:1, width: '2rem', height:'2rem',}}/>
                {user.ejecutor.nombre}
              </TableCell>
              <TableCell sx={{fontSize: '0.8rem' ,}} padding='normal' align="center">{user.elemento.nombre}</TableCell>
              <TableCell sx={{fontSize: '0.8rem' ,}} padding='normal' align="center">{user.observacionPrevia}</TableCell>
              <TableCell sx={{fontSize: '0.8rem' ,}} padding='normal' align="center"><TaskStateTable estado={ user.estado }/></TableCell>
              <TableCell sx={{fontSize: '0.8rem' ,}} padding='normal' align="center">{user.fechaAviso}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
