import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoutes from './core/APICalls/PrivateRoutes';
import SignUp from './core/SignUp';
import SignIn from './core/SignIn';
import ForgotPassword from './core/ForgotPassword';
import Home from './core/Home';
import EnterOtp from './core/EnterOtp';
import ResetPassword from './core/ResetPassword';
import UserFeed from './PrivateScreens/UserFeedComponents/UserFeed';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signup' exact component={SignUp} />
                <Route path='/signin' exact component={SignIn} />
                <Route
                    path='/forgotpassword'
                    exact
                    component={ForgotPassword}
                />
                <Route path='/enterotp' exact component={EnterOtp} />

                <Route path='/resetpassword' exact component={ResetPassword} />

                <Route path='/userfeed' exact component={UserFeed} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
