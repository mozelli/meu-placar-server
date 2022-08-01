const mongoose = require("../database/mongoose");

const MatchesSerieASchema = new mongoose.Schema({
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

const MatchesSerieA = mongoose.model("MatchesSerieA", MatchesSerieASchema);

module.exports = MatchesSerieA;
