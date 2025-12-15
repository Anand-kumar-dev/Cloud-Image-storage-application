import mongoose from "mongoose"


const dataSchema = mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  },
  imageUrl:{
    type:String,
    },
   imageId:{
    type:String,
   }
},{timestamps: true});



export const userData = mongoose.model("datas",dataSchema);