import { Box } from "@mui/material";

export const NewTaskComponent = () => {
  return (
    <Box
    sx={{
      border: 1,
      p: 1,
      bgcolor: 'background.paper',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh', // Ocupa toda la pantalla vertical
      width: '100vw',  // Ocupa toda la pantalla horizontal
      overflow: 'auto', // Habilita el scroll si el contenido es más largo que la pantalla
      zIndex: 999,      // Ajusta la superposición
    }}
  >
    The content of the Popper.
  </Box>
  );
};
