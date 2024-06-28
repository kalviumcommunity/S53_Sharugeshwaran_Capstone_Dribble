const express = require("express");
const userRouter = express.Router();
const User = require('../Schema/UserSchema');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary');
const multer = require("multer");
const generateCertificate = require('./CertficateRoute')


const storage = multer.memoryStorage();

const upload3 = multer({ storage: storage });
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET_API,
});

const upload = multer({ dest: 'uploads/' });

userRouter.get("/", async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

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
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({
            name,
            email,
            password: hashedPassword, 
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
    if (!email) {
        return res.status(400).send("No email was sent.");
    }
    console.log(email);
    const { password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        if (user && !password) {
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

userRouter.put("/profile/update", upload.single('profilePhoto'), async (req, res) => {
    const { userName, email, bio, city } = req.body;
    const file = req.file;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const existingUserWithName = await User.findOne({ name: userName });
        if (existingUserWithName && existingUserWithName.email !== email) {
            return res.status(400).json({ error: "Username already exists" });
        } else {
            user.name = userName;
        }

        if (file) {
            try {
       
                const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: "image",
                    folder: "images"
                });


                console.log('Photo uploaded to Cloudinary:', result);
                user.profilePhoto = result.secure_url;
            } catch (error) {
                console.error('Error uploading photo to Cloudinary:', error);
                return res.status(500).json({ error: 'Failed to upload photo' });
            }
        }

        user.bio = bio;
        user.city = city;

        await user.save();
        return res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

userRouter.post("/profile", async (req, res) => {
    const { name } = req.body;
    try {
        const user = await User.findOne({ name });
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).send("Error: ", error);
    }
});

userRouter.delete("/profileDelete", async (req, res) => {
    console.log(req.body);
    const email = req.body;

    try {
        const user = await User.findOneAndDelete(email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ Error: error });
    }
});

userRouter.get("/submitted-assignments", async (req, res) => {
    try {

        const users = await User.find({}, 'name assignments.submitted');


        const submittedAssignments = users.flatMap(user =>
            user.assignments.submitted.map(submission => ({
                userName: user.name,
                courseName: submission.courseName,
                assignmentLink: submission.assignmentLink,
            }))
        );

        res.status(200).json(submittedAssignments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

userRouter.post("/assignment-result", upload3.single('file'),async (req, res) => {
    const { courseName, name, result, date } = req.body;

    console.log(name);

    try {
        const user = await User.findOne({ name });

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (result === "approved") {
            if (user.assignments.rejected.includes(courseName)) {
                user.assignments.rejected = user.assignments.rejected.filter(
                    course => course !== courseName
                );
            }

            user.assignments.approved.push(courseName);

            const certificateLink = await generateCertificate({ courseName, name, date });

            user.assignments.submitted = user.assignments.submitted.filter(
                assignment => assignment.courseName !== courseName
            );
            
            user.certificates.push(certificateLink)

            await user.save();
            const updatedUser = await User.findOne({ name });
            console.log(updatedUser);

            res.status(200).json({
                message: "Assignment result updated successfully",
                user: updatedUser,
                certificateLink: certificateLink
            });

        } else if (result === "rejected") {
            if (!user.assignments.rejected.includes(courseName)) {
                user.assignments.rejected.push(courseName);
            }

            user.assignments.submitted = user.assignments.submitted.filter(
                assignment => assignment.courseName !== courseName
            );

            await user.save();
            const updatedUser = await User.findOne({ name });
            console.log(updatedUser);

            res.status(200).json({
                message: "Assignment result updated successfully",
                user: updatedUser
            });

        } else {
            return res.status(400).send("Invalid result");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});




module.exports = {userRouter};










