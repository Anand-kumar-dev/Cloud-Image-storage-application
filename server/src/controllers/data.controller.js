import mongoose from "mongoose";
import { userImage } from "../models/image.model";
import { deleteFile, uploadFile } from "../services/cloudinary.service";
import { userVideo } from "../models/video.model";
import { User } from "../models/user.model";


export const savefile = async (c) => {
  const body = await c.req.parseBody();
  const file = body.file;
  if (!file) {
    return c.json("No file provided", 400);
  }

  if (file.type.startsWith("image/")) {
    try {
      const result = await uploadFile(file);
      await userImage.create({
        userId: c.req.user.id,
        imageUrl: result.secure_url,
        imageId: result.public_id,
      });
      c.status(200);
      console.log(`File uploaded successfully`);
      return c.json({ data: result.url }, 200);
    } catch (error) {
      console.log(`error while fetching ${JSON.stringify(error)}`);

      c.status(400);
      return c.json({ error: error });
    }

  }
  else if (file.type.startsWith("video/")) {

    try {
      const result = await uploadFile(file);
      await userVideo.create({
        userId: c.req.user.id,
        videoId: result.public_id,
        videoUrl: result.secure_url,
        duration: result.duration,
        format: result.format,
        bytes: result.bytes,
        width: result.width,
        height: result.height,
      });
      c.status(200);
      console.log(`File uploaded successfully`);
      return c.json({ data: result.url }, 200);
    } catch (error) {
      console.log(`error while fetching ${JSON.stringify(error)}`);

      c.status(400);
      return c.json({ error: error });
    }
  }
  else {
    return c.json("Unsupported file type", 400);
  }


};



export const fetchData = async (c) => {
  const { id } = await c.req.user;
  try {
    const text = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: "images",
          localField: "_id",
          foreignField: "userId",
          as: "images"
        }
      },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "userId",
          as: "videos"
        }
      },
      { $unset: ["password", "__v"] }
    ]);
    const preparedResponse = mapUserMedia(text[0]);
    console.log("frontend fetched data ");
    c.status(200);
    return c.json({ data: preparedResponse }, 200);
  } catch (error) {
    console.error(`error while fetching ${error}`);
    return c.json({ mes: "Internal Server Error", error }, 500);
  }
};



export const deleteData = async (c) => {
  const { _id, type } = await c.req.json();
  if (!_id || !type) {
    return c.json("No _id or type provided", 400);
  }

  if (type === "video") { 
    
     try {
    const deletedVideo = await userVideo.findOneAndDelete({ _id: new mongoose.Types.ObjectId(_id) }).select("videoId");;
    if (!deletedVideo) return c.json({ mes: "video doesn't exist" }, 400)
      
    const result = await deleteFile(deletedVideo.videoId , "video");
    c.status(200);
    console.log(`File deleted successfully`);
    return c.json({ data: result }, 200);
  } catch (error) {
    console.error(`error while deleting ${JSON.stringify(error)}`);

    c.status(400);
    return c.json({ error: error });
  }
  }


  if (type === "image") {
    try {
      const deletedImage = await userImage.findOneAndDelete({ _id: new mongoose.Types.ObjectId(_id) }).select("imageId");;
      if (!deletedImage) return c.json({ mes: "image doesn't exist" }, 400)
        console.log("this is deleted image " + JSON.stringify(deletedImage));
      const result = await deleteFile(deletedImage.imageId , "image");
      c.status(200);
      console.log(`File deleted successfully: ${JSON.stringify(result)}`);
      return c.json({ data: result }, 200);
    } catch (error) {
      console.log(`error while deleting ${JSON.stringify(error)}`);

      c.status(400);
      return c.json({ error: error });
    }
  }
};



function mapUserMedia(doc) {
  return {
    id: doc._id,
    username: doc.username,
    email: doc.email,

    media: [
      ...(doc.images || []).map(img => ({
        id: img._id,
        type: "image",
        url: img.imageUrl,
        createdAt: img.createdAt
      })),
      ...(doc.videos || []).map(vid => ({
        id: vid._id,
        type: "video",
        url: vid.videoUrl,
        duration: vid.duration,
        createdAt: vid.createdAt
      }))
    ]
  };
}
