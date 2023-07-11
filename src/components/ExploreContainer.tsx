import './ExploreContainer.css';
import { Rol, useStorage } from '../storage/useStorage'

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  const { saveUsuario, deleteUsuario } = useStorage();

  const createUser = () => {
    saveUsuario({id: "asdadasdasdasdasdasd", mail: 'example@gmail.com', nombre: 'Example Name', rol: Rol.USUARIO, local: true, deleted: false})
  }
  const deleteUser = () => {
    deleteUsuario({id: "asdadasdasdasdasdasd", mail: 'example@gmail.com', nombre: 'Example Name', rol: Rol.USUARIO, local: true, deleted: false})
  }

  return (
    <div id="container">
      <strong>Crear Usuario</strong>
      <button onClick={createUser}>Crear</button>
      <strong>Borrar Usuario</strong>
      <button onClick={deleteUser}>Crear</button>
    </div>
  );
};

export default ExploreContainer;
