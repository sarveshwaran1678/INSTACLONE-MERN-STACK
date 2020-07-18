import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoutes from './core/APICalls/PrivateRoutes';
import SignUp from './core/SignUp';
import SignIn from './core/SignIn';
import ForgotPassword from './core/ForgotPassword';
import Home from './core/Home';
import EnterOtp from './core/EnterOtp';
import ResetPassword from './core/ResetPassword';
import UserFeed from './core/UserFeed';
import Navbar from './core/Navbar';
import Card from './core/Card';
import UserStories from './core/UserStories';
import UserStoriesPhone from './core/UserStoriesPhone';
import Modal from './core/Modal';

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
                <Route path='/navbar' exact component={Navbar} />
                <Route path='/card' exact component={Card} />
                <Route path='/userfeed' exact component={UserFeed} />
                <Route path='/userstories' exact component={UserStories} />
                <Route path='/modal' exact component={Modal} />
                <Route
                    path='/userstoriesphone'
                    exact
                    component={UserStoriesPhone}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
