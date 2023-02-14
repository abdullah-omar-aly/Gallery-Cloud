import mongoose from "mongoose"
import UserSchema from "../schema/userSchema"

export const UserModel = mongoose.model('User' , UserSchema)