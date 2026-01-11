import { cloudinary } from "../config/cloudinary.config";



export const uploadFile = async (file , folder = "uploads" , resource_type = "auto") => {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64}`,
      {
        folder: folder,
        resource_type: resource_type,
      }
    );

    console.log("uploadFile SUCCESS", result);
    return result;
  } catch (error) {
    console.error(" uploadFile error", error);
    throw error;
  }
};


export const deleteFile = async (publicId ,type) => {
 
try {
  const result = await cloudinary.uploader.destroy( publicId ,{
    resource_type: type,
  })
  console.log("deleteFile SUCCESS", result);
    return result;
} catch (error) {
  console.error("deleteFile error", error);
  throw error;
}
}

