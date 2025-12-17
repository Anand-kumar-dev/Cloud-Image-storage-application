import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { logout } from '@/feature/auth/auth.Slice'
import { useApi } from '@/hooks/Apihooks'
import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

function Dash() {
    const { request, loading, error } = useApi()
  const { user} = useSelector(state=> state.auth)
  const dispatch = useDispatch()
  const handleSubmit = async () => {
    const response = await request({ url: "/auth/logout", method: "GET", })
    dispatch(logout());
     if(response.ok) return toast.success("log out successfully")
  }
  useEffect(() => {
    if (error) return toast.error(error.response?.data?.mes || "log out failed")
  }, [error])

  return (
    <>

      <div>Dash</div>
      <div className='flex flex-col bg-black text-2xl text-white p-4 gap-4'>
        {user? Object.values(user).map((use)=> <div keys={nanoid}>{use}</div>): "no user info"}
      </div>
      <Button onClick={handleSubmit} className='m-6 bg-black text-white p-4 rounded-xl'> {loading ? <Spinner /> : "log out"}</Button></>
  )
}

export default Dash