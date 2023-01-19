const express = require("express");
const ticketRouter = require("./routes/ticketRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("inside app.js middleware");

  next();
});

app.use("/api/v1/tickets", ticketRouter);
app.use("/api/v1/users", userRouter);
module.exports = app;
