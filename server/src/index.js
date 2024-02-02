//importing mongoose
const mongoose= require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/yojana-DB')
//importing database connection
const connect= require('./database/connect')
connect()

//importing express
const express= require('express')
const app= express()

require('dotenv').config()

const port=process.env.PORT

//importing routes
const userRouter= require('./routes/users')

//using routes
app.use(userRouter)

//listening the port
app.listen(port, ()=>{
    console.log(`app listening at ${port}`)
})