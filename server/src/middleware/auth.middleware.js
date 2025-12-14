
import jwt from "jsonwebtoken";
import { getCookie } from "hono/cookie";



export const verifyToken = async (c , next) => {

  try {
    const accessToken = getCookie(c, "accessToken");
    if (!accessToken) return c.status(200).json({ mes: "you are not authorize to see this webpage" })

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    
    if (!decoded) return c.status(401).json({ mes: "invalidated token Unauthorize" })
    c.req.user = decoded;
    next()
  } catch (error) {
    console.log(error)
    return c.status(401).json({ mes: "Unauthorize" })
  }
}