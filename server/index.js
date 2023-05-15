const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const {mongoose} = require("mongoose")
const cookieParser = require('cookie-parser')
const  app =  express()
const port = 8000;
//jAcwg74QHNY0R4uA
//database
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database is connected")
})
.catch(()=>{console.log("database is not connected")})
//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use('/',require('./routes/authRoutes'))

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})