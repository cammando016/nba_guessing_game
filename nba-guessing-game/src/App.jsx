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

  //State update functions to pass into Game component
  const updateCorrectCount = (newCount) => setCorrect(newCount);
  const updateIncorrectCount = (newCount) => setIncorrect(newCount);
  const updateRandPlayerIndex = () => setRandPlayerIndex(Math.floor(Math.random()*filteredPlayerData.length));
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
          return {
            playerId: player.id,
            playerName: player.playerName,
            playerTeam: player.team,
            playerGuessedYet: false,
            playerPpg: Math.round((player.points/player.games)*100)/100,
            playerRpg: Math.round((player.totalRb/player.games)*100)/100,
            playerApg: Math.round((player.assists/player.games)*100)/100,
            playerSpg: Math.round((player.steals/player.games)*100)/100,
            playerBpg: Math.round((player.blocks/player.games)*100)/100
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