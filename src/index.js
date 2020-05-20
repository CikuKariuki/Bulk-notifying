import dotenv from 'dotenv'
import express from 'express'
import bodyParser from'body-parser' 
import expressCallback from './callbacks'
import controllers from './controllers'

const app = express()
dotenv.config()
const port = 3030
const apiVersion = process.env.apiVersion

app.use(bodyParser.json())
app.use((_, res, next) => {
res.set({ Tk: '!'})
next()
})

//endpoint that is calling controllers that call a function called sendSMS
app.post(`${apiVersion}/notification/sms/:group_id`, expressCallback(controllers.notifications.sendSMS))
app.use(expressCallback(controllers.notFound))

// listening to server
app.listen(3030, ()=>{
    console.log("Listening to server on port", port)
})

export default app