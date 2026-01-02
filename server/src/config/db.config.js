import mongoose from "mongoose";

export const dbconnect = async() => {
  try {
   await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(`error in connecting db ${error}`)
  }
};
