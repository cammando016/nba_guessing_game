import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//List of team names against team codes in API
const teamNames = [
    {
      id: 0,
      teamCode: 'ATL',
      teamName: 'Atlanta Hawks'
    },
    {
      id: 1,
      teamCode: 'BOS',
      teamName: 'Boston Celtics'
    },
    {
      id: 2,
      teamCode: 'BRK',
      teamName: 'Brooklyn Nets'
    },
    {
      id: 3,
      teamCode: 'CHI',
      teamName: 'Chicago Bulls'
    },
    {
      id: 4,
      teamCode: 'CHO',
      teamName: 'Charlotte Hornets'
    },
    {
      id: 5,
      teamCode: 'CLE',
      teamName: 'Cleveland Cavaliers'
    },
    {
      id: 6,
      teamCode: 'DAL',
      teamName: 'Dallas Mavericks'
    },
    {
      id: 7,
      teamCode: 'DEN',
      teamName: 'Denver Nuggets'
    },
    {
      id: 8,
      teamCode: 'DET',
      teamName: 'Detroit Pistons'
    },
    {
      id: 9,
      teamCode: 'GSW',
      teamName: 'Golden State Warriors'
    },
    {
      id: 10,
      teamCode: 'HOU',
      teamName: 'Houston Rockets'
    },
    {
      id: 11,
      teamCode: 'IND',
      teamName: 'Indiana Pacers'
    },
    {
      id:12,
      teamCode: 'LAC',
      teamName: 'Los Angeles Clippers'
    },
    {
      id: 13,
      teamCode: 'LAL',
      teamName: 'Los Angeles Lakers'
    },
    {
      id: 14,
      teamCode: 'MEM',
      teamName: 'Memphis Grizzlies'
    },
    {
      id: 15,
      teamCode: 'MIA',
      teamName: 'Miami Heat'
    },
    {
      id: 16,
      teamCode: 'MIL',
      teamName: 'Milwaukee Bucks'
    },
    {
      id: 17,
      teamCode: 'MIN',
      teamName: 'Minnesota Timberwolves'
    },
    {
      id: 18,
      teamCode: 'NOP',
      teamName: 'New Orleans Pelicans'
    },
    {
      id: 19,
      teamCode: 'NYK',
      teamName: 'New York Knicks'
    },
    {
      id: 20,
      teamCode: 'OKC',
      teamName: 'Oklahoma City Thunder'
    },
    {
      id: 21,
      teamCode: 'ORL',
      teamName: 'Orlando Magic'
    },
    {
      id: 22,
      teamCode: 'PHI',
      teamName: 'Philadelphia 76ers'
    },
    {
      id: 23,
      teamCode: 'PHO',
      teamName: 'Phoenix Suns'
    },
    {
      id: 24,
      teamCode: 'POR',
      teamName: 'Portland Trail Blazers'
    },
    {
      id: 25,
      teamCode: 'SAC',
      teamName: 'Sacramento Kings'
    },
    {
      id: 26,
      teamCode: 'SAS',
      teamName: 'San Antonio Spurs'
    },
    {
      id: 27,
      teamCode: 'TOR',
      teamName: 'Toronto Raptors'
    },
    {
      id: 28,
      teamCode: 'UTA',
      teamName: 'Utah Jazz'
    },
    {
      id: 29,
      teamCode: 'WAS',
      teamName: 'Washington Wizards'
    },
  ]

//Function to replace the team code returned from API with the name of the team
function checkTeamCode(teamCode) {
    const matchTeamCode = teamNames.find(team => (
      team.teamCode === teamCode
    ));

    return matchTeamCode ? matchTeamCode.teamName : teamCode;
}

//Collect player data from API and process into filtered array
//Filtered array will: remove duplicate players who changed teams, replace team code with team name, remove players without photo
async function generatedFilteredPlayers() {
    const imageFolder = path.join(__dirname, "public", "player-images");

    const response = await fetch("http://rest.nbaapi.com/api/PlayerDataTotals/season/2025");
    const allPlayerData = await response.json();

    const uniquePlayers = {};
    const filteredPlayers = [];

    allPlayerData.forEach(player => {
        const filePath = path.join(imageFolder, `${player.id}.png`);

        if(fs.existsSync(filePath)) {
            const name = player.playerName;

            if(!uniquePlayers[name] || player.id > uniquePlayers[name].playerId) {
                uniquePlayers[name] = {
                    playerId: player.id,
                    playerName: player.playerName,
                    playerTeam: checkTeamCode(player.team),
                    playerGames: player.games,
                    playerPpg: Math.round((player.points/player.games)*100)/100,
                    playerRpg: Math.round((player.totalRb/player.games)*100)/100,
                    playerApg: Math.round((player.assists/player.games)*100)/100,
                    playerSpg: Math.round((player.steals/player.games)*100)/100,
                    playerBpg: Math.round((player.blocks/player.games)*100)/100,
                    playerHeadshotSrc: `/player-images/${player.id}.png`
                }
            }
        }
    });

    for (let player of Object.values(uniquePlayers)) {
        filteredPlayers.push(player);
    }

    fs.writeFileSync(
        path.join(__dirname, "public", "filtered-players.json"),
        JSON.stringify(filteredPlayers, null, 2)
    );

    console.log(filteredPlayers);
}

generatedFilteredPlayers();