import mongoose from "mongoose";
import { userData } from "../models/data.model";
import { User } from "../models/user.model";
import { uploadFile } from "../services/cloudinary.service";


export const savefile = async (c) => {
  const body = await c.req.parseBody();
  const file = body.image;
  console.log(file);
  if (!file) {
    return c.json("No file provided", 400);
  }

  try {
    const result = await uploadFile(file);
    await userData.create({
      userId: c.req.user.id,
      imageUrl: result.secure_url,
      imageId: result.public_id,
    });
    c.status(200);
    console.log(`File uploaded successfully: ${JSON.stringify(result)}`);
    return c.json({ data: result.url }, 200);
  } catch (error) {
    console.log(`error while fetching ${JSON.stringify(error)}`);

    c.status(400);
    return c.json({ error: error });
  }
};

export const fetchData = async (c) => {
  const { id } = await c.req.user;
  console.log(id);
  try {
    const text = await userData.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(id) } },
    ]);

    c.status(200);
    return c.json({ data: text }, 200);
  } catch (error) {
    console.error(`error while fetching ${error}`);
    return c.json({ mes: "Internal Server Error", error }, 500);
  }
};

export const saveData = async (c) => {
  const body = await c.req.json();
  const { data } = body;
  console.log(body + data);
  try {
    await userData.create({
      text: data,
    });
    return c.json({ mess: "data saved succesfully" }, 200);
  } catch (error) {
    console.error(`error while saving ${error}`);
    return c.json({ mes: "Internal Server Error", error }, 500);
  }
  return c.text("data saved");
};
