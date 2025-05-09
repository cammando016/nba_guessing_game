import React from "react";

function ShotClock ({correctGuesses, incorrectGuesses, guessCount}) {
    return (
        <div className='shot-clock-scoreboard font-digital'>
            <h3>Game Scoreboard</h3>

            <div className="shot-clock">
                <p className="guess-description"><span className="shot-clock-correct">Correct</span>:<span className="shot-clock-incorrect">Incorrect</span></p>
                <p><span className="shot-clock-correct">{correctGuesses}</span>:<span className="shot-clock-incorrect">{incorrectGuesses}</span></p>
                <p className="shot-clock-counter">{guessCount}</p>
                <p className="shot-clock-counter guess-description">Total Guesses</p>
            </div>
        </div>
    )
}

export default ShotClock