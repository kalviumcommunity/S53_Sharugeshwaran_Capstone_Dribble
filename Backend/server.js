const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {courseRouter} = require("./routes/CourseRoutes");
const { addData } = require('./data/coursesData');
const {AcademyRouter} = require("./routes/AcademyRoutes");
const {userRouter} = require('./routes/UserRoutes')
const { addAcademies } = require('./data/academyData');
const { addUsers } = require('./data/usersData');
require("dotenv").config()

async function connectToDatabase(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected!!!")
        // addData()
        // addUsers()
    }catch(err){
        console.log("Error connecting to database: ",err)
    }
}

const app = express();

app.use(express.json())
app.use(cors());
app.use("/courses",courseRouter)
app.use("/academy",AcademyRouter)
app.use("/users", userRouter)

app.get('/',(req,res) => {
    res.send("Hello")
})

connectToDatabase()

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
