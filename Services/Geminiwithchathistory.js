import { GoogleGenerativeAI } from '@google/generative-ai'

import config from 'dotenv'
config.config()

const genAI = new GoogleGenerativeAI(process.env.API_KEY)
const model = genAI.getGenerativeModel({model : 'gemini-pro'})
let chat

export const initlizeChat = async(initialText) => {
    chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text:  initialText}],
            },
            {
                role: "model",
                parts: [{ text: "Great to meet you. What would you like to know?" }],
            },
        ],
        generationConfig: {
            maxOutputTokens: 100,
        },
    });
    return "Great to meet you. What would you like to know?"
}

export const sendMessage = async(prompt) => {
    if(!chat) return {status : false, message : "Give me Content first. then you can ask any question"}
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    return {status : true, message : text, isSender : false}
}

