const express = require("express");
const connection = require("../database/connection.js");
const router = express.Router();

const userQueries = require("../queries/userqueries.js");

const findUser = (emailOrNickname, password) => {
  return new Promise((resolve, reject) => {
    let conn = connection();
    conn.query(
      userQueries.findUserByCredentials(emailOrNickname, password),
      (err, res, fields) => {
        if (err) {
          reject(err);
          return conn.destroy();
        }
        resolve(res[0]);
        return conn.destroy();
      }
    );
  });
};
router.post("/", async (req, res) => {
  let { emailOrNickname, password } = req.body;

  let user = await findUser(emailOrNickname, password);
  if (user) {
    console.log(user)
    return res.send({ user });
  } else {
    return res.status(404).send();
  }
});

module.exports = router;
