const mongoose = require("../database/mongoose");

const BrasileiroSerieBBetsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  match_id: {
    type: String,
    required: true,
  },
  bet: {
    teamA: {
      team_id: {
        type: String,
        requires: true,
      },
      result: {
        type: Number,
        required: true,
      },
    },
    teamB: {
      team_id: {
        type: String,
        requires: true,
      },
      result: {
        type: Number,
        required: true,
      },
    },
    cash: {
      type: Number,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BrasileiroSerieBBets = mongoose.model(
  "BrasileiroSerieBBets",
  BrasileiroSerieBBetsSchema
);

module.exports = BrasileiroSerieBBets;