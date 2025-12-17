import { User } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.utils.js";
import jwt from "jsonwebtoken";
import { setCookie  , getCookie , deleteCookie} from "hono/cookie";

export const login = async (c) => {
  console.log(await c.req.json());
  const { email, password } = await c.req.json();
  if (!email || !password)
    return c.json({ mes: "email or password is not there" }, 400);

  try {
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user) return c.json({ mes: "User not found" }, 200);

    const isPasswordCorrect = await user.comparePassword(password);
    console.log(isPasswordCorrect); 
    if (!isPasswordCorrect) return c.json({ mes: "password is incorect" }, 200);

    const accessToken = generateToken(user.id);

    await setCookie(c, "accessToken", accessToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "Lax",
      maxAge: 60 * 60 * 24, 
      path: "/",
    });
    c.req.user = user;
    return c.json(
      {
        mes: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
        accesstoken: accessToken,
      },
      200
    );
  } catch (error) {
    console.log(error);
    c.json({ mes: `error in loging in ${error}` });
  }
};

export const signup = async (c) => {
  try {
    const { username, email, password } = await c.req.json();
    
    if(!username || !email || !password) return c.json({mess:"user, email , pass missing"}, 404)
    const user = await User.findOne({ email });
    if (user) return c.json({ mes: "User already exists please log in " }, 201);

    const newUser = await User.create({
      username,
      email,
      password,
    });
    console.log(newUser)

    return c.json({ mes: "User create successfully please log in" }, 200);
  } catch (error) {
    console.log(`erorr while signing up ${error}`);
    c.json({ mes: "Inernal server error" }, 500);
  }
};

export const logout = async (c) => {
  try {
    const accessToken = getCookie(c, "accessToken");
    console.log("accessToken", accessToken);    
    if (!accessToken)
      return c.json({ mes: "you are not authorize to see this webpage" },400);

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (!decoded) return c.json({ mes: "Unauthorize" },401);

    deleteCookie(c,"accessToken", {
      path: "/",
    });

   return c.json({ mes: "logged out successfully" },200);
  } catch (error) {
    console.log("error while logging out" + error);
    c.json({ mes: "error while logging out" + error },400);
  }
};
