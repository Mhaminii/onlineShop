const express = require('express')
require('./DB/mongooseConnect')
const product = require('./routers/Product')
const user = require('./routers/User')
const order = require('./routers/Order')
const payment = require('./routers/Payment')
const errorMiddleware = require('./middlewares/errors');

const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
const cloudinary = require('cloudinary')
const fileUpload = require('express-fileupload')

 
const app = express()
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(fileUpload())
const PORT = process.env.PORT || 8000
 
//setting up cloudinary configuration

cloudinary.config({
    cloud_name:'dwwwxwbzj',
    api_key:'647674254811254',
    api_secret:'QCqIxbVXXrzMenZ9W_sRmjZaNR4',
})


app.use(product)
app.use(user)
app.use(order)
app.use(payment)

app.use(errorMiddleware)

process.on('uncaughtExcrption', err =>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to uncaught Excrption.')
    process.exit(1)
    
})

const server = app.listen(PORT , ()=>{
    console.log(`Server is up on ${PORT}`)
})

process.on('unhandledRejection', err =>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to unhandled promise rejection.')
    server.close(()=>{
        process.exit(1)
    })
})