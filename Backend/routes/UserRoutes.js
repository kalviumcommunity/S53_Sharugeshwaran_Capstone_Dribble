const express = require("express")
const userRouter = express.Router()
const User = require('../Schema/UserSchema')
const bcrypt =  require('bcrypt')


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

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Save the hashed password
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

userRouter.post("/login", async (req, res) => {
    const { email } = req.body;
    // console.log(hi)
    if(!email){
        return res.status(400).send("No email was sent.")
    }
    console.log(email)
    const { password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email: email });


        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        if(user && !password){
            return res.status(200).send(user);
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return res.status(200).send(user);
        } else {
            return res.status(401).send({ error: 'Password does not match' });
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
userRouter.put("/", async (req, res) => {
    const { name, email, password, bio, city } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const existingUserWithName = await User.findOne({ name });
        if (existingUserWithName && !(existingUserWithName.email == email)) {
            return res.status(400).json({ error: "Username already exists" });
        }else{
            user.name = name;
        }

        user.password = password;
        user.bio = bio;
        user.city = city;

        await user.save();

        return res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

userRouter.post("/profile",async(req,res) => {
    const {name} = req.body
    try {
        const  user  = await User.findOne({name})
        res.status(200).json({user}) 
    } catch (error) {
        res.status(400).send("Error: ",error)
    }

})




module.exports = {
        userRouter
}