import React from "react";

function Player({ playersDict, playerIndex }) {
    const player = playersDict[playerIndex];

    if (!player) {
        return (
            <div>Loading Player Info...</div>
        );
    }

    return (
        <>
            <div className="player-name">
                <h3>{player.playerName}</h3>
            </div>
            <div className="player-photo-div">
                <img className="player-photo" src={player.playerHeadshotSrc} alt={`Player photo for player ID: ${player.playerId}`}/>
            </div>
        </>
    )
}

export default Player