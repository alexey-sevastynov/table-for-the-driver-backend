const Salary = require("../models/Salary");

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
};
