const express = require("express");
const ticketRouter = require("./routes/ticketRoutes");
const userRouter = require("./routes/userRoutes");
const commentRouter = require("./routes/commentRoutes");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(express.json({ type: "application/json" }));
//app.use(bodyParser.json({ type: "application/*+json" }));
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/tickets", ticketRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/comments", commentRouter);
module.exports = app;
