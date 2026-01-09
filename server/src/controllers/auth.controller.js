import { User } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.utils.js";
import jwt from "jsonwebtoken";
import { setCookie, getCookie, deleteCookie } from "hono/cookie";

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
    const { username, email, password } = await c.req.json();

    if (!username || !email || !password)
      return c.json({ mess: "user, email , pass missing" }, 401);
    const user = await User.findOne({ email });
    if (user) return c.json({ mes: "User already exists please log in " }, 401);

    const newUser = await User.create({
      username,
      email,
      password,
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
      email: isUser.email
    }
  }, 200)
}