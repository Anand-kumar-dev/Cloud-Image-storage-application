import mongoose from "mongoose"


const dataSchema = mongoose.Schema({
  
  imageUrl:{
    type:String,
    },
   imageId:{
    type:String,
   }
},{timestamps: true});



export const userData = mongoose.model("datas",dataSchema);