import React from "react";

function ShotClock ({correctGuesses, incorrectGuesses, guessCount}) {
    return (
        <div className='shot-clock'>
            <p>{correctGuesses} : {incorrectGuesses}</p>
            <p>{guessCount}</p>
        </div>
    )
}

export default ShotClock