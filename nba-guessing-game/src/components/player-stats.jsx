import React from "react";

function PlayerStats ({playerArray, playerIndex}) {
    return (
        <div className="player-stats">
            <h3>{playerArray[playerIndex].playerName} 2024/25 Statistics</h3>
            <p>Games Played: {playerArray[playerIndex].playerGames}</p>
            <p>Points per game: {playerArray[playerIndex].playerPpg}</p>
            <p>Rebounds per game: {playerArray[playerIndex].playerRpg}</p>
            <p>Assists per game: {playerArray[playerIndex].playerApg}</p>
            <p>Steals per game: {playerArray[playerIndex].playerSpg}</p>
            <p>Blocks per game: {playerArray[playerIndex].playerBpg}</p>
        </div>
    )
}

export default PlayerStats