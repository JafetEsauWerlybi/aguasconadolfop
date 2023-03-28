import React from 'react'
import useAuth from '../auth/useAuth';
import { Navigate, useLocation } from "react-router-dom";
import routes from '../helpers/routes';


const PrivateRoute = ({ children, hasRole: role }) => {
    const location = useLocation();
    //console.log(location);
    const {hasRole, isLogged}= useAuth();

    if(role && !hasRole(role)) return <Navigate to={routes.account} />;
    <Navigate to={routes.loginPath} state={{from:location}} />

    if (!isLogged()) return <Navigate to={routes.login} state={{from:location}} />;

    return children;
};

export default PrivateRoute; 