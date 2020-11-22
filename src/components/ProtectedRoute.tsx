import {useAuth} from "@nhost/react-auth";
import {Route, Redirect} from "react-router-dom";
// import React from 'react';
import * as React from 'react'

type ProtectedRouteProps = {
    component: React.FC;
    path: string;
    exact: boolean;

};

const ProtectedRoute = ({component, path, exact}: ProtectedRouteProps) => {
    const {signedIn} = useAuth();

    return signedIn ?
        <Route path={path} component={component} exact={exact}/> :
        <Redirect to="/Login" />

};

export default ProtectedRoute;