import express from 'express'
import Authorization from '../Middleware/Authorization'
const route = express()

route.get('/file', Authorization, async(req, res) => {
    
})

export default route