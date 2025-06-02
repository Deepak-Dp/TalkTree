const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const connectDataBase = require('./config/dbConnection')
const userRoutes = require('./routes/user.route')
const fileUpload = require('express-fileupload')
const cloudinary = require('./config/cloudinary')
const bodyParser = require('body-parser')

const postRoutes = require('./routes/post.route')

const notificationRoutes = require('./routes/notification.route')




connectDataBase()

const app = express()
require('dotenv').config()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTENDURL,
    credentials: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

cloudinary.cloudinaryConnect();



app.use('/api/v1/post', postRoutes)
app.use('/api/v1/user', userRoutes)

app.use('/api/v1/notification', notificationRoutes)


const port = process.env.PORT 

app.get('/', (req, res)=>{
    res.send('[server running]')
})

app.listen(port, ()=>{
    console.log(`server running on port no. ${port}`);
    
    
})