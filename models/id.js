const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const idSchema = new Schema({
  idNumber: {
    type: String,
    required: true,
  }
});

module.exports = model('Id', idSchema);
