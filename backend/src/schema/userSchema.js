import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleId: {
        type: String ,
        required: true
    } ,
    email: {
        type: String,
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        required: true
    },
    name: {
        type: String , 
        required: true
    },
    refreshToken: String

})

export default UserSchema