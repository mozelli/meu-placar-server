const routes = require("express").Router();
const authentication = require("../middlewares/auth");

// CONTROLLERS
const Users = require("../controllers/UsersController");

routes.post("/sign-in", (request, response) => {
  Users.SignIn(request, response);
});

routes.post("/add-new-user", (request, response) => {
  Users.AddNewUser(request, response);
});

routes.get("/email-validation/:token", (request, response) => {
  Users.EmailValidation(request, response);
});

// routes.use(authentication);
// routes.get("/protected", (request, response) => {
//   return response.json({ message: "Authorized.", user: request.userId });
// });

module.exports = { routes };
