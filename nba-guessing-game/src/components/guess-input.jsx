import React from "react";
import { useEffect } from "react";
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

function GuessInput({ guessInput, setGuessInput }) {
    const [suggestedTeams, setSuggestedTeams] = useState([]);
    const [debouncedInput, setDebouncedInput] = useState(guessInput);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedInput(guessInput);
        }, 200);

        return () => clearTimeout(timer);
    }, [guessInput]);

    useEffect(() => {
        if (debouncedInput !== "") {
            const matchingTeams = teamNames.filter(team => {
                return team.toLowerCase().includes(debouncedInput.toLowerCase());
            })
            setSuggestedTeams(matchingTeams);
        }
        else {
            setSuggestedTeams([]);
        }
    }, [debouncedInput]);

    function handleInputChange(input) {
        const value = input.target.value;
        setGuessInput(value);
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
                (suggestedTeams.length > 1 || (suggestedTeams.length === 1 && suggestedTeams[0].toLowerCase() !== guessInput.toLowerCase())) && (
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