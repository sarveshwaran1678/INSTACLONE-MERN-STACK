import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './core/SignUp';
import SignIn from './core/SignIn';
import Home from './core/Home';
import PrivateRoutes from './core/APICalls/PrivateRoutes';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signup' exact component={SignUp} />
                <Route path='/signin' exact component={SignIn} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
