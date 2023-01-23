const express = require("express");
const ticketController = require("../controllers/ticketController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    ticketController.getAllTickets
  )
  .post(ticketController.createTicket);

router
  .route("/:id")
  .get(ticketController.getTicket)
  .patch(ticketController.updateTicket)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    ticketController.deleteTicket
  );

router.route("/:ticketId/comments").post(ticketController.postComment);
router.route("/:ticketId/assign").post(ticketController.assignedTo);

module.exports = router;
