import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { setUser, setAuthenticated } from '@/feature/auth/auth.Slice'
import { useApi } from '@/hooks/Apihooks'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, } from 'react-router'
import { toast } from 'sonner'

function Login() {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const { request, loading, error } = useApi()
  const [email, setemail] = useState("")
  const [pass, setpass] = useState("")

  const strings = "Log in to Imaze"
  const navigate = useNavigate()

  const handleSubmit = async () => {

    const response = await request({
      url: "/auth/login",
      method: "POST",
      data: {
        email: email,
        password: pass
      }
    });
    setemail("")
    setpass("")

    dispatch(setUser(response.mes))
    dispatch(setAuthenticated(true))
    toast.success(`welcome ${response.mes.username}`);
    navigate("/dash")

  }
  useEffect(() => {
    if (error) {
      if (error.response?.status == 401) return toast.error(error.response?.data?.mes || "something went wrong")
      if (error.response.status == 500) return toast.error(error.response?.data?.mes || error.response?.data?.error)
      toast.error(error.response?.data?.mes || "Something went wrong");
    }

  }, [error]);
  return (
    <div className='w-screen h-screen bg-black text-white flex justify-center items-center'>
      <div className='w-lg h-lg p-5 rounded-3xl bg-gray-700 flex gap-5 flex-col justify-center items-center'>
        <h2 className='text-2xl flex'>
          {Array.from(strings).map((letter, index) => {
            if (letter == " ") {
              return <span key={index}>&nbsp;</span>
            }
            return <span className='hover:text-yellow-500 p-0' key={index}>{letter}</span>
          })}</h2>
        <Input placeholder='email' value={email} onChange={(e) => { setemail(e.target.value) }} />
        <Input placeholder='password' value={pass} onChange={(e) => { setpass(e.target.value) }} />
        <Button variant='' size='lg' onClick={handleSubmit}>{loading ? <Spinner /> : "login"}</Button>
        <div>
          <Link to={"/signup"} className='hover:underline' >Signup</Link>
        </div>
      </div>
    </div>
  )
}

export default Login