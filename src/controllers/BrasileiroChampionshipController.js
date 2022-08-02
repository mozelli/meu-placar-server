const TableSerieA = require("../models/TableSerieA");
const TableSerieB = require("../models/TableSerieB");
const MatchesSerieA = require("../models/MatchesSerieA");
const MatchesSerieB = require("../models/MatchesSerieB");
const BrasileiroSerieABets = require("../models/BrasileiroSerieABets");
const BrasileiroSerieBBets = require("../models/BrasileiroSerieBBets");
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
                return response.status(201).json({
                  message: `Parabéns! A coleção MatchesSerie${serie} foi atualizada com sucesso.`,
                });
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

  async getTable(request, response) {
    let Table;
    const serie = request.params.championship;

    if (serie === "A") {
      Table = TableSerieA;
    } else {
      Table = TableSerieB;
    }

    try {
      const table = await Table.find().sort("position");

      responseLog("success", 200, `TableSerie${serie} encontrada com sucesso.`);
      return response.json(table);
    } catch (error) {
      responseLog(
        "error",
        500,
        error.message,
        "BrasileiroChampionshipController.js, getTable(), Table.find()"
      );
      return response.status(500).json(error.message);
    }
  },

  async getMatches(request, response) {
    const serie = request.params.championship;
    let Matches;

    if (serie === "A") {
      Matches = MatchesSerieA;
    } else {
      Matches = MatchesSerieB;
    }

    try {
      const matches = await Matches.find().sort("date");
      let result = [];

      matches.map((match) => {
        let catchDate = new Date(match.date);
        result.push({
          id: match.id,
          team: match.teams,
          date: {
            day: catchDate.getDate(),
            month: catchDate.getMonth() + 1,
            hours: catchDate.getHours() + 3,
            minutes: catchDate.getMinutes(),
          },
          stadium: match.stadium,
        });
      });

      responseLog("success", 200, `Collection MatchesSerie${serie} founded.`);
      return response.json(result);
    } catch (error) {
      responseLog(
        "error",
        500,
        error.message,
        "BrasileiroChampionshipController.js, getMatches(), Matches.find()"
      );
      return response.status(500).json(error.message);
    }
  },

  async createBet(request, response) {
    const serie = request.body.serie;
    const user_id = request.body.user_id;
    const match_id = request.body.match_id;
    const userBet = request.body.bet;

    let Bets;

    if (serie === "A") {
      Bets = BrasileiroSerieABets;
    } else {
      Bets = BrasileiroSerieBBets;
    }

    try {
      const bet = await Bets.create({
        date: new Date(),
        user_id,
        match_id,
        bet: {
          team_a: {
            name: userBet.team_a.name,
            result: userBet.team_a.result,
          },
          team_b: {
            name: userBet.team_b.name,
            result: userBet.team_b.result,
          },
          cash: userBet.cash,
        },
      });

      responseLog("success", 201, `Bet successfully registered.`);
      return response.status(201).json(bet);
    } catch (error) {
      responseLog(
        "error",
        500,
        error.message,
        `BrasileiroChampionshipController.js, createBet(), Bets.create()`
      );
      return response.status(500).json(error.message);
    }
  },
};
