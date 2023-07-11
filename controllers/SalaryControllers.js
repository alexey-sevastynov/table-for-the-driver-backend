const Salary = require("../models/Salary");

const getOneSalary = async (req, res) => {
  try {
    const id = req.params.id;

    Salary.findById(id)
      .then((doc) => res.json(doc))
      .catch((err) =>
        res.status(500).json({ message: "failed to find one salary" })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to find one salary" });
  }
};

const updateSalary = async (req, res) => {
  try {
    const salaryId = req.params.id;

    Salary.updateOne(
      { _id: salaryId },
      {
        percent: req.body.percent,
        rate: req.body.rate,
      }
    )
      .then((doc) =>
        res.json({
          ...doc,
          message: `percent: ${req.body.percent}, rate: ${req.body.rate}`,
        })
      )
      .catch((err) =>
        res.status(501).json({
          message: `failed to patch salary item`,
        })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to patch option item" });
  }
};

module.exports = {
  updateSalary,
  getOneSalary,
};
