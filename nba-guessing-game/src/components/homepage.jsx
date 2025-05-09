import React from "react";
import { useState } from "react";

//Component imports
import Game from "./game";
import ShotClock from './shotclock.jsx'
import GuessHistory from './full-guess-history.jsx'
import ModeDisplay from "./mode-display";

function Homepage({updateRandPlayerIndex, randPlayerIndex, playersDict, gameMode, foulLimit, shotLimit, falsifyGameStarted}) {
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

      <div className='screen-middle'>

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
              gameMode={gameMode}
              shotLimit={shotLimit}
              foulLimit={foulLimit}
              falsifyGameStarted={falsifyGameStarted}
            />
          </div>

          <div className='game-scoring-content'>
            <ModeDisplay
              gameMode={gameMode}
              foulLimit={foulLimit}
              shotLimit={shotLimit}
              guessHistory={guessResultHistory}
            />
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
      
  )
}

export default Homepage;