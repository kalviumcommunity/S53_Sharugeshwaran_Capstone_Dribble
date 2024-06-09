const mongoose = require('mongoose');

const academySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  social: {
    type: String,
  },
  contact: {
    type: String,
  },
  State: {
    type: String
  }
});

module.exports = mongoose.model('Academy', academySchema);
