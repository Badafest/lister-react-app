const express = require("express");
const {
  getPublicUserData,
  createUser,
  loginUser,
} = require("../controllers/user");

const router = express.Router();

//get requests
//1. get user's public data
router.get("/public-data/:_id", getPublicUserData);

//post requests
//1. create new user
router.post("/create", createUser);
//2. login user
router.post("/login", loginUser);

module.exports = router;
