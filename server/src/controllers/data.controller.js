import { userData } from "../models/data.model";
import { v2 as cloudinary } from "cloudinary";
import { uploadFile } from "../services/cloudinary.service";

export const savefile = async (c) => {
  const body = await c.req.parseBody();
  const file = body.file;
  if (!file) {
    return c.json("No file provided", 400);
  }

  try {
    const result = await uploadFile(file);
    await userData.create({
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
  const { id } = await c.req.json();
  console.log(id);
  try {
    const text = await userData.findById(id);

    c.status(200);
    return c.json({ data: text });
  } catch (error) {
    console.error(`error while fetching ${error}`);
    c.status(400);
    return c.json({ error: error });
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
    c.status(200);
    return c.json({ mess: "data saved succesfully" });
  } catch (error) {
    console.error(`error while saving ${error}`);
    c.status(400);
    return c.json({ error: error });
  }
  return c.text("data saved");
};
