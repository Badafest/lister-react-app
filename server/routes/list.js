const express = require("express");
const { verifyUserToken } = require("../middlewares");
const {
  getPublicList,
  getPrivateList,
  getUserLists,
  createList,
  getPublicLists,
} = require("../controllers/list");

const router = express.Router();

router.get("/public-data/:_id", getPublicList);
router.get("/public-lists", getPublicLists);
router.get("/private-data/:_id", verifyUserToken, getPrivateList);
router.get("/user-lists", verifyUserToken, getUserLists);

router.post("/create", verifyUserToken, createList);

module.exports = router;
