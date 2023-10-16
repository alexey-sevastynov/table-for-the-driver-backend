const Event = require("../models/Event");

const getAllEvents = async (req, res) => {
  try {
    const items = await Event.find();

    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to find Event List" });
  }
};

const createEvent = async (req, res) => {
  try {
    const item = new Event({
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      customer: req.body.customer,
      pointStart: req.body.pointStart,
      pointEnd: req.body.pointEnd,
      car: req.body.car,
      description: req.body.description,
    });

    const data = await item.save();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to create item event" });
  }
};

const removeEvent = async (req, res) => {
  try {
    const id = req.params.id;

    Event.findOneAndDelete({ _id: id })
      .then((doc) => res.json({ ...doc, message: `delete id:${id}` }))
      .catch((err) =>
        res.status(500).json({ message: "failed to delete event " })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to delete work" });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  removeEvent,
};
