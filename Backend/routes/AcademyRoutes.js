const express = require( 'express' );
const AcademyRouter = express.Router()
const Academy = require("../Schema/AcademySchema")

AcademyRouter.get("/", async(req,res) => {
    try{
    const data = await Academy.find()
    res.status(200).send(data)
    }catch(err){
        console.log(err);
        res.status(400).send("Error: ",err)
    }
})

module.exports = {
    AcademyRouter
}