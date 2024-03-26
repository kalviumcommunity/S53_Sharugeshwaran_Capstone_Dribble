const express = require("express")
const userRouter = express.Router()
const User = require('../Schema/UserSchema')

userRouter.get("/", async (req,res) => {
    try{
        const data  = await User.find()
        res.status(200).send(data)
    }catch(err){
        res.status(500).json({message : err})
    }
})

userRouter.post("/signup", async (req, res) => {
    try {
        const { name, email, password, bio, city } = req.body;


        if (!name || !email || !password) {
            return res.status(400).json({
                error: "Please provide name, email, and password"
            });
        }

        
        const existingUserWithEmail = await User.findOne({ email });
        if (existingUserWithEmail) {
            return res.status(400).json({
                error: "Email already exists"
            });
        }

        
        const existingUserWithName = await User.findOne({ name });
        if (existingUserWithName) {
            return res.status(400).json({
                error: "Username already exists"
            });
        }

        
        const newUser = new User({
            name,
            email,
            password,
            bio,
            city
        });

        
        await newUser.save();

        
        res.status(201).json({
            message: "User created successfully",
            user: newUser 
        });
    } catch (err) {
        
        console.error("Error signing up:", err);
        res.status(500).json({
            error: "Error signing up"
        });
    }
});


module.exports = {
        userRouter
}