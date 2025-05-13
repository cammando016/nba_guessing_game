import React from "react";
import PlayerStats from "./player-stats";

import useIsMobile from "../hooks/useIsMobile";

function Player({ playersDict, playerIndex }) {
    const player = playersDict[playerIndex];
    const isMobile = useIsMobile();

    if (!player) {
        return (
            <div>Loading Player Info...</div>
        );
    }

    return (
        !isMobile ? (
            <>
                <div className="player-name">
                    <h3>{player.playerName}</h3>
                </div>
                <div className="player-photo-div">
                    <img className="player-photo" src={player.playerHeadshotSrc} alt={`Player photo for player ID: ${player.playerId}`}/>
                </div>
            </>
        ) : (
            <>
                <div className='player-name-mobile'>
                    <span className='mobile-page-heading' id='name'><h3>{player.playerName}</h3></span>
                    <span className='mobile-page-heading' id='stats'><h3>Season Team Statistics</h3></span>
                </div>
                <div className='player-mobile-div'>
                    <div className='mobile-photo-wrapper'>
                        <img className='player-photo-mobile' src={player.playerHeadshotSrc} alt={`Player photo for player ID: ${player.playerId}`}/>
                    </div>
                    <PlayerStats
                        playerArray={playersDict}
                        playerIndex={playerIndex}
                    />
                </div>
            </>
        )
    )
}

export default Player