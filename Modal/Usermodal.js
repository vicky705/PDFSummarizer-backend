import { mongoose } from "mongoose";
const { Schema } = mongoose

const UserSchema = new Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    profileImg : {
        type : String
    },
    mobileNumber : {
        type : String
    }
}) 

export default mongoose.model("Users", UserSchema)