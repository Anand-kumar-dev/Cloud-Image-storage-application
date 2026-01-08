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
      if (error.response?.status == 401) return toast.error(error.response?.data?.mes || "something went wrong")
      if (error.response.status == 500) return toast.error(error.response?.data?.mes || error.response?.data?.error)
      toast.error(error.response?.data?.mess || "Something went wrong");
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
        Create your account to get started
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
          placeholder="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
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
          onClick={handleSubmit}
          className="mt-2 rounded-xl bg-white text-black hover:bg-neutral-200 transition"
        >
          {loading ? <Spinner /> : "Sign Up"}
        </Button>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-neutral-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-white hover:underline hover:text-yellow-400 transition"
        >
          Log in
        </Link>
      </div>

    </div>
  </div>
)

}

export default Signup