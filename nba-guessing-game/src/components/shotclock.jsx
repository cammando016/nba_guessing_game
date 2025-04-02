import React from "react";

function ShotClock ({correctGuesses, incorrectGuesses, guessCount}) {
    return (
        <div className='shot-clock-scoreboard'>
            <h3>Game Scoreboard</h3>

            <div className="shot-clock">
                <p><span className="shot-clock-correct">{correctGuesses}</span>:<span className="shot-clock-incorrect">{incorrectGuesses}</span></p>
                <p className="shot-clock-counter">{guessCount}</p>
            </div>
        </div>
    )
}

export default ShotClock