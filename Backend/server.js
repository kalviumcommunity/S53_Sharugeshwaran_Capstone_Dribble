const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();


app.use(cors());

app.get('/',(req,res) => {
    res.send("Hello")
})

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
