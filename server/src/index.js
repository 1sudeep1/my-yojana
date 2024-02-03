//importing database connection
const connect= require('./database/connect')
connect()

//importing express
const express= require('express')
const app= express()

require('dotenv').config()

const port=process.env.PORT


//it fetches data which is defined at body. express.json should must be above the route
app.use(express.json())

//importing routes
const userRouter= require('./routes/users')

//using routes
app.use(userRouter)


//importing cors
const cors= require('cors')
app.use(cors())

//listening the port
app.listen(port, ()=>{
    console.log(`app listening at ${port}`)
})