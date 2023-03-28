import React from 'react'
import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/estilos.css'
export const AuthContext = createContext()


export default function AuthProvider({children}) {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);


    const isLogged =()=>!!user;
    const login =(Nombre,Email, UserName,Telefono, Password, id,rol, respuesta, fromLocation)=> {
        ;
        setUser({
            id:id,
            Nombre:Nombre, 
            userName:UserName,
            password:Password, 
            email:Email,
            role:rol,
            telefono:Telefono,
            respuesta:respuesta,
        });
        if(fromLocation){
            navigate(fromLocation, {replace:true});
        }
    }
    const hasRole =(role)=> user?.role === role;
    const logout =()=> setUser(null);
    const contextValue = {
    user, 
    isLogged,
    hasRole,
    login,  
    logout
    };
    return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>)
}
