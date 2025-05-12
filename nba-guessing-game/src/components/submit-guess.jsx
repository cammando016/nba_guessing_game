import React from "react";

function SubmitGuess ({submitGuess, isGuessValid}) {
    return (
        <div id='game-interact-buttons'>
            <button type='submit' onClick={submitGuess} disabled={!isGuessValid}>Submit Guess</button>
        </div>      
    )
}

export default SubmitGuess;