const express = require("express");
//const userController = require('./../controllers/userController');
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/", userController.getAllUsers);

module.exports = router;
