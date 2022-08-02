const routes = require("express").Router();
const authentication = require("../middlewares/auth");
const { requestLog } = require("../utils/logRegister");

// CONTROLLERS
const Users = require("../controllers/UsersController");

routes.post("/sign-in", (request, response) => {
  requestLog("POST", "sign-in");
  Users.SignIn(request, response);
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

// routes.use(authentication);
// routes.get("/protected", (request, response) => {
//   return response.json({ message: "Authorized.", user: request.userId });
// });

module.exports = { routes };
