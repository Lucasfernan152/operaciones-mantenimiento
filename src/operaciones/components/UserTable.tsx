import React, { useEffect, useState } from 'react';
import { Avatar, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TaskStateTable } from './TaskStateTable';
import { useAppSelector } from '../../hooks';
import { getAllTaskOfUser } from '../../firebase/providers';
import { EstadoTarea } from '../interfaces/Operaciones.interface';
import { getTimeStamp } from '../helpers';

export const UserTable = () => {
  const { photoURL, id } = useAppSelector(state => state.auth);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const setAsyncUsers = async () => {
    const allUsers = await getAllTaskOfUser(id!, true);
    const resolvedUsers = await Promise.all(allUsers);
    setUsuarios(resolvedUsers);
    setLoading(false)
  
  };

  useEffect(() => {
    setAsyncUsers();
  }, []);

  return (
    <TableContainer component={Paper} sx={{width:'auto', overflowX: 'auto', marginX: {xs:0 ,sm:'6px'} }}>
      {loading ? (<div className='h-full w-full gap-4 flex flex-col justify-around p-4 items-center'>
                    <Skeleton animation="wave" variant='rectangular' height={50} width={'100%'} />
                    <Skeleton animation="wave" variant='rectangular' height={50} width={'100%'} />
                    <Skeleton animation="wave" variant='rectangular' height={50} width={'100%'} />
                    <Skeleton animation="wave" variant='rectangular' height={50} width={'100%'} />
                    <Skeleton animation="wave" variant='rectangular' height={50} width={'100%'} />
                    <Skeleton animation="wave" variant='rectangular' height={50} width={'100%'} />
                  </div>
      ) : (
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Usuario Asignado</TableCell>
              <TableCell sx={{ fontWeight: 600, display: {xs: 'none', sm: 'table-cell'} }} align="center">
                Elemento
              </TableCell>
              <TableCell sx={{ fontWeight: 600, display: {xs: 'none', sm: 'table-cell'} }} align="center">
                Observacion Prev
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align='center'>Estado</TableCell>
              <TableCell sx={{ fontWeight: 600, display: {xs: 'none', sm: 'table-cell'} }} align="center">
                Fecha Aviso
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map(({ ejecutor, observacionPrevia, estado, key, fechaAviso }:{estado: EstadoTarea, observacionPrevia:string, key:string, ejecutor:any, fechaAviso:any}) => (
              <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                  }}
                  scope="row"
                >
                  <Avatar sx={{ mr: 1, width: '2rem', height: '2rem', backgroundColor: '#63c7c0' }}>
                    {ejecutor.nombre.slice(0, 1)}
                  </Avatar>
                  {ejecutor.nombre}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8rem', display: {xs: 'none', sm: 'table-cell'} }} padding="none" align="center">
                  Elemento
                </TableCell>
                <TableCell sx={{ fontSize: '0.8rem', display: {xs: 'none', sm: 'table-cell'} }} padding="none" align="center">
                  {observacionPrevia}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8rem' }} padding="none" align="center">
                  <TaskStateTable estado={estado} table />
                </TableCell>
                <TableCell sx={{ fontSize: '0.8rem', display: {xs: 'none', sm: 'table-cell'} }} padding="none" align="center">
                  {getTimeStamp(fechaAviso)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};
