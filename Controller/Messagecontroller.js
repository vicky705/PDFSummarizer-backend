import express from 'express'
import Authorization from '../Middleware/Authorization.js'
import { initlizeChat, sendMessage } from '../Services/Geminiwithchathistory.js'
import { generateText } from '../Services/Generativeaimodel.js'
const route = express()

route.post('/initChat', Authorization, async(req, res) => {
    const currentUserId = req.id
    let status = false
    try{
        const info = req.body.content
        const message = await initlizeChat(info)
        status = true
        return res.status(200).json({status, message})
    }
    catch(err) {
        return res.status(500).json({status, message : "Internal server error"})
    }
})

route.post('/sendMessage', Authorization, async(req, res) => {
    const currentUserId = req.id
    let status = false
    try{
        const text = req.body.prompt
        const message = await sendMessage(text)
        if(!message.status) return res.status(409).json(message)
        return res.status(200).json(message) 
    }
    catch(err) {
        return res.status(500).json({status, message : "Internal server error"})
    }
})

route.post('/sendMessageWithContent', Authorization, async(req, res) => {
    let status = false
    try{
        const content = req.body.content
        const prompt = req.body.prompt
        const message = await generateText(content+" "+prompt)
        status = true
        return res.status(200).json({status, message})
    }
    catch(err){
        return res.status(500).json({status, message : "Internal server error"})
    }
})

export default route