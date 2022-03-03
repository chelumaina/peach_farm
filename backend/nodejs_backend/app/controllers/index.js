const db = require("../models");
const PeachFarm = db.peach_farm;
const Op = db.Sequelize.Op;

exports.companyDetails = (req, res) => {
  const title = req.query.title;

  PeachFarm.findAll()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving Peach",
      });
    });
};

exports.companyDetailsww = (req, res) => {
  const id = req.params.id;

  //PeachFarm.findByPk(id)
  PeachFarm.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Peach with id=" + id,
      });
    });
};

;
