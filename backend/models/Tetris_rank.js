const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Duplicate the ID field.

let Tetris_rank = new Schema({
  name: {
    type: String
  },
  score: {
    type: String
  },
  time: {
    type: String
  }
});

Tetris_rank.set("toObject", { virtuals: true });
Tetris_rank.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Tetris_rank", Tetris_rank);
