import mongoose from "mongoose";
import { userImage } from "../models/image.model";
import { deleteFile, uploadFile } from "../services/cloudinary.service";


export const savefile = async (c) => {
  const body = await c.req.parseBody();
  console.log(body);
  const file = body.image;
  console.log(file);
  if (!file) {
    return c.json("No file provided", 400);
  }

  try {
    const result = await uploadFile(file);
    await userImage.create({
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
    const text = await userImage.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(id) } },
    ]);

    c.status(200);
    return c.json({ data: text }, 200);
  } catch (error) {
    console.error(`error while fetching ${error}`);
    return c.json({ mes: "Internal Server Error", error }, 500);
  }
};

export const deleteData = async (c) => { 
  const { _id} = await c.req.json();
  console.log("this is delete " + JSON.stringify(_id));
  if (!_id) {
    return c.json("No _id provided", 400);
  }

    try {
    const deletedImage = await userImage.findOneAndDelete({ _id: new mongoose.Types.ObjectId(_id) }).select("imageId");;
   if(!deletedImage) return c.json({mes: "image doesn't exist"} , 400)
    const result = await deleteFile(deletedImage.imageId)
    c.status(200);
    console.log(`File deleted successfully: ${JSON.stringify(result)}`);
    return c.json({ data: result }, 200);
  } catch (error) {
    console.log(`error while deleting ${JSON.stringify(error)}`);

    c.status(400);
    return c.json({ error: error });
  }
 };