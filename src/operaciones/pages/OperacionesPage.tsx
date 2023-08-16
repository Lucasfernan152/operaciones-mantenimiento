import { Grid } from "@mui/material";

import { UserTable } from "../components/UserTable";

import { TableHeader } from "../components/TableHeader";
import { useAppSelector } from "../../hooks";
import { ListTasksUser } from "../components/ListTasksUser";

export const OperacionesPage = () => {
  
  const { userRol } = useAppSelector((state) => state.auth);

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        className=" bg-gradient-to-tr from-sky-700 to-blue-800 pt-5 md:pt-20 pb-6"
        sx={{
          minHeight: "100%",
          height: "auto", // Cambiar a 100vh
          minWidth: "100vw",
          overflowY: "auto", // Cambiar a overflowY para permitir el scroll vertical
        }}
      >
        {userRol === "ADMIN" ? (
          <Grid
            item
            className="shadow-xl"
            alignItems="center"
            justifyContent="center"
            xs={3}
            sx={{
              width: { sm: "80%", xs: "100%" },
              backgroundColor: "#f1f1f1",
              paddingY: 3,
              borderRadius: 2,
            }}
          >
            <TableHeader />
            <UserTable />
          </Grid>
        ) :( <ListTasksUser />)}
      </Grid>
    </>
  );
};
