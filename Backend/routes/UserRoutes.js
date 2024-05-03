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
userRouter.put("/profile/update", async (req, res) => {
    const { userName, profilePhoto,userEmail, bio, city } = req.body;
    const email = userEmail
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const existingUserWithName = await User.findOne({ userName });
        if (existingUserWithName && !(existingUserWithName.email == email)) {
            return res.status(400).json({ error: "Username already exists" });
        }else{
            user.name = userName;
        }

        // user.password = password;
        user.bio = bio;
        user.city = city;
        user.profilePhoto = profilePhoto

        await user.save();

        return res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

userRouter.post("/profile",async(req,res) => {
    const {email} = req.body
    try {
        const  user  = await User.findOne({email})
        res.status(200).json({user}) 
    } catch (error) {
        res.status(400).send("Error: ",error)
    }

})

userRouter.delete("/profileDelete", async(req,res) => {
    console.log(req.body)
    const email = req.body

    try {
        const user = await User.findOneAndDelete(email)
        if(!user){
            return res.status(404).json({error: "User not found"})
        }
        res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        res.status(400).json({Error: error})
    }

})




module.exports = {
        userRouter
}