import React from "react";

function Player({ photo, playersDict, playerIndex }) {
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
                <img className="player-photo" src={photo} alt={player.playerName} />
            </div>
        </>
    )
}

export default Player