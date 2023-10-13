const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cron = require("node-cron");
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then((client) => {
    console.log("DB OK!");

    const chatId = process.env.CHAT_ID;
    const db = client.connection;
    const collection = db.collection("events");
    const sentNotifications = new Set();

    // Run a schedule that will check the databases every minute
    cron.schedule("*/1 * * * *", async () => {
      const utcTime = new Date();
      const localTime = new Date(
        utcTime.toLocaleString("en-US", { timeZone: "Europe/Kiev" })
      );
      localTime.setMinutes(localTime.getMinutes() + 60); // One hour ahead

      console.log(localTime, localTime);
      const events = await collection
        .find({ dateStart: { $gte: localTime } })
        .toArray();

      events.forEach((event) => {
        if (!sentNotifications.has(event._id.toString())) {
          console.log(event.dateStart);
          const message = `reminders:  - ${event._id}, ${event.dateStart}`;
          bot.sendMessage(chatId, message);
          sentNotifications.add(event._id.toString());
        }
      });
    });
  })
  .catch((err) => console.log("DB error:", err));

module.exports = router;
