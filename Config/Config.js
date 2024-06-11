import { mongoose } from "mongoose";
const dburl = process.env.MONGODB_PATH

export const connectToMongoose = () => {
    mongoose.connect(dburl).then(() => {
        console.log("Database connected.")
    }).catch((error) => {
        console.log(error)
    })
}