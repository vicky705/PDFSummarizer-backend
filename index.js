import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {generateText} from './Services/Generativeaimodel.js'
import { connectToMongoose } from './Config/Config.js'
import Usercontroller from './Controller/Usercontroller.js'
import Messagecontroller from './Controller/Messagecontroller.js'
import GetTextFromPDF from './Controller/GetTextFromPDF.js'
import { initlizeChat, sendMessage } from './Services/Geminiwithchathistory.js'


connectToMongoose()

dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()

const options = {
    origin : "http://localhost:5173"
}

app.use(cors(options))
app.use(express.json())

app.use('/api/v1/user/auth/', Usercontroller)
app.use('/api/v1/model/message/', Messagecontroller)
app.use('/api/pdf-to-text', GetTextFromPDF)


app.listen(PORT, () => {
    console.log(`Server start at http://localhost:${PORT}`)
})