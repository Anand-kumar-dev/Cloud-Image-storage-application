import { User } from "../models/user.model.js";
import { uploadFile, deleteFile } from "../services/cloudinary.service.js";




export const updateProfile = async (c) => {
  try {
    const { id } = c.req.user;
    const { username, email } = await c.req.json();

    if (!username && !email)
      return c.json({ mes: "Nothing to update" }, 400);

    if (email) {
      const exists = await User.findOne({ email });
      if (exists && exists._id.toString() !== id)
        return c.json({ mes: "Email already in use" }, 400);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { username, email } },
      { new: true }
    ).select("username email avatar");

    return c.json({ data: updatedUser }, 200);
  } catch (error) {
    return c.json({ mes: "Internal Server Error", error }, 500);
  }
};


export const changePassword = async (c) => {
  try {
    const { id } = c.req.user;
    const { oldPassword, newPassword } = await c.req.json();

    if (!oldPassword || !newPassword)
      return c.json({ mes: "Missing fields" }, 400);

    const user = await User.findById(id).select("+password");

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch)
      return c.json({ mes: "Old password incorrect" }, 400);

    user.password = newPassword;
    await user.save();

    return c.json({ mes: "Password updated successfully" }, 200);
  } catch (error) {
    return c.json({ mes: "Internal Server Error", error }, 500);
  }
};


export const updateAvatar = async (c) => {
  try {
    const { id } = c.req.user;
    const body = await c.req.formData();
    const file = body.get("avatar");

    if (!file) return c.json({ mes: "No avatar provided" }, 400);

    const user = await User.findById(id);
    if (!user) return c.json({ mes: "Unauthorized" }, 401);

    if (user.avatar) {
      await deleteFile(user.avatar, "image");
    }

    const uploadResult = await uploadFile(file, "user_avatars", "image");

    user.avatar = uploadResult.public_id;
    await user.save();

    return c.json(
      {
        mes: "Avatar updated",
        avatar: uploadResult.public_id,
      },
      200
    );
  } catch (error) {
    console.log(error);
    return c.json({ mes: "Internal Server Error", error }, 500);
  }
};


export const deleteAvatar = async (c) => {
  try {
    console.log("Deleting avatar...");  
    const { id } = c.req.user;

    const user = await User.findById(id);
    if (!user || !user.avatar)
      return c.json({ mes: "No avatar to delete" }, 400);

    await deleteFile(user.avatar, "image");

    user.avatar = null;
    await user.save();

    return c.json({ mes: "Avatar removed" }, 200);
  } catch (error) {
    return c.json({ mes: "Internal Server Error", error }, 500);
  }
};
