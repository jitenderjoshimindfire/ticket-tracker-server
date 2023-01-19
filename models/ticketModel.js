const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A ticket must have a title"],
    unique: true,
    maxLength: [100, "A ticket title must have less or equal to 100 characters"],
    minLength: [10, "A ticket title must have more than 10 characters"],
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: String,
    required: [true, "A ticket must have a author"],
    unique: false,
    maxLength: [30, "A ticket title must have less or equal to 100 characters"],
    minLength: [5, "A ticket title must have more than 10 characters"],
  },
  description: {
    type: String,
    required: [true, "A ticket must have a description"],
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;