import React from "react";
import { useState } from "react";

//Component imports
import Game from "./game";
import Background from './background.jsx'
import ShotClock from './shotclock.jsx'
import GuessHistory from './full-guess-history.jsx'

//Image imports
import gameLogo from '../assets/images/displays/banner.jpg'
import LeftCourt from '../assets/images/displays/court.jpg'
import RightCourt from '../assets/images/displays/court-right.jpg'

function Homepage({updateRandPlayerIndex, randPlayerIndex, playersDict}) {
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [guessResultHistory, setGuessResultHistory] = useState([]);

  //State update functions to pass into Game component
  const updateCorrectCount = (newCount) => setCorrect(newCount);
  const updateIncorrectCount = (newCount) => setIncorrect(newCount);
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

  return (
    <div id="homepage" className = 'full-screen'>
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
              playersDict={playersDict}
              setGuessResultHistory={updateGuessResultHistory}
              clearGuessHistory={clearGuessResultHistory}
            />
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

export default Homepage;