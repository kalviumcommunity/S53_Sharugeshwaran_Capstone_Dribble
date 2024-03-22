const User = require('../Schema/UserSchema')

const user1 = new User({
    name : "Sharugeshwaran",
    bio: "Iam a 18 year from Ramanathapuram eager to improve my game",
    city: "Ramanathapuram",
    email: "sharugeshkarthik@gmail.com",
    password: "123sds"
})

const users = user1

const addUsers = () => {
    User.insertMany(users)
}

module.exports = {
    addUsers
}