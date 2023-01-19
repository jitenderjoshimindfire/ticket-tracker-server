const mongoose = require("mongoose");
const validator = require("validator");

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A ticket must have a title"],
    unique: true,
    maxLength: [
      100,
      "A ticket title must have less or equal to 100 characters",
    ],
    minLength: [10, "A ticket title must have more than 10 characters"],
  },
  userEmail: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  productType: {
    type: String,
    required: [true, "A ticket must have a type"],
    unique: false,
    maxLength: [30, "A ticket title must have less or equal to 100 characters"],
    minLength: [5, "A ticket title must have more than 10 characters"],
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
  ticketState: {
    type: String,
    required: [true, "A ticket must have a state"],
    unique: false,
    maxLength: [20, "A ticket title must have less or equal to 100 characters"],
    minLength: [5, "A ticket title must have more than 10 characters"],
  },
  description: {
    type: String,
    required: [true, "A ticket must have a description"],
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
