const mongoose = require("../database/mongoose");

const MatchesSerieBSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  teams: {
    type: [],
    required: true,
  },
  stadium: {
    type: String,
    requires: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MatchesSerieB = mongoose.model("MatchesSerieB", MatchesSerieBSchema);

module.exports = MatchesSerieB;
