require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//db connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB CONNECTED SUCCESSFULLY");
  })
  .catch((err) => {
    console.log("DB CONNECTION FAILED WITH ERROR =>", err);
  });

//routes
for (route of fs.readdirSync("./routes")) {
  app.use(`/api/${route.split(".")[0]}`, require(`./routes/${route}`));
}

app.listen(8000, () => {
  console.log("SERVER LISTENING ON PORT 8000");
});
