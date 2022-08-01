const axios = require("axios");
const cheerio = require("cheerio");
const { successLog, errorLog } = require("../utils/logRegister");

module.exports = {
  async leaderboard(request) {
    const championship = request.params.championship;
    let url = "";
    let teams = [{}];

    switch (championship) {
      case "A":
        url =
          "https://www.terra.com.br/esportes/futebol/brasileiro-serie-a/tabela/";
        break;
      case "B":
        url =
          "https://www.terra.com.br/esportes/futebol/brasileiro-serie-b/tabela/";
        break;
      default:
        throw "No Serie founded.";
    }

    try {
      const html = await axios(url);
      const $ = cheerio.load(html.data);

      $("tr", html.data).each(function () {
        let row = $(this).html() || "";

        let position = $("td.position", row).text();
        let name = $("td.team-name", row).text();
        let points = $("td.points", row).text();
        let shield = $("td.shield", row).find("img").attr("src");

        name = name.replace(/[^a-zA-Zãâáêéíõôú 0-9]+/g, "");

        //name = sanitizeNameBrasileiroChampionship(name);
        // console.log(name);
        teams.push({
          position,
          name,
          points,
          shield,
        });
      });

      teams.shift();
      teams.shift();

      successLog("Data scraping successfully.");

      return teams;
    } catch (error) {
      errorLog(`${error.message}`, "webscraping.js, leaderboard()");
      return error.message;
    }
  },

  async matches(request) {
    const championship = request.params.championship;
    console.log("Get parameter...");

    let url = "";
    let scrapClass = "";
    let matches = [{}];

    switch (championship) {
      case "A":
        url = "https://www.gazetaesportiva.com/campeonatos/brasileiro-serie-a/";
        scrapClass = ".rodadas_grupo_A_numero_rodada_";
        break;
      case "B":
        url = "https://www.gazetaesportiva.com/campeonatos/brasileiro-serie-b/";
        scrapClass = ".rodadas_grupo_A_numero_rodada_";
        break;
      default:
        throw "No Serie founded.";
    }

    try {
      const html = await axios(url);
      const $ = cheerio.load(html.data);

      console.log("Scrapping current round...");

      let nav = $("div .mostrarRodada", html.data).html();
      let currentRound = $("span.nav__games__current", nav).text();
      currentRound = `${currentRound[0]}${currentRound[1]}`;

      console.log("Scrapping data table...");

      let table = $(`div ${scrapClass}${currentRound}`, html.data).html();
      let ul = $("ul", table).html();

      $("li", ul).each(function () {
        let li = $(this).html();
        let date = $("span.date", li).text();
        let teams = $("span.teams", li).text();
        // let result = $("span .date", li).text()

        console.log("Sanitizing data...");

        date = date.replace("•", "");
        const dateSanitized = date.split("\n");
        const dateWithoutBlankLine = dateSanitized.filter((line) => {
          if (line.trim().length === 0) {
            return false;
          }
          return true;
        });

        const stadium = dateWithoutBlankLine[1];

        const breakDate = dateWithoutBlankLine[0].split(" ");
        const data = breakDate[2].split("/");
        const day = data[0];
        day < 10 ? `0${day}` : day;
        const month = data[1];
        month < 10 ? `0${month}` : month;

        const breakHour = breakDate[3].split(":");
        const hour = breakHour[0];
        hour < 10 ? `0${hour}` : hour;
        const minutes = breakHour[1];
        minutes < 10 ? `0${minutes}` : minutes;

        // console.log(`2022-${month}-${day}T${hour}:${minutes}:00-0300`);
        const time = `2022-${month}-${day}T${hour}:${minutes}:00-00:00`;

        const dateTimeStamp = new Date(time);

        const teamsSanitized = teams.split("\n");
        const teamsWithoutBlankLine = teamsSanitized.filter((line) => {
          if (line.trim().length === 0) {
            return false;
          }
          return true;
        });

        matches.push({
          date: dateTimeStamp,
          teams: teamsWithoutBlankLine,
          stadium,
        });
      });

      matches.shift();
      successLog("Matches scrapping finalized.");

      return matches;
    } catch (error) {
      errorLog(error.message, "webscraping.js, matches()");
      return error.message;
    }
  },
};
