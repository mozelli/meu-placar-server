const mongoose = require("../database/mongoose");

const TableSerieBSchema = new mongoose.Schema({
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

const TableSerieB = mongoose.model("TableSerieB", TableSerieBSchema);

module.exports = TableSerieB;
