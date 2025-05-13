import React from "react";
import changeTeamDisplayName from "../hooks/changeTeamName";

function guessHistory ({ guessHistory }) {
  return (
        <div className='full-guess-history'>
          <h3 className="font-digital">Guess History</h3>
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
                guessHistory.map((guess) => {
                  const isCorrect = guess.guessedTeam === guess.correctTeam;
                  return (
                    <tr 
                      key={guess.playerId}
                      className={isCorrect ? 'table-row-correct': 'table-row-incorrect'}
                    >
                      <td>{guess.playerName}</td>
                      <td>{changeTeamDisplayName(guess.guessedTeam)}</td>
                      <td>{changeTeamDisplayName(guess.correctTeam)}</td>
                    </tr>
                  );
                })
              }        
            </tbody>
          </table>
        </div>
    )
}

export default guessHistory