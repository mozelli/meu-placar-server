const mongoose = require("../database/mongoose");

const TeamsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shield: {
    type: String,
    required: true,
  },
  short_name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Teams = mongoose.model("Teams", TeamsSchema);

module.exports = Teams;
