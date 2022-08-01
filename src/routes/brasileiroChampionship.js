const routes = require("express").Router();
const {
  scrapTable,
  scrapMatches,
  getTable,
  getMatches,
} = require("../controllers/BrasileiroChampionshipController");
const { requestLog } = require("../utils/logRegister");

routes.get("/scrap-table/:championship", (request, response) => {
  requestLog("GET", "brasileiro-championship/scrap-table");
  scrapTable(request, response);
});

routes.get("/table/:championship", (request, response) => {
  requestLog("GET", "brasileiro-championship/table");
  getTable(request, response);
});

routes.get("/scrap-matches/:championship", (request, response) => {
  requestLog("GET", "brasileiro-championship/scrap-matches");
  scrapMatches(request, response);
});

routes.get("/matches/:championship", (request, response) => {
  requestLog("GET", "brasileiro-championship/matches");
  getMatches(request, response);
});

module.exports = { routes };
