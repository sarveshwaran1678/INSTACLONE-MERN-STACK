import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './core/SignUp';
import SignIn from './core/SignIn';
import ForgotPassword from './core/ForgotPassword';
import Home from './core/Home';
import EnterOtp from './core/EnterOtp';
import ResetPassword from './core/ResetPassword';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signup' exact component={SignUp} />
                <Route path='/signin' exact component={SignIn} />
                <Route path='/resetpassword' exact component={ResetPassword} />
                <Route path='/enterotp' exact component={EnterOtp} />
                <Route
                    path='/forgotpassword'
                    exact
                    component={ForgotPassword}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
