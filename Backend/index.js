const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit')
const {courseRouter} = require("./routes/CourseRoutes");
const {AcademyRouter} = require("./routes/AcademyRoutes");
const {userRouter} = require('./routes/UserRoutes')

require("dotenv").config()

async function connectToDatabase(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected!!!")

    }catch(err){
        console.log("Error connecting to database: ",err)
    }
}

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later.',
  });

app.use(express.json())
app.use(cors({
    origin: ['https://dribble-xi.vercel.app','http://localhost:5173'],
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type',
    credentials: true,
  }));
app.use("/courses",courseRouter)
app.use("/academy",AcademyRouter)
app.use("/users", userRouter)
app.use(limiter)

app.get('/',(req,res) => {
    res.send("Hello")
})

connectToDatabase()



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
