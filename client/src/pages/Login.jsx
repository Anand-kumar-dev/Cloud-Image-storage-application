import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthenticated, setUser } from '../feature/auth/auth.Slice';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
function Login() {

const auth = useSelector((state)=>state.auth.isAuthenticated);
console.log(auth)
const dispatch = useDispatch();
  return (
  <>
    <div className='bg-black text-white'>
      <div className='bg-amber-400'>Login </div>
    <div>auth :{auth}</div>
<Button variant="outline" onClick={()=>toast("hi there")}>It works</Button>;

    </div>
    </>
  )
}

export default Login

