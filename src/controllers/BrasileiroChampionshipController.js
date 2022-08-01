const TableSerieA = require("../models/TableSerieA");
const TableSerieB = require("../models/TableSerieB");
const { leaderboard } = require("../modules/webscraping");
const { responseLog, successLog } = require("../utils/logRegister");

module.exports = {
  async scrapTable(request, response) {
    const serie = request.params.championship;

    leaderboard(request)
      .then((responseDataTable) => {
        let Table;
        console.log(serie);

        if (serie === "A") {
          Table = TableSerieA;
        } else {
          Table = TableSerieB;
        }

        Table.deleteMany()
          .then(() => {
            successLog(`Collection TableSerie${serie} successfully cleaned.`);

            Table.create(responseDataTable)
              .then(() => {
                responseLog(
                  "success",
                  201,
                  `New collection TableSerie${serie} successfully created.`
                );
                return response.status(201).json({
                  message: `Parabéns! A coleção TableSerie${serie} foi atualizada com sucesso.`,
                });
              })
              .catch((error) => {
                responseLog(
                  "error",
                  500,
                  error.message,
                  "BrasileiroChampionshipController.js, scrapTable(), leaderboard(), Table.deleteMany(), Table.create()"
                );
                return response.status(500).json(error.message);
              });
          })
          .catch((error) => {
            responseLog(
              "error",
              500,
              error.message,
              "BrasileiroChampionshipController.js, scrapTable(), leaderboard(), Table.deleteMany()"
            );
            return response.status(500).json(error.message);
          });
      })
      .catch((error) => {
        responseLog(
          "error",
          500,
          error.message,
          "BrasileiroChampionshipController.js, scrapTable(), leaderboard()"
        );
        return response.status(500).json(error.message);
      });
  },
};
