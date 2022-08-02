const mongoose = require("../database/mongoose");

const BettingExchangeSchema = new mongoose.Schema({
  match_id: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  gamblers: {
    type: [],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BettingExchange = mongoose.model(
  "BettingExchange",
  BettingExchangeSchema
);

module.exports = BettingExchange;
