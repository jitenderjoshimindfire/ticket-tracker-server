const mongoose = require("mongoose");
const { commentSchema } = require("./commentModel");
const validator = require("validator");

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    userEmail: {
      type: String,
      unique: true,
      lowercase: true,
    },
    productType: {
      type: String,

      unique: false,
    },
    createdOn: {
      type: Date,
      default: Date.now(),
    },
    createdBy: {
      type: String,

      unique: false,
    },
    ticketState: {
      type: String,
      default: "In Progress",

      unique: false,
    },
    description: {
      type: String,
    },
    comments: [commentSchema],
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
