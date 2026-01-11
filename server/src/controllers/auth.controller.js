import { User } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.utils.js";
import jwt from "jsonwebtoken";
import { setCookie, getCookie, deleteCookie } from "hono/cookie";
import { uploadFile } from "../services/cloudinary.service.js";



export const login = async (c) => {

  const { email, password } = await c.req.json();
  if (!email || !password)
    return c.json({ mes: "email or password is not there" }, 401);

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) return c.json({ mes: "User not found" }, 401);

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) return c.json({ mes: "Incorrect password" }, 401);
    const accessToken = generateToken(user.id);

    setCookie(c, "accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });


    return c.json(
      {
        mes: {
          username: user.username,
          email: user.email,
          avatar: user.avatar,  
        },
        accesstoken: accessToken,
      },
      200
    );
  } catch (error) {
    console.log(error);
    return c.json({ mes: `Internal Server Error ${error}`, error }, 500);
  }
};


export const signup = async (c) => {
  try {
   const body = await c.req.formData();

    const username = body.get("username");
    const email = body.get("email");
    const password = body.get("password");
    const file = body.get("avatar");
   console.log(file);
    if (!username || !email || !password)
      return c.json({ mess: "user, email , pass missing" }, 401);

    const user = await User.findOne({ email });
    if (user) return c.json({ mes: "User already exists please log in " }, 401);


    let uploadavatar = null;
    if(file){
             const uploadResult = await uploadFile(file , "user_avatars" , "image");
              uploadavatar =  uploadResult.public_id;
             console.log("avaatar uploaded successfully:", uploadResult);
    }

    const newUser = await User.create({
      username,
      email,
      password,
      avatar: uploadavatar,  
    });
    console.log(`new user signned in details are ::${newUser}`);

    return c.json({ mes: "User create successfully please log in" }, 200);
  } catch (error) {
    console.log(`erorr while signing up ${error}`);
    c.json({ mes: "Inernal server error", error }, 500);
  }
};


export const logout = async (c) => {
  try {
    const accessToken = getCookie(c, "accessToken");

    if (!accessToken)
      return c.json({ mes: "Unauthorize" }, 401);

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (!decoded) return c.json({ mes: "Unauthorize" }, 401);

    deleteCookie(c, "accessToken", {
      path: "/",
    });
    console.log("user logged out")
    return c.json({ mes: "logged out successfully" }, 200);
  } catch (error) {
    c.json({ mes: "Internal Server Error", error }, 500);
  }
};


export const meAut = async (c) => {
  const { id } = c.req.user;
  console.log(`me aut called for user id :: ${id}`);
  const isUser = await User.findById(id);
  if (!isUser) return c.json({ mes: "Unauthorized" }, 401)
  return c.json({
    mes: {
      username: isUser.username,
      email: isUser.email,
      avatar: isUser.avatar,  
    }
  }, 200)
}