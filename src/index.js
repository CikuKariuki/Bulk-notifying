// import dotenv from 'dotenv'
// import express from 'express'
// import bodyParser from'body-parser' 
// import expressCallback from './callbacks'
// import controllers from './controllers'

// const app = express()
// dotenv.config()
// const port = 3030
// const apiVersion = process.env.apiVersion

// app.use(bodyParser.json())
// app.use((_, res, next) =>{
//     res.set({ Tk: '!' })
//     next()
// })


// // //endpoint that is calling controllers that call a function called sendSMS
// app.post(`${apiVersion}/notification/
// `, expressCallback(controllers.notifications.sendSMS))
// app.use(expressCallback(controllers.notFound))


// // listening to server
// app.listen(3030, ()=>{
//     console.log("Listening to server on port", port)
// })

// // exiting the server
// process.on('SIGINT', ()=>{ console.log("Server has been exited"); process.exit(); })
// .on('uncaughtException', err => { console.error(err, 'uncaught exception thrown'); process.exit(1); })


// export default app