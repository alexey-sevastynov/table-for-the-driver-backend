const Job = require("../models/Job");

const getAll = async (req, res) => {
  try {
    const works = await Job.find();

    res.json(works);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to find jobs List" });
  }
};

const getOneWork = async (req, res) => {
  try {
    const id = req.params.id;

    Job.findById(id)
      .then((doc) => res.json(doc))
      .catch((err) =>
        res.status(500).json({ message: "failed to find one work" })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to find one work" });
  }
};

const createWork = async (req, res) => {
  try {
    const doc = new Job({
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
    });

    const work = await doc.save();

    res.json(work);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to create work" });
  }
};

const removeWork = async (req, res) => {
  try {
    const workId = req.params.id;

    Job.findOneAndDelete({ _id: workId })
      .then((doc) => res.json(doc))
      .catch((err) =>
        res.status(500).json({ message: "failed to delete work" })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to delete work" });
  }
};

const updateWork = async (req, res) => {
  try {
    const workId = req.params.id;

    Job.updateOne(
      { _id: workId },
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
    )
      .then((doc) => res.json(doc))
      .catch((err) =>
        res.status(500).json({ message: "failed to patch work" })
      );

    // return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to patch work" });
  }
};

module.exports = { getAll, getOneWork, createWork, removeWork, updateWork };
