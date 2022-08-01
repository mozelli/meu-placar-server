const routes = require("express").Router();
const {
  scrapTable,
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

// router.put("/scrap-table/:championship", (request:Request, response:Response) => {
//   scrapTable(request, response);
// })

// router.get("/matches/:championship", (request:Request, response:Response) => {
//   console.log(`[Request: /marches/${request.params.championship}]`);
//   getMatches(request, response)
// });

// router.put("/scrap-matches/:championship", (request:Request, response:Response) => {
//   scrapMatches(request, response)
// });

module.exports = { routes };
