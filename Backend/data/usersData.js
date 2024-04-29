const User = require('../Schema/UserSchema')

const user1 = new User({
    name : "Sharugeshwaran",
    bio: "Iam a 18 year from Ramanathapuram eager to improve my game",
    city: "Ramanathapuram",
    email: "sharugeshkarthik@gmail.com",
    password: "123sds",
    profilePhoto: "https://i.pinimg.com/736x/11/ee/ba/11eeba17309ce73574d1266d6bb38bfa.jpg"
})

const users = [user1]

const addUsers = () => {
    User.insertMany(users)
    console.log("Users added")
}

module.exports = {
    addUsers
}