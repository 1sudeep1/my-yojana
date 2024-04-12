//importing database connection
const connect= require('./database/connect')
connect()

//importing express
const express= require('express')
const app= express()

//importing cors
const cors= require('cors')
app.use(cors())

require('dotenv').config()

const port=process.env.PORT


//it fetches data which is defined at body. express.json should must be above the route
app.use(express.json())

//importing routes
const userRoute= require('./routes/usersRoute')
const projectRoute= require('./routes/projectsRoute')

//using routes
app.use(userRoute)
app.use(projectRoute)


//listening the port
app.listen(port, ()=>{
    console.log(`app listening at ${port}`)
})