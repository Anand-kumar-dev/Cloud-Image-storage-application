import { Hono } from "hono";
import { fetchData, savefile } from "../controllers/data.controller";
import { verifyToken } from "../middleware/auth.middleware.js";
 
const data = new Hono()

data.use(verifyToken);

data.post("/fetch" , fetchData );

data.post("/upload" , savefile);

export default data