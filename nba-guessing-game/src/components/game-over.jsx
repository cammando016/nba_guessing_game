import React from "react";
import gameLogo from '../assets/images/displays/banner.jpg'

function Gameover ({restartGame, falsifyGameOver, falsifyGameStarted, gameMode, guessHistory}) {
    
    function handleReplayClick() {
        falsifyGameOver();
        restartGame();
    }

    function handleChangeModeClick() {
        falsifyGameStarted();
        restartGame();
    }

    return (
        <div id="game-over-wrapper">
            <div id="game-over-screen">
                <img className='banner-image' src={gameLogo} alt="Who He Play For?" />

                <div id='game-over-results'>
                    <div className='game-over-category'>
                        <span className='game-over-heading'><p className='game-over-p'>Game Mode:</p></span>
                        <span className='game-over-outcome'><p className='game-over-p'>{gameMode}</p></span>
                    </div>
                    <div className='game-over-category'>
                        <span className='game-over-heading'><p className='game-over-p'>Total Players Guessed:</p></span>
                        <span className='game-over-outcome'><p className='game-over-p'>{guessHistory.filter(guess => (guess.answerResult !== '-')).length}</p></span>
                    </div>
                    <div className='game-over-category'>
                        <span className='game-over-heading'><p className='game-over-p'>Correct Guesses:</p></span>
                        <span className='game-over-outcome'><p className='game-over-p'>{guessHistory.filter(guess => guess.answerResult === 'C').length}</p></span>
                    </div>
                    <div className='game-over-category'>
                        <span className='game-over-heading'><p className='game-over-p'>Incorrect Guesses:</p></span>
                        <span className='game-over-outcome'><p className='game-over-p'>{guessHistory.filter(guess => guess.answerResult === 'I').length}</p></span>
                    </div>
                </div>

                <div id='game-over-interactivity'>
                    <button onClick={handleReplayClick}>Replay Mode</button>
                    <button onClick={handleChangeModeClick}>Change Mode</button>
                </div>
            </div>
        </div>
    )
}

export default Gameover