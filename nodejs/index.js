const express = require("express");
const app = express();
const parser = require("body-parser");
const cors = require("cors")
const jsonParser = parser.json();

app.use(jsonParser);
app.use(cors())

const PORT = 3000;

const loginRoutes = require("./routes/login.js");
const registerRoutes = require("./routes/register.js");
const locationRoutes = require("./routes/location.js");
const profileRoutes = require("./routes/profile.js");
const weatherRoutes = require("./routes/weather.js");

app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/location", locationRoutes);
app.use("/profile", profileRoutes);
app.use("/weather", weatherRoutes);
app.get("/", (req, res) => {
  res.send({ greetings: "Hello there!" });
});

app.listen(PORT, () => {
  console.log("Listening on", PORT);
});
