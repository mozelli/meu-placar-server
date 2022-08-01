const mongoose = require("../database/mongoose");

const TableSerieASchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shield: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TableSerieA = mongoose.model("TableSerieA", TableSerieASchema);

module.exports = TableSerieA;
