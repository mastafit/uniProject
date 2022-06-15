const express = require("express");
const connection = require("../database/connection.js");
const router = express.Router();

const userQueries = require("../queries/userqueries.js");
const { findUser,createUser,createPersonalAccount,addUserCity } = require("../util.js");

router.post("/", async (req, res) => {
  const {name,surname,nickname,age,city,country,date,email,phoneNumber,password} = req.body;
  let user = await findUser(email, password);
  if (user) {
    return res.status(400).send();
  } else {
    try{
      let userId = await createUser(name,surname,email,phoneNumber);
      let personalAccountID = await createPersonalAccount(userId,date,age,nickname,password)
      let locationID = await addUserCity(userId,city); 

     return  res.status(201).send({res: "OK!"})
    }catch(err){
      console.log(err)
    return res.status(500).send({err});
    }
  }
});

module.exports = router;
