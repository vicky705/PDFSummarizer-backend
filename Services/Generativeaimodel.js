import { GoogleGenerativeAI } from '@google/generative-ai'
import config from 'dotenv'
config.config()

const genAI = new GoogleGenerativeAI(process.env.API_KEY)

export const generateText = async(prompt) => {
    const model = genAI.getGenerativeModel({model : "gemini-pro"})
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    return text
}
