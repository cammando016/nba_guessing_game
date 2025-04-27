import React from "react";
import { useState } from "react";

//List of NBA Teams
const teamNames = [
    "Atlanta Hawks",
    "Boston Celtics",
    "Brooklyn Nets",
    "Chicago Bulls",
    "Charlotte Hornets",
    "Cleveland Cavaliers",
    "Dallas Mavericks",
    "Denver Nuggets",
    "Detroit Pistons",
    "Golden State Warriors",
    "Houston Rockets",
    "Indiana Pacers",
    "Los Angeles Clippers",
    "Los Angeles Lakers",
    "Memphis Grizzlies",
    "Miami Heat",
    "Milwaukee Bucks",
    "Minnesota Timberwolves",
    "New Orleans Pelicans",
    "New York Knicks",
    "Oklahoma City Thunder",
    "Orlando Magic",
    "Philadelphia 76ers",
    "Phoenix Suns",
    "Portland Trail Blazers",
    "Sacramento Kings",
    "San Antonio Spurs",
    "Toronto Raptors",
    "Utah Jazz",
    "Washington Wizards",
];

function GuessInput() {
    const [guessInput, setGuessInput] = useState("");
    const [suggestedTeams, setSuggestedTeams] = useState([]);

    function handleInputChange(input) {
        const value = input.target.value;
        setGuessInput(value);

        const matchingTeams = teamNames.filter(team => {
            return team.toLowerCase().includes(value.toLowerCase())
        });
        setSuggestedTeams(matchingTeams);
    }

    function handleSuggestionClick(suggestion) {
        setGuessInput(suggestion);
        setSuggestedTeams([]);
    }

    return (
        <div id="guess-input">
            <input
                type = "text"
                id = "player-guess"
                value = {guessInput}
                onChange = {handleInputChange}
                placeholder = "Guess this player's team"
            />
            {
                (suggestedTeams.length > 0 && guessInput !== "") && (
                    <ul className="suggested-teams">
                        {suggestedTeams.map(team => (
                            <li className="suggested-team" key={team} onClick={() => handleSuggestionClick(team)}>{team}</li>
                        ))}
                    </ul>                    
                )
            }
        </div>
    )
}

export default GuessInput;