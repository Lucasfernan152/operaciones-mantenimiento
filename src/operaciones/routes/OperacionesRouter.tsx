
import { Route, Redirect } from 'react-router';
import { OperacionesPage } from '../pages/OperacionesPage';
import { NewTaskPage } from '../pages/NewTaskPage';

export const OperacionesRouter: React.FC = () => (

    <>
        <Route path="/home/operaciones" exact={true} component={OperacionesPage}/>       
        <Route path="/home/new-task" exact={true} component={NewTaskPage} />

        <Redirect to="/home/operaciones" />
    </>
);