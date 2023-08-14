
import { Route, Redirect } from 'react-router';
import { OperacionesPage } from '../pages/OperacionesPage';
import { NewTaskPage } from '../pages/NewTaskPage';
import { NewElementPage } from '../pages/NewElementPage';
import { UpdateElementPage } from '../pages/UpdateElementPage';
import { SearchTaskPage } from '../pages/SearchTaskPage';
import { TaskByIdPage } from '../pages/TaskByIdPage';
import { HomeLayout } from '../layout/HomeLayout';

export const OperacionesRouter: React.FC = () => (

    <HomeLayout drawerWidth={250}>  
        
        <Route path="/home/operaciones" exact={true} component={OperacionesPage}/>      

        <Route path="/home/new-task" exact={true} component={NewTaskPage} />

        <Route path="/home/new-element" exact={true} component={NewElementPage} />
        <Route path="/update-element" exact={true} component={UpdateElementPage} />
        <Route path="/search-task" exact={true} component={SearchTaskPage} />

        <Route path="/task/:id" exact={true} component={TaskByIdPage} />

        <Redirect to="/home/operaciones" />
    </HomeLayout>
);