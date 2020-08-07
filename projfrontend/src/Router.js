import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoutes from "./AuthScreens/APICalls/PrivateRoutes";
import SignUp from "./AuthScreens/SignUp";
import SignIn from "./AuthScreens/SignIn";
import ForgotPassword from "./AuthScreens/ForgotPassword";
import Home from "./AuthScreens/Home";
import EnterOtp from "./AuthScreens/EnterOtp";
import ResetPassword from "./AuthScreens/ResetPassword";
import UserFeed from "./PrivateScreens/userFeed";
import SignInBySignUp from "./AuthScreens/SignInBySignUp";
import userProfile from "./PrivateScreens/userProfile";
import UserSettings from "./PrivateScreens/UserProfileComponents/UserSettings";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoutes path="/" exact component={Home} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signinRedirected" exact component={SignInBySignUp} />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
        <Route path="/enterotp" exact component={EnterOtp} />

        <Route path="/resetpassword" exact component={ResetPassword} />

        <PrivateRoutes path="/userfeed" exact component={UserFeed} />
        <PrivateRoutes path="/profile" exact component={userProfile} />
        <PrivateRoutes path="/settings" exact component={UserSettings} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
