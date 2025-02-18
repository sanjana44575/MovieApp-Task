import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'

const PublicRoute = () => {
const isAuthenticated=localStorage.getItem("currUser")
  return (
    isAuthenticated?<Navigate to="/dashboard"></Navigate>:<Outlet/>
  )
}

export default PublicRoute