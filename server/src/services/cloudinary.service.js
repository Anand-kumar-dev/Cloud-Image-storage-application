import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async (file) => {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    await Bun.write(`./uploads/${file.name}`, buffer);

    const cloudinaryResult = await cloudinary.uploader.upload(
      `./uploads/${file.name}`,
      { resource_type: "auto", folder: "uploads/" }
    );
    console.log("✅ uploadFile SUCCESS", cloudinaryResult);

    return cloudinaryResult;
  } catch (error) {
    console.error("❌ uploadFile error:");
    console.error(error);

    throw error;
  }
};
