// 1. npm init
// 2. npm i expess
// 3. npm i nodemon, + "scripts" : {..., "dev": "nodemon index.js" } . npm run dev
// 4. npm i mongoose
// 5. npm i dotenv . Hide password the cluster, mongodb

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const {
  getAll,
  getOneWork,
  createWork,
  removeWork,
  updateWork,
} = require("./controllers/JobControllers");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB OK!"))
  .catch((err) => console.log("DB error:", err));

const app = express();
const PORT = 9999;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(`Hello Woorld`);
});

app.get(`/jobs`, getAll);
app.get(`/jobs/:id`, getOneWork);
app.post(`/jobs`, createWork);
app.delete("/jobs/:id", removeWork);
app.patch("/jobs/:id", updateWork);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(`Error! ${err}`);
  }

  console.log(`Server OK! http://localhost:${PORT}/`);
});
