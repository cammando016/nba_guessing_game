import React from "react";
import useIsMobile from "../hooks/useIsMobile";

function PlayerStats ({playerArray, playerIndex}) {
    const isMobile = useIsMobile();

    return (
        !isMobile ? (
            <div id="player-stats">
                <h3>2024 - 2025 Current Team Statistics</h3>
                <div className="player-stat">
                    <span className="stat-name"><p className="stats">Games Played:</p></span>
                    <span className="stat-number"><p className="stats"> {playerArray[playerIndex].playerGames}</p></span>
                </div>
                <div className="player-stat">
                    <span className="stat-name"><p className="stats">Points per game:</p></span>
                    <span className="stat-number"><p className="stats"> {playerArray[playerIndex].playerPpg}</p></span>
                </div>
                <div className="player-stat">
                    <span className="stat-name"><p className="stats">Rebounds per game:</p></span>
                    <span className="stat-number"><p className="stats"> {playerArray[playerIndex].playerRpg}</p></span>
                </div>
                <div className="player-stat">
                    <span className="stat-name"><p className="stats">Assists per game:</p></span>
                    <span className="stat-number"><p className="stats"> {playerArray[playerIndex].playerApg}</p></span>
                </div>
                <div className="player-stat">
                    <span className="stat-name"><p className="stats">Steals per game:</p></span>
                    <span className="stat-number"><p className="stats"> {playerArray[playerIndex].playerSpg}</p></span>
                </div>
                <div className="player-stat">
                    <span className="stat-name"><p className="stats">Blocks per game:</p></span>
                    <span className="stat-number"><p className="stats"> {playerArray[playerIndex].playerBpg}</p></span>
                </div>
            </div>
        ) : (
            <div id="player-stats-mobile">
                <div className="player-stat">
                    <span className="stat-name"><p className="stats">Games:</p></span>
                    <span className="stat-number"><p className="stats"> {playerArray[playerIndex].playerGames}</p></span>
                </div>
                <div className="player-stat">
                    <span className="stat-name"><p className="stats">PPG:</p></span>
                    <span className="stat-number"><p className="stats"> {playerArray[playerIndex].playerPpg}</p></span>
                </div>
                <div className="player-stat">
                    <span className="stat-name"><p className="stats">RPG:</p></span>
                    <span className="stat-number"><p className="stats"> {playerArray[playerIndex].playerRpg}</p></span>
                </div>
                <div className="player-stat">
                    <span className="stat-name"><p className="stats">APG:</p></span>
                    <span className="stat-number"><p className="stats"> {playerArray[playerIndex].playerApg}</p></span>
                </div>
                <div className="player-stat">
                    <span className="stat-name"><p className="stats">SPG:</p></span>
                    <span className="stat-number"><p className="stats"> {playerArray[playerIndex].playerSpg}</p></span>
                </div>
                <div className="player-stat">
                    <span className="stat-name"><p className="stats">BPG:</p></span>
                    <span className="stat-number"><p className="stats"> {playerArray[playerIndex].playerBpg}</p></span>
                </div>
            </div>
        )
    )
}

export default PlayerStats