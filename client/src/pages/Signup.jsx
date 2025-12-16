import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Link, } from 'react-router'
import { useApi } from '@/hooks/Apihooks'
import { toast } from 'sonner'
import { Spinner } from "@/components/ui/spinner"

function Signup() {
  const strings = "Sign in to imaze"
  const { request, loading, error } = useApi()

  const [email, setemail] = useState("")
  const [pass, setpass] = useState("")
  const [username, setusername] = useState("")

  const handleSubmit = async () => {
      const response = await request({
        url: "/auth/signup",
        method: "POST",
        data: {
          username: username,
          email: email,
          password: pass
        }
      });
      setemail("")
      setpass("")
      setusername("")
      console.log(response.mes)
      toast.success(response.mes)
      
  }
useEffect(() => {
  if (error) {
    toast.error(error.response?.data?.mess || "Something went wrong");
  }
 
}, [error ]);

  

  return (
    <div className='w-screen h-screen bg-black text-white flex justify-center items-center'>
      <div className='w-lg h-lg p-5 rounded-3xl bg-gray-700 flex gap-5 flex-col justify-center items-center'>

        { }<h2 className='text-2xl flex'>
          {Array.from(strings).map((letter, index) => {
            if (letter == " ") {
              return <span key={index}>&nbsp;</span>
            }
            return <span className='hover:text-yellow-500 p-0' key={index}>{letter}</span>
          })}</h2>
        <Input placeholder='email' value={email} onChange={(e) => { setemail(e.target.value) }} />
        <Input placeholder='username' value={username} onChange={(e) => { setusername(e.target.value) }} />
        <Input placeholder='password' value={pass} onChange={(e) => { setpass(e.target.value) }} />
        <Button variant='' size='lg' onClick={handleSubmit}>{loading ? <Spinner /> : "signUp"}</Button>
        <div>
          <Link to={"/login"} className='hover:underline' >login</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup