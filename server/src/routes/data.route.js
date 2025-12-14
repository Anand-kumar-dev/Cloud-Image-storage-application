import { Hono } from "hono";
import { fetchData, saveData, savefile } from "../controllers/data.controller";
import { v2 as cloudinary } from "cloudinary";
const data = new Hono()

data.post("fetch" , fetchData );

data.post("save" , saveData);


data.post("upload" , savefile);

export default data