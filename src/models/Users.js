const mongoose = require("../database/mongoose");

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  emailValidationToken: {
    type: String,
    select: false,
  },
  state: {
    type: String,
    default: "awaiting_validation",
  },
  permition: {
    type: String,
    require: true,
  },
  coins: {
    type: Number,
    required: true,
    default: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
