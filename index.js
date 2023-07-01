// 1. npm init
// 2. npm i expess
// 3. npm i nodemon, + "scripts" : {..., "dev": "nodemon index.js" } . npm run dev

const express = require("express");

const app = express();
const PORT = 9999;

app.get("/", (req, res) => {
  res.send(`Hello Woorld`);
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(`Error! ${err}`);
  }

  console.log(`Server OK! http://localhost:${PORT}/`);
});
