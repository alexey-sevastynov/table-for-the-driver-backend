// 1. npm init
// 2. npm i expess
// 3. npm i nodemon, + "scripts" : {..., "dev": "nodemon index.js" } . npm run dev
// 4. npm i mongoose
// 5. npm i dotenv . Hide password the cluster, mongodb

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB OK!"))
  .catch((err) => console.log("DB error:", err));

const app = express();
const PORT = 9999;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hello Woorld`);
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(`Error! ${err}`);
  }

  console.log(`Server OK! http://localhost:${PORT}/`);
});
