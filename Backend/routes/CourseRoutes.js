const Course = require("../Schema/CourseSchema")
const express = require("express")
const courseRouter = express.Router();

courseRouter.get("/",async(req,res) => {
    try{
        const data = await Course.find()
        res.status(200).send(data);
    }catch(error){
        res.status(500).send(error.message)
    }
})

module.exports={courseRouter};  