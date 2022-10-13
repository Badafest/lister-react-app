const express = require("express");

const router = express.Router();

router.get("/public-data/:_id", async (req, res) => {
  const { _id } = req.params;
  res.json({
    _id: _id,
    name: "John Doe",
    bio: "Hello! I am John Doe",
  });
  // const user_public_data = await
});

module.exports = router;
