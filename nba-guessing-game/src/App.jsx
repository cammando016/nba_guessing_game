import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import gameLogo from './assets/images/banner.jpg'
import './App.css'
import Player from './components/player'
import Guess from './components/recent-guess'

function App() {
  const [count, setCount] = useState(0)

  //const playerDict [];

  return (

    <>
      <div className='header'>
        <img
          className='banner-image'
          src={gameLogo}
          alt='Game Logo'
        />
      </div>

      <div className='content'>
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
    </>
  )
}

export default App
