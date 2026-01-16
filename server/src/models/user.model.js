import mongoose from "mongoose";
import bcrypt from "bcryptjs"





const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        avatar:{
            type: String,
            required: false
        }
    }, { timestamps: true });





    userSchema.pre("save", async function (next) {
        if (!this.isModified("password")) return ;
    
        this.password = await bcrypt.hash(this.password, 10);
    });


    userSchema.methods.comparePassword = async function (usrpassword){
        return await bcrypt.compare(usrpassword ,this.password);
    };





export const User = mongoose.model("users", userSchema);

