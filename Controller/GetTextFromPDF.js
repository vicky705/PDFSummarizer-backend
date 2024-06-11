import express from 'express'
import multer from 'multer'
import extractText from 'pdf-extraction'
import fs, { read } from 'fs'
const route = express()
const upload = multer({dest : 'uploads/'})
let status = false
route.post('/uploaFile', upload.single('pdf'), async(req, res) => {
    try{
        if(!req.file){
            return res.status(404).json({status, message : "File not found."})
        }
        const text = await extractText(req.file.path)
        fs.unlinkSync(req.file.path);
        status = true
        return res.status(200).json({status, text})
    }
    catch(err) {
        res.status(500).json({status, message : "Internal server error", err})
    }
})
export default route;