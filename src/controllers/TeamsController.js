const TableSerieA = require("../models/TableSerieA");
const TableSerieB = require("../models/TableSerieB");
const Teams = require("../models/Teams");
const { responseLog } = require("../utils/logRegister");

module.exports = {
  async AddTeams(request, response) {
    try {
      const teamsSerieA = await TableSerieA.find();
      const teamsSerieB = await TableSerieB.find();
      let teams = [];

      teamsSerieA.map((team) => {
        teams.push({ name: team.name, shield: team.shield });
      });
      teamsSerieB.map((team) => {
        teams.push({ name: team.name, shield: team.shield });
      });

      const teamsTable = await Teams.create(teams);

      responseLog("success", 201, "Collection Teams created.");

      return response.status(201).json(teamsTable);
    } catch (error) {
      responseLog(
        "error",
        500,
        error.message,
        "TeamsController.js, AddTeams()"
      );
      return response.status(500).json(error.message);
    }
  },

  async getTeams(request, response) {
    try {
      const team = await Teams.find();
      responseLog("success", 200, "Teams founded.");
      return response.json(team);
    } catch (error) {
      responseLog(
        "error",
        400,
        error.message,
        "TeamsController.js, getTeams(), Teams.find()"
      );
      return response.json(error);
    }
  },

  async getTeamById(request, response) {
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

  async setShortName(request, response) {
    const { team_id, short_name } = request.body;

    try {
      const team = await Teams.findByIdAndUpdate(team_id, {
        $set: {
          short_name,
        },
      });
      responseLog("success", 201, "Short name included.");
      return response.status(201).json(team);
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
};
