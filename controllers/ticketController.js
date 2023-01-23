const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");
const { Comment } = require("../models/commentModel");

exports.getAllTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find();
    console.log("inside All tickets");
    res.status(200).json({
      status: "success",
      results: tickets.length,
      data: { tickets },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createTicket = async (req, res, next) => {
  console.log("outside create ticket try", req.body);
  try {
    const newTicket = await Ticket.create(req.body);
    console.log("inside create Ticket");

    res.status(201).json({
      satatus: "success",
      data: {
        ticket: newTicket,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        ticket,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        ticket,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.postComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { ticketId } = req.params;
    const { userId } = req.body;
    //console.log(userId, ticketId, comment);

    // if (!comment) {
    //   new AppError("Please provide comment!", 400);
    // }

    const _userId = mongoose.Types.ObjectId(userId);
    const _ticketId = mongoose.Types.ObjectId(ticketId);

    const ticket = await Ticket.findById(_ticketId);
    //console.log(ticket);
    if (!ticket) {
      new AppError(`Ticket with ${ticketId} not available!`, 404);
    }

    const user = await User.findById(_userId).select("_id name email");
    //console.log(user, "user");
    const newComment = new Comment({ comment: comment, user: user });
    ticket.comments.push(newComment);
    const updatedTicket = await ticket.save();
    const updatedComment = updatedTicket.comments.at(-1);

    res.status(200).json({
      data: updatedComment,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.assignedTo = async (req, res) => {
  try {
    const { _email } = req.body;
    const { _ticketId } = req.params;

    const ticket = await Ticket.findById(_ticketId);
    if (!ticket) {
      new AppError(`Ticket with ${ticketId} not available!`, 404);
    }

    const user = await User.findOne({ _email });

    ticket.assignedTo = user;
    const updatedTicket = await ticket.save();
    const assignedToData = {
      _id: updatedTicket._id,
      name: user.name,
      email: user.email,
    };
    res.status(200).json({
      data: assignedToData,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
