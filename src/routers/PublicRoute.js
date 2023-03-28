import React from 'react'
import useAuth from '../auth/useAuth';
import { Navigate } from "react-router-dom";


const PublicRoute = ({ children }, props) => {
    const {isLogged}= useAuth();
    if (isLogged()) return <Navigate to="/products" />;
    
    return children;
};

export default PublicRoute;