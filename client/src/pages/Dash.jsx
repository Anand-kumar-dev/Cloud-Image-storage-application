import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { logout } from '@/feature/auth/auth.Slice'
import { useApi } from '@/hooks/Apihooks'
import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

function Dash() {
  const { request, loading, error } = useApi();
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [images , setimages] = useState();
  const [imageupdate , setimageupdate] = useState(0)
  const file = useRef(null)


  const handleSubmit = async () => {
    const response = await request({ url: "/auth/logout", method: "GET" })
    dispatch(logout());
    if (response.ok) return toast.success("log out successfully")
  };

  
  useEffect(() => {
    if (error){
      if(error.response?.status == 401) return dispatch(logout())
      if(error.response?.status == 500) return toast.error(error.response?.data?.mes || error.response?.data?.error)
        toast(error.response?.data?.mes)
      }
  }, [error]);



  useEffect(()=>{
    (async()=>{
       const response = await request({url:"/api/fetch" , method:"POST" });
     setimages(response.data);
     console.log(`fetch data ${JSON.stringify(response)}`)
    })()
  },[imageupdate])


  const addImage = async()=>{
   try {
     const fileObj = file.current?.files?.[0]
    if (!fileObj) {
      toast.error("Please select a file")
      
      return
    }
    const formData = new FormData()
    formData.append("image", fileObj)

     const response = await request({url:"/api/upload" , method:'POST' ,data:formData })
     if(response.ok) {
       toast.success("images added succesfully") 
       setimageupdate(prev => prev  + 1);
       return

     }
   } catch (error) {
      console.log(error)
   }
  }
  return (
    <>
      <div>Dash</div>
      <div className='flex flex-col bg-black text-2xl text-white p-4 gap-4'>
        {user ? Object.entries(user).map(([key, use]) => <div key={key}>{key} : {use}</div>) : "no user info"}
      </div>
      <div className='bg-black w-fit text-2xl flex justify-center items-center flex-wrap text-white rounded-2xl p-5 m-3'>
        {
        images == null ? <div>no images found</div>: images.map((image)=> <img className='max-w-lg max-h-lg m-2' src ={image.imageUrl} key={image._id} />)
        }
      </div>
      <Button onClick={handleSubmit} className='m-6 bg-black text-white p-4 rounded-xl'> {loading ? <Spinner /> : "log out"}</Button>
       <input className='bg-cyan-950 p-3' ref={file} type="file" />
       <Button onClick={addImage}>add images</Button>
    </>
  )
}

export default Dash