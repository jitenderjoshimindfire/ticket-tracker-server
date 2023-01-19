const Ticket = require("../models/ticketModel");

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
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        ticket
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};