const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true
  },
  rguktMail: {
    type: String,
    required: true,ssage: 'Invalid  email address'
  },
  photo: {
    type: String,
    trim: true
  },
});



module.exports = model('rguktUser', userSchema);
