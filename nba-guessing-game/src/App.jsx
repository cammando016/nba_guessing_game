import './App.css'
import React from "react";
import { useState, useEffect } from "react";

//Component imports
import Game from './components/game.jsx'
import Background from './components/background.jsx'
import ShotClock from './components/shotclock.jsx'
import GuessHistory from './components/full-guess-history.jsx'
import PlayerStats from './components/player-stats.jsx'

//Image imports
import gameLogo from './assets/images/displays/banner.jpg'
import LeftCourt from './assets/images/displays/court.jpg'
import RightCourt from './assets/images/displays/court-right.jpg'

function App() {
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [filteredPlayerData, setFilteredPlayerData] = useState([]);
  const [randPlayerIndex, setRandPlayerIndex] = useState(Math.floor(Math.random()*filteredPlayerData.length))
  const [guessResultHistory, setGuessResultHistory] = useState([]);

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

  //State update functions to pass into Game component
  const updateCorrectCount = (newCount) => setCorrect(newCount);
  const updateIncorrectCount = (newCount) => setIncorrect(newCount);
  const updateRandPlayerIndex = (array) => setRandPlayerIndex(Math.floor(Math.random()*array.length));
  const updateGuessResultHistory = (newGuess) => (
    setGuessResultHistory(prev => [
      ...prev, 
      {
        playerId: newGuess.playerId,
        playerName: newGuess.playerName,
        guessedTeam: document.querySelector('#player-guess').value,
        correctTeam: newGuess.playerTeam
      }
    ])
  );

  const clearGuessResultHistory = () => (
    setGuessResultHistory([])
  );

  //Function to remove record of old team for players traded mid season
  function removeDupePlayers(playersArray) {
    const uniquePlayers = {};

    playersArray.forEach(player => {
      const name = player.playerName;
      if(!uniquePlayers[name] || player.playerId > uniquePlayers[name].playerId) {
        uniquePlayers[name] = player;
      }
    });

    return Object.values(uniquePlayers);
  }

  //Function to replace the team code returned from API with the name of the team
  function checkTeamCode(teamCode) {
    const matchTeamCode = teamNames.find(team => (
      team.teamCode === teamCode
    ));

    return matchTeamCode ? matchTeamCode.teamName : teamCode;
  }

  //Function to get player image source from /public/player-image
  function getPlayerImageFile(playerId) {
    const imagePath = `/player-images/${playerId}.png`;

    return imagePath;
  }

  //Function to collect list of player data (team, stats, ID)
  useEffect(() => {
    async function fillPlayerDict() {
      try {
        const response = await fetch('http://rest.nbaapi.com/api/PlayerDataTotals/season/2025',{
          'method':'GET'
        });
    
        const allPlayerData = await response.json();
        console.log('Player data collected successfully.')
        console.log(allPlayerData[0]);
        
        //Pull required data out of API response
        const dupeFilteredPlayerData = allPlayerData.map((player) => {
          const fs = require('fs');
          const filePath = `/player-images/${playerId}.png`
          //const imgSrc = getPlayerImageFile(player.id)
          
          if (fs.existsSync(filePath)) {
            return {
              playerId: player.id,
              playerName: player.playerName,
              playerTeam: checkTeamCode(player.team),
              playerPpg: Math.round((player.points/player.games)*100)/100,
              playerRpg: Math.round((player.totalRb/player.games)*100)/100,
              playerApg: Math.round((player.assists/player.games)*100)/100,
              playerSpg: Math.round((player.steals/player.games)*100)/100,
              playerBpg: Math.round((player.blocks/player.games)*100)/100,
              playerHeadshotSrc: filePath
            }
          } 
        })

        const filteredPlayerData = removeDupePlayers(dupeFilteredPlayerData);
        setFilteredPlayerData(filteredPlayerData);
        console.log(filteredPlayerData);
      } 
      catch (err) {
        console.log(err);
      }
    }

    fillPlayerDict();
  }, []);

  return (
    <div className = 'full-screen'>
      <Background 
        className='left' 
        src={LeftCourt} 
        alt='Left half of basketball court' 
      />

      <div className='screen-middle'>
        <div className='header'>
          <img
            className='banner-image'
            src={gameLogo}
            alt='Game Logo'
          />
        </div>

        <div className='main-content'>
          <div className='game-player-content'>
            <Game 
              setCorrectCount={updateCorrectCount}
              setIncorrectCount={updateIncorrectCount}
              setRandPlayerIndex={updateRandPlayerIndex}
              randPlayerIndex={randPlayerIndex}
              playersDict={filteredPlayerData}
              setGuessResultHistory={updateGuessResultHistory}
              clearGuessHistory={clearGuessResultHistory}
            />

            {filteredPlayerData.length > 0 ? 
              (
                <PlayerStats 
                  playerArray={filteredPlayerData}
                  playerIndex={randPlayerIndex}
                />
              ) :
                <div><h3>Loading Stats</h3></div>
            }
          </div>

          <div className='game-scoring-content'>
            <ShotClock 
              correctGuesses={correct}
              incorrectGuesses={incorrect}
              guessCount={correct + incorrect}
            />

            <GuessHistory 
              guessHistory={guessResultHistory}
            />

          </div>
        </div>

      </div>

      <Background 
        className='right'
        src={RightCourt}
        alt='Right half of basketball court'
      />
    </div>
  )
}

export default App