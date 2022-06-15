const express = require("express");
const connection = require("../database/connection.js");
const router = express.Router();

const userQueries = require("../queries/userqueries.js");
const {
  getUserProfile,
  getUserMeasuring,
  getUserLocation,
} = require("../util.js");

router.get("/:emailOrNickname", async (req, res) => {
  const { emailOrNickname } = req.params;
  //   let email = req.body.email;
  try {
    let user = await getUserProfile(emailOrNickname);
    if (user) {
      user.attributes = await getUserMeasuring(user.UserID);
      user.location = await getUserLocation(user.UserID);
      return res.status(200).send({ user });
    } else {
      return res.status(404).send({ err: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
});

module.exports = router;
