import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Usermodal from '../Modal/Usermodal.js'
dotenv.config()
const JWT_SECRITE = process.env.JWT_SECRITE

const Authorization = async(req, res, next) => {
    let status = false
    try{
        const token = req.header('authToken')
        if(!token) return res.status(401).json({status, message : "Invalid Authantication."})
        const data = jwt.verify(token, JWT_SECRITE)
        const user = await Usermodal.findOne({_id : data.userId})
        if(!user) return res.status(401).json({status, message : "Invalid Authantication."})
        req.id = data.userId
        next()
    }   
    catch(err) {
        res.status(500).json({status, message : "Internal server error"})
    }
}

export default Authorization
