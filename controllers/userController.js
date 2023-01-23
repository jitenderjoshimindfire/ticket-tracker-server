const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
    try{
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
}catch(err){
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}