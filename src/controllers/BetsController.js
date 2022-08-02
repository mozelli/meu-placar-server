const Teams = require("../models/Teams");
const MatchesSerieA = require("../models/MatchesSerieA");
const Bets = require("../models/BettingExchange");
const { responseLog } = require("../utils/logRegister");

module.exports = {
  async createBet(request, response) {
    const { match_id, result, user_id } = request.body;

    try {
      const bet = await Bets.findOne({ match_id, result });
      if (bet) {
        const newGamblers = [...bet.gamblers, user_id];
        const betUpdated = await Bets.findOneAndUpdate(
          { match_id, result },
          {
            gamblers: newGamblers,
          }
        );
        responseLog("success", 201, "Bet atualized.");
        return response.status(201).json(betUpdated);
      } else {
        const newBet = await Bets.create({
          match_id,
          result,
          gamblers: [user_id],
        });
        responseLog("success", 201, "New bet created.");
        return response.status(201).json(newBet);
      }
    } catch (error) {
      responseLog(
        "error",
        500,
        error.message,
        "BetsController.js, createBet()"
      );
      return response.status(500).json(error.message);
    }
  },

  async getBets(request, response) {
    try {
      const bets = await Bets.find();
      responseLog("success", 200, "Bets founded.");
      return response.json(bets);
    } catch (error) {
      responseLog(
        "error",
        400,
        error.message,
        "BetsController.js, getBets(), Bets.find()"
      );
      return response.json(error);
    }
  },

  async getBetById(request, response) {
    const id = request.params.id;
    try {
      const team = await Teams.findOne({ _id: id });
      responseLog("success", 200, "Teams founded by ID.");
      return response.json(team);
    } catch (error) {
      responseLog(
        "error",
        400,
        error.message,
        "TeamsController.js, getTeamById(), Teams.findOne()"
      );
      return response.json(error);
    }
  },

  // async setShortName(request, response) {
  //   const { team_id, short_name } = request.body;

  //   try {
  //     const team = await Teams.findByIdAndUpdate(team_id, {
  //       $set: {
  //         short_name,
  //       },
  //     });
  //     responseLog("success", 201, "Short name included.");
  //     return response.status(201).json(team);
  //   } catch (error) {
  //     responseLog(
  //       "error",
  //       400,
  //       error.message,
  //       "TeamsController.js, getTeamById(), Teams.findOne()"
  //     );
  //     return response.json(error);
  //   }
  // },
};
