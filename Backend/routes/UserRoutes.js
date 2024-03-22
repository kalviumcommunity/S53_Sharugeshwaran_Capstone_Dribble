const express = require("express")
const userRouter = express.Router()
const User = require('../Schema/UserSchema')

userRouter.get("/", async (req,res) => {
    try{
        const data  = await User.find()
        res.status(200).send(data)
    }catch(err){
        res.send("Error fetching users: ",err)
    }
})

module.exports = {
        userRouter
}