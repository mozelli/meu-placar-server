const routes = require("express").Router();

// CONTROLLERS
const Users = require("../controllers/UsersController");

routes.get("/", (request, response) => {
  Users.Login(request, response);
});

module.exports = { routes };
