import express from 'express'
import Usermodal from '../Modal/Usermodal.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()
const route = express()

const JWT_SECRITE = process.env.JWT_SECRITE

route.post('/createUser', async(req, res) => {
    let status = false
    try{
        const details = req.body
        const isUser = await Usermodal.findOne({email : details.email})
        if(isUser) return res.status(409).json({status, message : "Email already registered with another account."})
        const isMobile = await Usermodal.findOne({mobileNumber : details.mobileNumber})
        if(isMobile) return res.status(409).json({status, message : "Mobile Number already registered with another account."})
        const salt = bcrypt.genSaltSync(10)
        const newPassword = await bcrypt.hash(details.password, salt)
        details.password = newPassword
        const user = await Usermodal.create(details)
        const userId = {
            userId : user._id
        }
        const authToken = jwt.sign(userId, JWT_SECRITE)
        status = true
        return res.status(200).json({status, message : "Registration successfully.", user, authToken})       
    }
    catch(err) {
        return res.status(500).json({status, message : "Internal server error", error : err})
    }
})

route.post('/login', async(req, res) => {
    let status = false
    try{
        const details = req.body
        const isUser = await Usermodal.findOne({email : details.email})
        if(!isUser) return res.status(401).json({status, message : "Invalid cradiential."})
        const isPass = await bcrypt.compare(details.password, isUser.password)
        if(!isPass) return res.status(401).json({status, message : "Invalid cradiential."})
        const userId = {
            userId : isUser._id
        }
        const authToken = jwt.sign(userId, JWT_SECRITE)
        status = true
        return res.status(200).json({status, message : "Login Successfully.", user : isUser, authToken})
    }
    catch(err) {
        res.status(500).json({status, message : "Internal server error", error : err})
    }
})


export default route