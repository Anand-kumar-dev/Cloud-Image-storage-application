import { Hono } from "hono";
import { login, signup , logout} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";


const auth = new Hono() 

auth.post("/login",login)

auth.post("/signup",signup)    
 
auth.get("/logout",verifyToken ,logout)

export default auth;