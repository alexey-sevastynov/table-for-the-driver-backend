// 1. npm init
// 2. npm i expess
// 3. npm i nodemon, + "scripts" : {..., "dev": "nodemon index.js" } . npm run dev
// 4. npm i mongoose
// 5. npm i dotenv . Hide password the cluster, mongodb

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const TelegramBot = require("node-telegram-bot-api");
const schedule = require("node-schedule");

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
  getOneSalary,
} = require("./controllers/SalaryControllers");

const {
  getAllEvents,
  createEvent,
  removeEvent,
} = require("./controllers/EventControllers");

// const chatId = process.env.CHAT_ID;
// const sentNotifications = new Set();

// const token = process.env.TOKEN;
// const bot = new TelegramBot(token, { polling: true });

// bot.setMyCommands([{ command: "/start", description: "start app" }]);

// bot.on("message", async (msg) => {
//   const text = msg.text;

//   if (text === "/start") {
//     await bot.sendMessage(chatId, `Hello ${msg.from.first_name}!`);
//   }
//   if (text === "hi") {
//     await bot.sendMessage(chatId, `Hello ${msg.from.first_name}!`);
//   }
//   // bot.sendMessage(chatId, `your message: ${text}`);
// });

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then((client) => {
    console.log("DB OK!");

    // const db = client.connection;
    // const collection = db.collection("events");

    // Run a schedule that will check the databases every minute
    // const runScheduledTask = schedule.scheduleJob("*/1 * * * *", async () => {
    //   const utcTime = new Date();
    //   const localTime = new Date(
    //     utcTime.toLocaleString("en-US", { timeZone: "Europe/Kiev" })
    //   );
    //   localTime.setMinutes(localTime.getMinutes() + 60); // One hour ahead

    //   console.log(localTime, localTime);
    //   const events = await collection
    //     .find({ dateStart: { $gte: localTime } })
    //     // .find({ dateStart: { $lte: localTime } })
    //     .toArray();

    //   events.forEach((event) => {
    //     if (!sentNotifications.has(event._id.toString())) {
    //       console.log(event.dateStart);
    //       const message = `reminders:  - ${event._id}, ${event.dateStart}`;
    //       bot.sendMessage(chatId, message);

    //       sentNotifications.add(event._id.toString());
    //     }
    //   });
    // });
  })
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

// const db = mongoose.connection;
// app.get("/events", async (req, res) => {
//   try {
//     const collection = db.collection("events");

//     const utcTime = new Date();
//     const localTime = new Date(
//       utcTime.toLocaleString("en-US", { timeZone: "Europe/Kiev" })
//     );
//     localTime.setMinutes(localTime.getMinutes() + 60); // One hour ahead

//     localTime.setSeconds(0);

//     const events = await collection
//       .find({
//         dateStart: {
//           $gte: localTime,
//           $lte: new Date(localTime.getTime() + 1000),
//         },
//       })
//       .toArray();

//     events.forEach((event) => {
//       const message = `text wrote bot:  - ${event._id}, ${event.title}`;
//       console.log(message);
//       bot.sendMessage(chatId, message);
//     });

//     res.status(200).send("Task executed successfully");
//     console.log(localTime);
//   } catch (error) {
//     console.error("Error executing the task:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.get("/events", getAllEvents);
app.post("/events", createEvent);
app.delete("/events/:id", removeEvent);

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

app.get("/salaries/:id", getOneSalary);
app.patch("/salaries/:id", updateSalary);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(`Error! ${err}`);
  }

  console.log(`Server OK! http://localhost:${PORT}/`);
});

// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, "Hello world!");
// });

// function sendNotification(chatId, message) {
//   bot.sendMessage(chatId, message);
// }

// function scheduleNotification(chatId, message, date) {
//   const now = new Date();
//   const targetDate = new Date(date);

//   const timeDiff = targetDate - now;

//   if (timeDiff > 0) {
//     setTimeout(() => {
//       sendNotification(chatId, message);
//     }, timeDiff);
//   } else {
//     console.log("The specified date and time have already passed.");
//   }
// }

// sendNotification(chatId, "application development");

// const notificationDate = new Date("2023-10-12T20:10:00");

// scheduleNotification(
//   chatId,
//   "Notification at a specified date and time",
//   notificationDate
// );
