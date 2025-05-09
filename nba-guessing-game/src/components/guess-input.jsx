import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import teamNames from '../data/nba-teams'

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