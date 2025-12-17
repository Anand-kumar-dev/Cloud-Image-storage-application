import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

function Protectedroute() {
    
    const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)

    return isAuthenticated ? <Outlet/> :  <Navigate to={"/login"} /> 
}

export default Protectedroute