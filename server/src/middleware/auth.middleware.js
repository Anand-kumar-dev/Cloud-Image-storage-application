import jwt from "jsonwebtoken";
import { getCookie } from "hono/cookie";

export const verifyToken = async (c, next) => {
  
  try {
    const accessToken = getCookie(c, "accessToken");
    if (!accessToken)
      return c.json({ mes: "you are not authorize to see this webpage" }, 401);
    
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    
    c.req.user = decoded;
    if (!decoded) return c.json({ mes: "invalidated token Unauthorize" }, 401);
    console.log("token is verified");
   await next();
  } catch (error) {
    console.log(error);
    return c.json({ mes: "Unauthorize" }, 401);
  }
};
