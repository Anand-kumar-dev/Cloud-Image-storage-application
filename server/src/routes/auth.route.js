import { Hono } from "hono";
import { login, signup , logout , meAut} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";


const auth = new Hono() 

auth.post("/login",login)

auth.post("/signup",signup)    
 
auth.get("/logout",verifyToken ,logout)

auth.get("/me",verifyToken , meAut)

export default auth;