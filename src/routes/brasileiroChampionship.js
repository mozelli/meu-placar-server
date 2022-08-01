const routes = require("express").Router();
// import { getTable, scrapTable, getMatches, scrapMatches } from '../controllers/brasileiroChampionshipController';

routes.get("/", (request, response) => {
  return response.json({ message: "Ok!" });
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
