const mongoose = require("mongoose");
const Ticket = require("./ticketModel");
//const User = require("./userModel");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
    },
    createdOn: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// commentSchema.index({ ticket: 1, user: 1 }, { unique: true });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment, commentSchema };
