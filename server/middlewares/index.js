const jwt = require("jsonwebtoken");

const verifyUserToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).send({
      ok: false,
      message: "No logged in user was found",
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).send({
        ok: false,
        message: "Error in user authorization",
      });
    }
    req.user = user;
    next();
  });
};

module.exports = { verifyUserToken };
