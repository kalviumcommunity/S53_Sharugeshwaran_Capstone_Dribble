const express = require( 'express' );
const AcademyRouter = express.Router()
const Academy = require("../Schema/AcademySchema")

AcademyRouter.post("/", async (req, res) => {
    const { location } = req.body;

    try {
        let data;
        
        if (!location) {
            data = await Academy.find();
        } else {
            data = await Academy.find({ location: location });
        }

        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
    }
});


module.exports = {
    AcademyRouter
}