const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const idSchema = new Schema({
  idNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isReg: {
    type: Boolean,
    default: false,
  },
  photo: {
    type: String,
    default: "",
  },
});

module.exports = model("Id", idSchema);
