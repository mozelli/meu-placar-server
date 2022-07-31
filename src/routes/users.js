const routes = require("express").Router();

// CONTROLLERS
const Users = require("../controllers/UsersController");

routes.post("/login", (request, response) => {
  Users.Login(request, response);
});

routes.post("/add-new-user", (request, response) => {
  Users.AddNewUser(request, response);
});

module.exports = { routes };
