const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  city: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  assignments: {
    submitted: [{
      courseName: {
        type: String,
      },
      assignmentLink: {
        type: String,
      }
    }],
    approved: {
      type: [String],  
    },
    rejected: {
      type: [String]
    }
  },
  certificates: {
    type: [String]
  } 
});;



module.exports = mongoose.model('User', userSchema);
