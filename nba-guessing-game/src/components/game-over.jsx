import React from "react";

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
                <h3>Who He Play For</h3>
                <p>Game Mode: {gameMode}</p>
                <p>Total Players Guessed: {guessHistory.filter(guess => (guess.answerResult !== '-')).length}</p>
                <p>Correct Guesses: {guessHistory.filter(guess => guess.answerResult === 'C').length}</p>
                <p>Incorrect Guesses: {guessHistory.filter(guess => guess.answerResult === 'I').length}</p>

                <button onClick={handleReplayClick}>Replay Mode</button>
                <button onClick={handleChangeModeClick}>Change Mode</button>
            </div>
        </div>
    )
}

export default Gameover