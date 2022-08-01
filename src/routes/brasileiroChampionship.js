const routes = require("express").Router();
const {
  scrapTable,
  scrapMatches,
  getTable,
} = require("../controllers/BrasileiroChampionshipController");
const { requestLog } = require("../utils/logRegister");
// import { getTable, scrapTable, getMatches, scrapMatches } from '../controllers/brasileiroChampionshipController';

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

module.exports = { routes };
