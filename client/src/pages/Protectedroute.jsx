import FullScreenLoader from '@/components/FullScreenLoader'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

function Protectedroute({authChecked}) {
   
    const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
   if (!authChecked) return <FullScreenLoader />;
    
    return isAuthenticated ? <Outlet/> :  <Navigate to={"/login"} /> 
}

export default Protectedroute