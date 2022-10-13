const User = require("../models/User");

const getPublicUserData = async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findById(_id).select("-password -email");
    res.json({
      ok: true,
      data: user,
    });
  } catch (err) {
    console.log("ERROR IN FETCHING PUBLIC USER DATA => ", err);
    res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const createUser = async (req, res) => {
  const userData = req.body;
  console.log(userData);
  if (userData.username && userData.email && userData.password) {
    try {
      const user = await User.create(userData);
      res.json({
        ok: true,
        _id: user._id,
      });
    } catch (err) {
      console.log("ERROR IN CREATE USER => ", err);
      res.status(500).json({
        ok: false,
        message:
          err.code === 11000
            ? `${Object.keys(err.keyValue)[0]} is already taken`
            : err.message,
      });
    }
  } else {
    res.status(500).json({
      ok: false,
      message: "Error occurred due to bad request body",
    });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    try {
      const user = await User.findOne({ username });
      if (user) {
        const result = user.comparePassword(password);
        if (result) {
          res.json({
            ok: true,
            data: await User.findById(user._id).select("-password"),
          });
        } else {
          res.status(500).json({
            ok: false,
            message: "Password is incorrect",
          });
        }
      } else {
        res.status(500).json({
          ok: false,
          message: "User not found",
        });
      }
    } catch (err) {
      console.log("ERROR IN USER AUTHENTICATION => ", err);
      res.status(500).json({
        ok: false,
        message: err.message,
      });
    }
  } else {
    res.status(500).json({
      ok: false,
      message: "Username and Password are required",
    });
  }
};

module.exports = { getPublicUserData, createUser, loginUser };
