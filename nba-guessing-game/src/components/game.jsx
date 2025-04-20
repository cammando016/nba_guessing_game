import React from "react";
import { useState } from "react";

import Player from './player';
import Guess from './recent-guess';
import photoSrc from '../assets/images/players/devin_booker.jpg'

let initialAnswers = [
    {
        enteredAnswer: '',
        expectedAnswer: '',
        answerResult: '-'
    },
    {
        enteredAnswer: '',
        expectedAnswer: '',
        answerResult: '-'
    },
    {
        enteredAnswer: '',
        expectedAnswer: '',
        answerResult: '-'
    },
    {
        enteredAnswer: '',
        expectedAnswer: '',
        answerResult: '-'
    },
    {
        enteredAnswer: '',
        expectedAnswer: '',
        answerResult: '-'
    }
]

function clearAnswersArray (array) {
    for(let i = 0; i < array.length; i++) {
        array[i].enteredAnswer = ''
        array[i].expectedAnswer = ''
        array[i].answerResult = '-'
    }
    return array
}

function Game ({setCorrectCount, setIncorrectCount, setRandPlayerIndex, randPlayerIndex, playersDict}) {
    const [guess, setGuess] = useState(0);
    const [answerHistory, setAnswerHistory] = useState(initialAnswers);

    //Empty array that will keep a record of all guessed players
    const [guessedPlayers, setGuessedPlayers] = useState([]);

    //Check entered guess and update answer arrays with correct or incorrect result
    function submitGuess () {
        //Get user's entered and expected answers
        let userGuess = document.querySelector('#player-guess').value;
        let correctAnswer = playersDict[randPlayerIndex].playerTeam;
        let result;

        //Check guess result & increment guess counter
        userGuess.toLowerCase() == correctAnswer.toLowerCase() 
            ? (result='C', setCorrectCount(prevCount => prevCount + 1))
            : (result='I', setIncorrectCount(prevCount => prevCount + 1))
        ;

        //Update guessedPlayers array to track which players guessed so far
        setGuessedPlayers(
            [
                ...guessedPlayers,
                {guessedIndex: randPlayerIndex}
            ]
        )

        //Update player record from PlayersDict to show it has already been guessed
        playersDict[randPlayerIndex].playerGuessedYet = true;

        //Update answers array
        if (guess < 5) {
            const newAnswerHistory = answerHistory.map ((i, j) => {
                if (j === guess) {
                    return {
                        enteredAnswer: userGuess,
                        expectedAnswer: correctAnswer,
                        answerResult: result
                    };
                }
                else {
                    return i;
                }
            });
            setAnswerHistory(newAnswerHistory);
        }
        else {
            setAnswerHistory([
                ...answerHistory,
                {
                    enteredAnswer: userGuess,
                    expectedAnswer: correctAnswer,
                    answerResult: result 
                }
            ]);
        }

        //Update for next NBA player to guess
        setGuess(guess + 1);

        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * playersDict.length);
        } 
        while (playersDict[newIndex]?.playerGuessedYet);

        setRandPlayerIndex(newIndex);
    }

    //Reset game to no answer history
    //Use guessedPlayers array to set any players guessed in round back to playerGuessedYet = false
    //Update to a new starting NBA player to guess
    function resetGame () {
        setGuess(0);
        guessedPlayers.forEach(player => {
            playersDict[player.guessedIndex].playerGuessedYet = false;
        });
        setGuessedPlayers([]);
        clearAnswersArray(initialAnswers);
        setAnswerHistory(initialAnswers);
        setRandPlayerIndex();
    }

    return (
        <div className='game-content'>
            <div className='player-guesser'>
              <Player 
                photo={photoSrc}
                playersDict={playersDict}
                playerIndex={randPlayerIndex}
              />

              <div id='guess-input'>
                <input id="player-guess" type='text' placeholder="Guess the player's team"></input>
              </div>

              <div id='game-interact-buttons'>
                <button type='submit' onClick={submitGuess}>Submit Guess</button>
                <button onClick={resetGame}>Reset Game</button>
              </div>
            </div>

            {/* On screen feedback for last 5 guesses */}
            <h4>Last 5 Guesses:</h4>
            <div className='guesses'>
              <Guess correctResult={answerHistory.at(-1).answerResult}/>
              <Guess correctResult={answerHistory.at(-2).answerResult}/>
              <Guess correctResult={answerHistory.at(-3).answerResult}/>
              <Guess correctResult={answerHistory.at(-4).answerResult}/>
              <Guess correctResult={answerHistory.at(-5).answerResult}/>
            </div>
          </div>
    )
}

export default Game