require("dotenv").config({ path: ".env.develop" });
const cors = require("cors");
// ROUTES
const users = require("./routes/users");
const brasileiroChampionship = require("./routes/brasileiroChampionship");
const teams = require("./routes/teams");
const bets = require("./routes/bets");

// EXPRESS
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ROUTES
app.use("/users", users.routes);
app.use("/brasileiro-championship", brasileiroChampionship.routes);
app.use("/teams", teams.routes);
app.use("/bets", bets.routes);

app.listen(process.env.PORT, () => {
  console.log(`\nServer running on http://localhost:${process.env.PORT}\n`);
});
