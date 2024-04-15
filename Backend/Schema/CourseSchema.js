const mongoose  =  require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    thumbnail: String,
    description: {
      type: String
    },
    category : String, 
    modules: [
      {
        name: String,
        videos: [
          {
            name: String,
            url: String,
          }
        ]
      }
    ]
  })

  module.exports = mongoose.model('Course', courseSchema);