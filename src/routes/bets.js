const routes = require("express").Router();
// const authentication = require("../middlewares/auth");
const { requestLog } = require("../utils/logRegister");

// CONTROLLERS
const Bets = require("../controllers/BetsController");

routes.post("/", (request, response) => {
  requestLog("POST", "bets/");
  Bets.createBet(request, response);
});

routes.get("/", (request, response) => {
  requestLog("GET", "bets/");
  Bets.getBets(request, response);
});

// routes.use(authentication);
// routes.get("/protected", (request, response) => {
//   return response.json({ message: "Authorized.", user: request.userId });
// });

module.exports = { routes };
