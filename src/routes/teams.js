const routes = require("express").Router();
// const authentication = require("../middlewares/auth");
const { requestLog } = require("../utils/logRegister");

// CONTROLLERS
const Teams = require("../controllers/TeamsController");

routes.get("/generate-teams-table", (request, response) => {
  requestLog("GET", "teams/generate-teams-table");
  Teams.AddTeams(request, response);
});

routes.get("/", (request, response) => {
  requestLog("GET", "teams/");
  Teams.getTeams(request, response);
});

routes.get("/:id", (request, response) => {
  requestLog("GET", "teams/:id");
  Teams.getTeamById(request, response);
});

routes.post("/insert-short-name", (request, response) => {
  requestLog("POST", "teams/insert-short-name");
  Teams.setShortName(request, response);
});

// routes.use(authentication);
// routes.get("/protected", (request, response) => {
//   return response.json({ message: "Authorized.", user: request.userId });
// });

module.exports = { routes };
