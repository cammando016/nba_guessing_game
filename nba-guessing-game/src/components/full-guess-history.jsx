import React from "react";

function guessHistory ({ guessHistory }) {
    return (
        <div className='full-guess-history'>
          <table>
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Guessed Team</th>
                <th>Correct Team</th>
              </tr>
            </thead>
            <tbody>
              { 
                guessHistory.map((guess) => (
                  <tr key={guess.playerId}>
                    <td>{guess.playerName}</td>
                    <td>{guess.guessedTeam}</td>
                    <td>{guess.correctTeam}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    )
}

export default guessHistory