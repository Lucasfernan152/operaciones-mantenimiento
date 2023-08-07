import  { useState } from "react"; // Importa useState
import { Box, Button } from "@mui/material";
import { Redirect } from "react-router";

export const TableHeader = () => {
  const [redirect, setRedirect] = useState(false); // Agrega estado para la redirección

  const redirectToNewTask = () => {
    setRedirect(true); // Establece el estado para activar la redirección
  };

  // Si el estado "redirect" es verdadero, realiza la redirección
  if (redirect) {
    return <Redirect to="/home/new-task" />;
  }

  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <input type="text" />

      <section>
        <Button onClick={redirectToNewTask}>Crear nueva tarea</Button>
        <Button>Buscar Operacion</Button>
      </section>
    </Box>
  );
};
