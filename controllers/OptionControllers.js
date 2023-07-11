const Option = require("../models/Option");

const getAllOptions = async (req, res) => {
  try {
    const items = await Option.find();

    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to find Option List" });
  }
};

const getOneOption = async (req, res) => {
  try {
    const id = req.params.id;

    Option.findById(id)
      .then((doc) => res.json(doc))
      .catch((err) =>
        res.status(500).json({ message: "failed to find one option" })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to find one option" });
  }
};

const createOption = async (req, res) => {
  try {
    const item = new Option({
      customer: req.body.customer,
      hour: req.body.hour,
      km: req.body.km,
    });

    const data = await item.save();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to create item option" });
  }
};

const removeOption = async (req, res) => {
  try {
    const id = req.params.id;

    Option.findOneAndDelete({ _id: id })
      .then((doc) => res.json({ ...doc, message: `delete id:${id}` }))
      .catch((err) =>
        res.status(500).json({ message: "failed to delete work " })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to delete work" });
  }
};

const updateOption = async (req, res) => {
  try {
    const optionId = req.params.id;

    Option.updateOne(
      { _id: optionId },
      {
        customer: req.body.customer,
        hour: req.body.hour,
        km: req.body.km,
      }
    )
      .then((doc) => res.json(doc))
      .catch((err) =>
        res.status(500).json({ message: "failed to patch option item" })
      );

    // return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to patch option item" });
  }
};

module.exports = {
  getAllOptions,
  getOneOption,
  createOption,
  removeOption,
  updateOption,
};
