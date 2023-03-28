import React from 'react'
import Login from '../Login'
import Register from '../Register'
import Home from '../Home'
import Account from '../Account'
import Products from '../Products'
import Product from '../Product'
import User from '../admin/User'
import NF from '../NF'
import PrivateRoute from './PrivateRoutes'
import { roles } from '../helpers/roles'
import routes from '../helpers/routes'
import { Routes, Route } from 'react-router-dom'
import PublicRoute from './PublicRoute'
import ProductsAdmin from '../admin/Products'
import Compras from '../admin/compras'
import Registro from '../admin/Registros'
import Nosotros from '../Nosotros'

export default function AppRouters() {
  return (
        <Routes>
        <Route path={routes.home} element={<Home/>}/>  
        <Route path={routes.nosotros} element={<Nosotros/>}/>  
        <Route path={routes.register} element={<PublicRoute><Register/></PublicRoute> }/>
        <Route path={routes.login} element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path={routes.account} element={<PrivateRoute><Account/></PrivateRoute>}/>
        <Route path={routes.products} element={<PrivateRoute><Products/></PrivateRoute>}/>
        <Route path={routes.product()} element={<PrivateRoute><Product/></PrivateRoute>}/>
        <Route  path={routes.admin.users} element={<PrivateRoute hasRole={roles.admin}><User/></PrivateRoute>}/>
        <Route  path={routes.admin.products} element={<PrivateRoute hasRole={roles.admin}><ProductsAdmin/></PrivateRoute>}/>
        <Route  path={routes.admin.compras} element={<PrivateRoute hasRole={roles.admin}><Compras/></PrivateRoute>}/>
        <Route  path={routes.admin.registros} element={<PrivateRoute hasRole={roles.admin}><Registro/></PrivateRoute>}/>
        
        <Route path='*' element={<NF/>}/>
        </Routes>
  )
}
