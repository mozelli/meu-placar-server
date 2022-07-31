const routes = require("express").Router();

// CONTROLLERS
const Users = require("../controllers/UsersController");

routes.post("/sign-in", (request, response) => {
  Users.SignIn(request, response);
});

routes.post("/add-new-user", (request, response) => {
  Users.AddNewUser(request, response);
});

module.exports = { routes };
