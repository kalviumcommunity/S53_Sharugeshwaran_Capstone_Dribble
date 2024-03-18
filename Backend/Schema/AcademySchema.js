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
  website: {
    type: String,
  },
  contactEmail: {
    type: String,
  },
});

module.exports = mongoose.model('Academy', academySchema);
