import mongoose from 'mongoose';

const videoSchema = mongoose.Schema(
     {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        videoId: {
          type: String,
          required: true,
          unique: true,
        },
        videoUrl: {
          type: String,
          required: true,
        },
        duration: {
          type: Number,
          required: true,
        },
        format: {
          type: String,
          required: true,
        },
        bytes: {
          type: Number,
          required: true,
        },
        width: {
          type: Number,
          required: true,
        },
        height: {
          type: Number,
          required: true,
        },
        
      }, { timestamps: true });   



export const userVideo = mongoose.model("videos", videoSchema);