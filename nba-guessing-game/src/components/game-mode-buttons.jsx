import React from "react";

function GameModeButtons({resetGame, endGame, changeGameSettings}) {
    return (
        <div id="game-mode-buttons">
            <button onClick={resetGame}>Restart Game</button>
            <button onClick={endGame}>End Game</button>
            <button onClick={changeGameSettings}>Change Mode</button>
        </div>
    )
}

export default GameModeButtons;