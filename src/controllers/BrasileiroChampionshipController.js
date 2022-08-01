const TableSerieA = require("../models/TableSerieA");
const TableSerieB = require("../models/TableSerieB");
const MatchesSerieA = require("../models/MatchesSerieA");
const MatchesSerieB = require("../models/MatchesSerieB");
const { leaderboard, matches } = require("../modules/webscraping");
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

  async scrapMatches(request, response) {
    const serie = request.params.championship;

    matches(request)
      .then((responseDataMatches) => {
        let Matches;

        if (serie === "A") {
          Matches = MatchesSerieA;
        } else {
          Matches = MatchesSerieB;
        }

        Matches.deleteMany()
          .then(() => {
            successLog(`Collection MatchesSerie${serie} successfully cleaned.`);

            Matches.create(responseDataMatches)
              .then(() => {
                responseLog(
                  "success",
                  201,
                  `New collection MatchesSerie${serie} successfully created.`
                );
              })
              .catch((error) => {
                responseLog(
                  "error",
                  500,
                  error.message,
                  "BrasileiroChampionshipController.js, scrapMatches(), matches(), Matches.deleteMany(), Matches.create()"
                );
                return response.status(500).json(error.message);
              });
          })
          .catch((error) => {
            responseLog(
              "error",
              500,
              error.message,
              "BrasileiroChampionshipController.js, scrapMatches(), matches(), Matches.deleteMany()"
            );
            return response.status(500).json(error.message);
          });
      })
      .catch((error) => {
        responseLog(
          "error",
          500,
          error.message,
          "BrasileiroChampionshipController.js, scrapMatches(), matches()"
        );
        return response.status(500).json(error.message);
      });
  },
};
