import { Box, Button, Input, IconButton, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importa useHistory para manejar la redirección
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SplitButton from './SplitButton';

export const TableHeader = () => {
  const navigate = useNavigate(); // Obtiene la instancia de history

  const redirectToNewTask = () => {
    navigate('/home/new-task'); // Redirige a la ruta deseada
  };
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
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
              onClick={() => {}}
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
            <SplitButton/>
          </>
        )}
      </section>
    </Box>
  );
};
