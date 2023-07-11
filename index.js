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
  removeWorkDay,
} = require("./controllers/JobControllers");
const {
  getAllOptions,
  createOption,
  getOneOption,
  removeOption,
  updateOption,
} = require("./controllers/OptionControllers");
const {
  updateSalary,
  createSalary,
} = require("./controllers/SalaryControllers");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB OK!"))
  .catch((err) => console.log("DB error:", err));

const app = express();
const PORT = 9999;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
  <html>
  <head>
      <title>api driver</title>
      <meta charset="utf-8" />
  </head>
  <body>
      <h1>Method api JOBS:</h1>
      <pre>GET: "https://api-table-for-the-driver.vercel.app/jobs" ---> get all list items</pre>
      <pre>GET: "https://api-table-for-the-driver.vercel.app/jobs/:id" ---> get item</pre>
      <pre>POST: "https://api-table-for-the-driver.vercel.app/jobs/" ---> set item</pre>
      <pre>
        {
            id: req.body.id,
            day: req.body.day,
            month: req.body.month,
            year: req.body.year,
            customer: req.body.customer,
            route: req.body.route,
            hours: req.body.hours,
            km: req.body.km,
            income: req.body.income,
            expenditure: req.body.expenditure,
            status: req.body.status,
        }
      </pre>
      <pre>PATCH: "https://api-table-for-the-driver.vercel.app/jobs/:id" ---> edit item</pre>
      <pre>DELETE: "https://api-table-for-the-driver.vercel.app/jobs/:id" ---> delete item</pre>
      <pre>DELETE: "https://api-table-for-the-driver.vercel.app/jobs/allDay/:day/:month/:year" ---> delete items all day</pre>
     

        <h1>Method api OPIONS:</h1>
      <pre>GET: "https://api-table-for-the-driver.vercel.app/options" ---> get all list items</pre>
      <pre>GET: "https://api-table-for-the-driver.vercel.app/options/:id" ---> get item</pre>
      <pre>POST: "https://api-table-for-the-driver.vercel.app/options/" ---> set item</pre>
      <pre>
        {
            customer: req.body.customer,
            hour: req.body.hour,
            km: req.body.km,
        }
      </pre>
      <pre>PATCH: "https://api-table-for-the-driver.vercel.app/options/:id" ---> edit item</pre>
      <pre>DELETE: "https://api-table-for-the-driver.vercel.app/options/:id" ---> delete item</pre>
     
      <h1>Method api SALARIES:</h1>

      <pre>PATCH: "https://api-table-for-the-driver.vercel.app/salaries/:id" ---> edit item</pre>
      <pre>  
      id==='64ad672639cd0103a96fac57';
     {
        percent: req.body.percent,
        rate: req.body.rate,
      }
      </pre>

  </body>
  <html>`);
});

app.get(`/jobs`, getAll);
app.get(`/jobs/:id`, getOneWork);
app.post(`/jobs`, createWork);
app.delete("/jobs/:id", removeWork);
app.delete("/jobs/allDay/:day/:month/:year", removeWorkDay);
app.patch("/jobs/:id", updateWork);

app.get(`/options`, getAllOptions);
app.get("/options/:id", getOneOption);
app.post("/options", createOption);
app.delete("/options/:id", removeOption);
app.patch("/options/:id", updateOption);

app.patch("/salaries/:id", updateSalary);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(`Error! ${err}`);
  }

  console.log(`Server OK! http://localhost:${PORT}/`);
});
