import { Hono } from "hono";
import { updateProfile, changePassword, updateAvatar, deleteAvatar } from "../controllers/settings.controllers.js"; 
import { verifyToken } from "../middleware/auth.middleware.js";


 const settings = new Hono();

settings.use(verifyToken);  

settings.patch("/profile", updateProfile);

settings.patch("/password", changePassword);

settings.patch("/avatar", updateAvatar);

settings.delete("/avatar", deleteAvatar);

export default settings;