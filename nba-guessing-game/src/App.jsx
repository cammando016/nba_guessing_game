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
  const clearGuessResultHistory = () => setGuessResultHistory([]);

  //Read player data returned from generateFilteredPlayers.js
  useEffect(() => {
    async function fetchFilteredPlayers() {
      try {
        const response = await fetch("/filtered-players.json");
        const data = await response.json();

        setFilteredPlayerData(data);
        setRandPlayerIndex(Math.floor(Math.random() * data.length));
      }
      catch (err) {
        console.error("Failed to load filtered players. Error: ", err)
      }
    }

    fetchFilteredPlayers();
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