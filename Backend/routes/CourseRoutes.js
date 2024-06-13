const Course = require("../Schema/CourseSchema")
const express = require("express")
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const courseRouter = express.Router();
const User = require("../Schema/UserSchema")
const {transporter} = require('./mail')
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET_API,
  })
  

courseRouter.get("/",async(req,res) => {
    try{
        const data = await Course.find()
        res.status(200).send(data);
    }catch(error){
        res.status(500).send(error.message)
    }
})

const upload = multer({ dest: 'uploads/' });

courseRouter.post('/upload', upload.single('video'), (req, res) => {
    const filePath = req.file.path;
    const {name} = req.body
    const {courseName} = req.body

    // Upload video to Cloudinary and specify the folder
    cloudinary.uploader.upload(filePath, { 
        resource_type: "video", 
        folder: "Assignments"
    }, (error, result) => {
        // Remove the file from local uploads folder after uploading to Cloudinary
        fs.unlinkSync(filePath);

        if (error) {
            console.error('Error uploading video to Cloudinary:', error);
            res.status(500).json({ error: 'Failed to upload video' });
        } else {
            console.log('Video uploaded to Cloudinary:', result);
            const newSubmittedAssignment  = {
                courseName : courseName,
                assignmentLink : result.secure_url
            }
            User.findOneAndUpdate(
                { name: name }, // Query criteria to find the user by name
                { $push: { 'assignments.submitted': newSubmittedAssignment } }, // Update operation to push newSubmittedAssignment
                { new: true, useFindAndModify: false } // Options to return updated document and use updated method
            )
            .then(updatedUser => {
                if (!updatedUser) {
                    return res.status(404).send({ error: 'User not found' });
                }
                console.log('Updated user with new submitted assignment:', updatedUser);
                res.status(200).json(updatedUser); // Send updated user as response
                const mailOptions = {
                    from: "dribblecapstone@gmail.com",
                    to: "sharugeshkarthik@gmail.com",
                    subject: "Assignment Correction",
                    text: `New Assignment has been submitted by ${name}
                    link - ${result.secure_url}`
                }
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
            })
            .catch(error => {
                console.error('Error updating user:', error);
                res.status(500).send({ error: 'Error updating user after assignment submission' });
            });
            
            // Here you can save the Cloudinary video URL to a database, send email notifications, etc.
        }
    });
});

module.exports={courseRouter};  