const routes = require("express").Router();
const {
  scrapTable,
  scrapMatches,
} = require("../controllers/BrasileiroChampionshipController");
const { requestLog } = require("../utils/logRegister");
// import { getTable, scrapTable, getMatches, scrapMatches } from '../controllers/brasileiroChampionshipController';

routes.get("/scrap-table/:championship", (request, response) => {
  requestLog("GET", "scrap-table");
  scrapTable(request, response);
});

// router.get("/table/:championship", (request:Request, response:Response) => {
//   console.log(`[Request: /table/${request.params.championship}]`);
//   getTable(request, response)
// });

routes.get("/matches/:championship", (request, response) => {
  requestLog("GET", "matches");
  scrapMatches(request, response);
});

module.exports = { routes };
