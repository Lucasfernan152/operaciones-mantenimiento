import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, ButtonGroup, ClickAwayListener, Grow, IconButton, Input, MenuList, Paper, Popper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination , TableRow, useMediaQuery, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TaskStateTable } from './TaskStateTable';
import { getAllTask } from '../../firebase/providers';
import { EstadoTarea } from '../interfaces/Operaciones.interface';
import { getTimeStamp } from '../helpers';
import { useNavigate } from 'react-router-dom';


const options = ['Pendiente', 'Todo', "No Realizado", 'Programado', 'Realizado'];

export const UserTable = () => {
  
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const setAsyncUsers = async () => {

    const allUsers = await getAllTask( true );
    const resolvedUsers = await Promise.all(allUsers);
    setUsuarios(resolvedUsers);
    setLoading(false);
  
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterSelected = options[selectedIndex];

  const filteredUsuarios = (filterSelected === 'Todo') ? usuarios : usuarios.filter(usuarios => usuarios.estado === filterSelected);

  useEffect(() => {
    setAsyncUsers();
  }, []);  

  const navigate = useNavigate(); // Obtiene la instancia de history

  const redirectToNewTask = () => {
    navigate('/home/new-task'); // Redirige a la ruta deseada
  };
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleClick = () => {
    console.info(`You clicked ${filterSelected}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setPage(0)
  }, [filteredUsuarios])
  

  return (
    <>
     <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      bgcolor="background.paper"
      boxShadow={2}
      sx={{flexDirection:{xs:"column", sm:"row"},  borderRadius: '16px 16px 0 0', marginX: {xs:0 ,sm:'6px'} ,}}
      
    >
      <div className="textInputWrapper w-full">
        <Input placeholder="Juan... Id..." type="text" className="textInput w-full" />
      </div>
      <section className="flex items-center gap-2">
        {isMobile ? (
          <>
            <IconButton
              onClick={redirectToNewTask}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                textTransform: 'none',
              }}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                textTransform: 'none',
              }}
            >
              <SearchIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Button
              onClick={redirectToNewTask}
              variant="contained"
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                textTransform: 'none',
              }}
              startIcon={<AddIcon />}
            >
              Crear nueva tarea
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                textTransform: 'none',
              }}
              onClick={() => {}}
              startIcon={<SearchIcon />}
            >
              Buscar Operacion
            </Button>
            <React.Fragment>
              <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button onClick={handleClick}> {filterSelected} </Button>
                <Button
                  size="small"
                  aria-controls={open ? 'split-button-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onClick={handleToggle}
                >
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
              <Popper
                sx={{
                  zIndex: 155,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu" autoFocusItem>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              selected={index === selectedIndex}
                              onClick={(event) => handleMenuItemClick(event, index)}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </React.Fragment>
          </>
        )}
      </section>
    </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{width:'auto', overflowX: 'auto', marginX: {xs:0 ,sm:'6px'}, maxHeight: 450 }}>
          {loading ? (<div className='h-full w-full gap-4 flex flex-col justify-around p-4 items-center'>
                        <Skeleton animation="wave" variant='rectangular' height={50} width={'100%'} />
                        <Skeleton animation="wave" variant='rectangular' height={50} width={'100%'} />
                        <Skeleton animation="wave" variant='rectangular' height={50} width={'100%'} />
                        <Skeleton animation="wave" variant='rectangular' height={50} width={'100%'} />
                        <Skeleton animation="wave" variant='rectangular' height={50} width={'100%'} />
                        <Skeleton animation="wave" variant='rectangular' height={50} width={'100%'} />
                      </div>
          ) : (
            <Table stickyHeader sx={{ minWidth: 300 }} aria-label="simple table">
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
                {filteredUsuarios
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(({ ejecutor, observacionPrevia, estado, key, fechaAviso, id }:{estado: EstadoTarea, observacionPrevia:string, key:string, ejecutor:any, fechaAviso:any, id:string}) => {
                  return(
                    <TableRow hover role="checkbox" onClick={()=>navigate(`/task/${id}`)} tabIndex={-1} key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[ 6, 10, 25, 100, { value: -1, label: 'Todo' } ]}
          component="div"
          count={filteredUsuarios.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
          showFirstButton={true}
          showLastButton={true}
        /> 
      </Paper>
    </>
  );
};
