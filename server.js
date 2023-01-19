const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!! Shutting down the app....", err);
  process.exit(1);
});

dotenv.config();
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => {
  console.log("DB CONNECTION SUCCESSFUL");
});

app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
});
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log("app running on port " + port);
});

process.on("unhandeledRejection", (err) => {
  console.log("UNHANDELED REJECTION!! Shutting down the app....");
  server.close(() => {
    process.exit(1);
  });
});
