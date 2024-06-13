const nodemailer = require("nodemailer")
require('dotenv').config()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    auth: {
        user : process.env.USER_MAIL_AUTH,
        pass:  process.env.USER_MAIL_PASS
    }
})

module.exports = {
    transporter
}