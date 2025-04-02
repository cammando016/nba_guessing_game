import './App.css'
import React from "react";
import { useState } from "react";

//Component imports
import Game from './components/game.jsx'
import Background from './components/background.jsx'
import ShotClock from './components/shotclock.jsx'
import Scoreboard from './components/nbascoreboard.jsx'
import PlayerStats from './components/player-stats.jsx'

//Image imports
import gameLogo from './assets/images/displays/banner.jpg'
import LeftCourt from './assets/images/displays/court.jpg'
import RightCourt from './assets/images/displays/court-right.jpg'

function App({correctCount, incorrectCount}) {

  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  const updateCorrectCount = (newCount) => setCorrect(newCount);
  const updateIncorrectCount = (newCount) => setIncorrect(newCount);

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
          <Game 
            setCorrectCount={updateCorrectCount}
            setIncorrectCount={updateIncorrectCount}
          />
          <div className='stats'>
            <ShotClock 
              correctGuesses={correct}
              incorrectGuesses={incorrect}
              guessCount={correct + incorrect}
            />
            <PlayerStats />
          </div>
        </div>

        <Scoreboard />
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