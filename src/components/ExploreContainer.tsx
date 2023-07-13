import './ExploreContainer.css';
import { Usuario, Rol, useStorage } from '../storage/useStorage'

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  const { isLoading, usuarios, saveUsuario, deleteUsuario } = useStorage();

  const createUser = () => {
    saveUsuario({ id: "1", mail: 'example@gmail.com', nombre: 'Example Name', rol: Rol.USUARIO, local: true, deleted: false })
    saveUsuario({ id: "2", mail: 'example@gmail.com', nombre: 'Example Name', rol: Rol.USUARIO, local: true, deleted: false })
    saveUsuario({ id: "3", mail: 'example@gmail.com', nombre: 'Example Name', rol: Rol.USUARIO, local: true, deleted: false })
    saveUsuario({ id: "4", mail: 'example@gmail.com', nombre: 'Example Name', rol: Rol.ADMIN, local: true, deleted: false })
  }
  const deleteUser = () => {
    deleteUsuario({ id: "1", mail: 'example@gmail.com', nombre: 'Example Name', rol: Rol.USUARIO, local: true, deleted: false })
  }

  return (
    <div id="container">
      {!isLoading && <>
        <strong>Crear Usuario</strong>
        <button onClick={createUser}>Crear</button>
        <strong>Borrar Usuario</strong>
        <button onClick={deleteUser}>Eliminar</button>
        <ul>
          {
            usuarios.filter(usuario => !usuario.deleted).map(usuario => '<li>' + usuario.id + '</li>')
          }
        </ul>
      </>
      }
    </div>
  );
};

export default ExploreContainer;
