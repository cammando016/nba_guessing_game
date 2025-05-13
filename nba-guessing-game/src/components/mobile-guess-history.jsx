import React from "react";
import changeTeamDisplayName from "../hooks/changeTeamName";

function MobileGuessHistory ({ guessHistory }) {
    const guess = guessHistory[guessHistory.length-1]
    const isCorrect = guess ? guess.guessedTeam === guess.correctTeam : false;

    return (
            <div className='full-guess-history'>
            <table className="guess-history-table">
                <thead>
                <tr>
                    <th>Player Name</th>
                    <th>Guessed Team</th>
                    <th>Correct Team</th>
                </tr>
                </thead>
                <tbody>
                {
                    guess && (
                        <tr 
                            key={guess.playerId}
                            className={isCorrect ? 'table-row-correct': 'table-row-incorrect'}
                        >
                            <td>{guess.playerName}</td>
                            <td>{changeTeamDisplayName(guess.guessedTeam)}</td>
                            <td>{changeTeamDisplayName(guess.correctTeam)}</td>
                        </tr>
                    )
                }        
                </tbody>
            </table>
            </div>
        )
}

export default MobileGuessHistory