import React from 'react'
import Signup from '../Pages/signup'
import Login  from "../Pages/login"
import Dashboard from '../Pages/dashboard';
import Profile from '../Pages/profile';
import { Routes,Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import PublicRoute from './PublicRoute';

const Approutes = () => {
  return (
  
        <Routes>
           <Route path="/" element={<PublicRoute/>} >
                  <Route path="/" element={<Signup/>} />
                  <Route path="/login" element={<Login />} />
                  </Route>
                  <Route path="/" element={<PrivateRoutes />} >
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
        </Route>
                </Routes>
    
  )
}

export default Approutes