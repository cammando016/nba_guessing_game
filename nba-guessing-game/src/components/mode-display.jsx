import React from "react";

function ModeDisplay ({gameMode, foulLimit, shotLimit, guessHistory}) {
    return (
        <div id="display-mode-settings">
            <div className="setting-display">
                <span className="display-heading"><h3>Game Mode: </h3></span><span className="display-value"><h3>{gameMode}</h3></span>
            </div>
            {
                gameMode === 'Shootout' ? (
                    <div className="game-mode-settings">
                        <div className="setting-display">
                            <span className="display-heading"><p>Shot Limit:</p></span><span className="display-value"><p>{shotLimit}</p></span>
                        </div>
                        <div className="setting-display">
                            <span className="display-heading"><p>Shots Taken:</p></span><span className="display-value"><p>{guessHistory.length}</p></span>
                        </div>
                    </div>
                ) : (
                    gameMode === 'Foulout' ? (
                        <div className="game-mode-settings">
                            <div className="setting-display">
                                <span className="display-heading"><p>Foul Limit:</p></span><span className="display-value"><p>{foulLimit}</p></span>
                            </div>
                            <div className="setting-display">
                                <span className="display-heading"><p>Fouls Committed:</p></span><span className="display-value"><p>{guessHistory.filter(guess => guess.guessedTeam !== guess.correctTeam).length}</p></span>
                            </div>
                        </div>
                    ) : (
                        <div className="setting-display">
                            <span className="display-heading"><p>Total Guesses Made:</p></span><span className="display-value"><p>{guessHistory.length}</p></span>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default ModeDisplay