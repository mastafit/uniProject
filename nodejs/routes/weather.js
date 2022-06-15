const express = require("express");
const connection = require("../database/connection.js");
const router = express.Router();

const weatherQueries = require("../queries/weatherqueries.js");
const { getWeatherByCity } = require("../util.js");

router.get("/:cityName", async (req, res) => {
  const { cityName } = req.params;
  //   let email = req.body.email;
  try {
    let weather = await getWeatherByCity(cityName);
    if (weather) {
      return res.status(200).send({ weather });
    } else {
      return res.status(404).send({ err: "Weather not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
});

module.exports = router;
