import React from "react";
import { useState } from "react";

import Player from './player';
import Guess from './recent-guess';
import GuessInput from './guess-input'
import PlayerStats from './player-stats'

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

function Game ({setCorrectCount, setIncorrectCount, setRandPlayerIndex, randPlayerIndex, playersDict, setGuessResultHistory, clearGuessHistory}) {
    const [guess, setGuess] = useState(0);
    const [answerHistory, setAnswerHistory] = useState(initialAnswers);
    const [removeablePlayerDict, setRemoveablePlayerDict] = useState(playersDict);

    //State for guess field input 
    const [guessInput, setGuessInput] = useState("");

    const updateGuessInput = (newInput) => setGuessInput(newInput);

    //Check entered guess and update answer arrays with correct or incorrect result
    function submitGuess () {
        //Get user's entered and expected answers
        let userGuess = guessInput;
        let correctAnswer = playersDict[randPlayerIndex].playerTeam;
        let result;

        //Check guess result & increment guess counter
        userGuess.toLowerCase() == correctAnswer.toLowerCase() 
            ? (result='C', setCorrectCount(prevCount => prevCount + 1))
            : (result='I', setIncorrectCount(prevCount => prevCount + 1))
        ;

        //Update guessResultHistory array to track history of guess results
        setGuessResultHistory(playersDict[randPlayerIndex]);

        //Clear guess input field after guess
        setGuessInput("");

        //Update answers array for displaying last 5 guesses
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

        //Get playerID of guessed player to remove from removeablePlayerDict
        const playerIdToRemove = removeablePlayerDict[randPlayerIndex]?.playerId;

        //Update for next NBA player to guess
        setGuess(guess + 1);

        //Remove the guessed player from the player guessing pool
        const updatedPlayerDict = removeablePlayerDict.filter(player => (
            player.playerId !== playerIdToRemove
        ))
        setRemoveablePlayerDict(updatedPlayerDict);
        setRandPlayerIndex(updatedPlayerDict);
    }

    //Reset game to no answer history
    //Update to a new starting NBA player to guess
    function resetGame () {
        setGuess(0);
        clearAnswersArray(initialAnswers);
        setAnswerHistory(initialAnswers);
        clearGuessHistory();
        setRemoveablePlayerDict(playersDict);
        setRandPlayerIndex(playersDict);
        setGuessInput("");
    }

    function startGame () {
        // setRemoveablePlayerDict(playersDict);
        // setRandPlayerIndex(playersDict);
    }

    return (
        <div className='game-content'>
            <div className='player-guesser'>
              <Player
                playersDict={playersDict}
                playerIndex={randPlayerIndex}
              />

              <GuessInput 
                guessInput={guessInput}
                setGuessInput={updateGuessInput}
              />

              <div id='game-interact-buttons'>
                <button onClick={startGame}>Start Game</button>
                <button type='submit' onClick={submitGuess}>Submit Guess</button>
                <button onClick={resetGame}>Reset Game</button>
              </div>

              {
                playersDict.length > 0 ? (
                    <PlayerStats 
                        playerArray={playersDict}
                        playerIndex={randPlayerIndex}
                    />
                ):
                <div><h3>Loading Stats</h3></div>
              }
              
            </div>

            {/* On screen feedback for last 5 guesses */}
            <h4 id="5-guesses">Recent Guesses:</h4>

            <div className="guesses">
                {answerHistory
                    .slice(-5)
                    .reverse()
                    .map((answer, index) => (
                        <Guess key={index} correctResult={answer.answerResult} />
                    ))
                }
            </div>
          </div>
    )
}

export default Game