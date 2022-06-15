const express = require("express");
const connection = require("../database/connection.js");
const router = express.Router();

const locationQueries = require("../queries/locationqueries.js");

const { getCountries, getCountryCities } = require("../util.js");

router.get("/countries", async (req, res) => {
  //   let { emailOrNickname, password } = req.body;
  try {
    let countries = await getCountries();
    res.send({ countries });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
});
router.get("/cities/:countryID", async (req, res) => {
  const { countryID } = req.params;
  try {
    let cities = await getCountryCities(countryID);
    res.send({ cities });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
});

module.exports = router;
