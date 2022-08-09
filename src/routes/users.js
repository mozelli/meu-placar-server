const routes = require("express").Router();
const authentication = require("../middlewares/auth");
const { requestLog } = require("../utils/logRegister");

// CONTROLLERS
const Users = require("../controllers/UsersController");

routes.post("/sign-in", (request, response) => {
  requestLog("POST", "sign-in");
  Users.SignIn(request, response);
});

routes.get("/authenticate", authentication, (request, response) => {
  return response.json({ authorized: true });
});

routes.post("/add-new-user", (request, response) => {
  requestLog("POST", "add-new-user");
  Users.AddNewUser(request, response);
});

routes.get("/email-validation/:token", (request, response) => {
  requestLog("POST", "email-validation");
  Users.EmailValidation(request, response);
});

routes.get("/", (request, response) => {
  requestLog("GET", "users/");
  Users.getUsers(request, response);
});

routes.get("/:id", (request, response) => {
  requestLog("GET", "users/:id");
  Users.getUserById(request, response);
});

routes.delete("/:id", (request, response) => {
  requestLog("DELETE", "users/:id");
  Users.deleteUserById(request, response);
});

routes.put("/email-update/:id", (request, response) => {
  requestLog("PUT", "users/email-update/:id");
  Users.updateEmailById(request, response);
});

routes.put("/add-coins/:id", (request, response) => {
  requestLog("PUT", "users/update-coins/:id");
  Users.addCoins(request, response);
});

module.exports = { routes };
