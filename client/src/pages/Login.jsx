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

   try {
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
   } catch (err) {
   }

  }


useEffect(() => {
  if (!error) return;
  const status = error.response?.status;
  if (status === 401) {
    toast.error(error.response?.data?.mes || "Invalid credentials");
  } else if (status === 500) {
    toast.error("Server error");
  } else {
    toast.error("Something went wrong");
  }
}, [error]);



 return (
  <div className="w-screen h-screen bg-gradient-to-br from-black via-neutral-900 to-black flex justify-center items-center text-white">

    {/* Card */}
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

      {/* Title */}
      <h2 className="text-3xl font-semibold text-center mb-2 tracking-tight">
        {Array.from(strings).map((letter, index) => {
          if (letter === " ") return <span key={index}>&nbsp;</span>
          return (
            <span
              key={index}
              className="inline-block transition hover:text-yellow-400"
            >
              {letter}
            </span>
          )
        })}
      </h2>

      <p className="text-center text-sm text-neutral-400 mb-6">
        Welcome back, login to continue
      </p>

      {/* Form */}
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="bg-black/40 border-white/10 text-white placeholder:text-neutral-500 focus:border-white/30"
        />

        <Input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setpass(e.target.value)}
          className="bg-black/40 border-white/10 text-white placeholder:text-neutral-500 focus:border-white/30"
        />

        <Button
          size="lg"
          disabled={loading || !email | !pass}
          onClick={handleSubmit}
          className="mt-2 rounded-xl bg-white text-black hover:bg-neutral-200 transition"
        >
          {loading ? <Spinner /> : "Login"}
        </Button>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-neutral-400">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="text-white hover:underline hover:text-yellow-400 transition"
        >
          Sign up
        </Link>
      </div>

    </div>
  </div>
)

}

export default Login