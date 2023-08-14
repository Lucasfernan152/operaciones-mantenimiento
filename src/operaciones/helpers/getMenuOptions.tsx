import {
  Add,
  AddTask,
  HomeRounded,
  SystemUpdateAlt,
  Search,
} from "@mui/icons-material";
import { Rol } from "../../storage/auth/interfaces/User.interface";

interface MenuOptions {
  option: string;
  icon: any;
  path: string
}

export const getMenuOptions = (rol: Rol): MenuOptions[] => {
  switch (rol) {
    case "ADMIN":
      return [
        { 
        option: "Home", 
        icon: <HomeRounded />,
        path: '/home/operaciones'
      },
        {
          option: "Nuevo Elemento",
          icon: <Add />,
          path: '/new-element'
        },
        {
          option: "Actualizar Elemento",
          icon: <SystemUpdateAlt />,
          path: '/update-element'
        },
        {
          option: "Nueva Tarea",
          icon: <AddTask />,
          path: '/operaciones/new-task'
        },
      ];
    case "USUARIO":
      return [
        { 
        option: "Home", 
        icon: <HomeRounded />,
        path: '/home/operaciones'
      },
      {
        option: "Nuevo Elemento",
        icon: <Add />,
        path: '/new-element'
      },
      {
        option: "Actualizar Elemento",
        icon: <SystemUpdateAlt />,
        path: '/update-element'
      },
        {
          option: "Buscar Tarea",
          icon: <Search />,
          path: '/search-task'
        },
      ];
  }
};
