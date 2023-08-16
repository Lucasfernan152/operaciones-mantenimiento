
import { Route, Redirect } from 'react-router';
import { OperacionesPage } from '../pages/OperacionesPage';
import { NewTaskPage } from '../pages/NewTaskPage';
import { NewElementPage } from '../pages/NewElementPage';
import { UpdateElementPage } from '../pages/UpdateElementPage';
import { SearchTaskPage } from '../pages/SearchTaskPage';
import { TaskByIdPage } from '../pages/TaskByIdPage';
import { HomeLayout } from '../layout/HomeLayout';
import { useMediaQuery } from '@mui/material';
import { HomeLayoutMobile } from '../layout/HomeLayoutMobile';

export const ResponsiveDesign = ({children, mobile}:{children: any, mobile:boolean}) => {


    return ((mobile)? (<HomeLayout drawerWidth={250}>{children}</HomeLayout>)
                    :(<HomeLayoutMobile>{children}</HomeLayoutMobile>))
     
   }
   

export const OperacionesRouter: React.FC = () => {
    const matches = useMediaQuery('(min-width:600px)');


return (    
    <ResponsiveDesign mobile={matches}>  
        
        <Route path="/home/operaciones" exact={true} component={OperacionesPage}/>      

        <Route path="/home/new-task" exact={true} component={NewTaskPage} />

        <Route path="/home/new-element" exact={true} component={NewElementPage} />
        <Route path="/update-element" exact={true} component={UpdateElementPage} />
        <Route path="/search-task" exact={true} component={SearchTaskPage} />

        <Route path="/task/:id" exact={true} component={TaskByIdPage} />

        <Redirect to="/home/operaciones" />
    </ResponsiveDesign>
);
}



