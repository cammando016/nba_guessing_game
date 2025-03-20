import React from "react";
import Player from './player'
import Guess from './recent-guess'

function Game () {
    return (
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
    )
}

export default Game