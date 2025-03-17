import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import gameLogo from './assets/images/banner.jpg'
import './App.css'
import Player from './components/player'
import Guess from './components/recent-guess'
import LeftCourt from './assets/images/court.jpg'
import RightCourt from './assets/images/court-right.jpg'

function App() {
  const [count, setCount] = useState(0)

  //const playerDict [];

  return (

    <div className = 'full-screen'>
      <div className = 'screen-left'>
        <img
          className='border-image'
          src={LeftCourt}
          alt='Basketball Court Background Image'
        />
      </div>

      <div className='screen-middle'>

        <div className='header'>
          <img
            className='banner-image'
            src={gameLogo}
            alt='Game Logo'
          />
        </div>

        <div className='main-content'>

          <div className='game-content'>
            <div className='player-guesser'>
              <Player name={'Devin Booker'}/>

              <div id='guess-input'>
                <input type='text' placeholder="Guess the player's team"></input>
              </div>

              <div id='game-interact-buttons'>
                <button type='submit'>Submit Guess</button>
                <button>Reset Game</button>
              </div>
            </div>

            <div className='guesses'>
              <Guess />
              <Guess />
              <Guess />
              <Guess />
              <Guess />
            </div>
          </div>

          <div className='shot-clock'>
            <p>To be completed, shot clock scoreboard.</p>
          </div>

        </div>

        <div className='nba-scoreboard'>
          <p>To be completed, NBA live games scoreboard.</p>
        </div>

      </div>

      <div className='screen-right'>
        <img
          className='border-image'
          src={RightCourt}
          alt='Basketball Court Background Image'
        />
      </div>
    </div>
  )
}

export default App
