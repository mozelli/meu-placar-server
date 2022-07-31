require("dotenv").config({ path: ".env.develop" });

// EXPRESS
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
const users = require("./routes/users");
app.use("/users", users.routes);

app.listen(process.env.PORT, () => {
  console.log(`\nServer running on http://localhost:${process.env.PORT}\n`);
});
