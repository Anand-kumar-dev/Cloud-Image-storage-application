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
    select:false
   }
},{timestamps: true});



export const userImage = mongoose.model("images",dataSchema);