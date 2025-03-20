import React from "react";
import { useState } from "react";

import Player from './player'
import Guess from './recent-guess'

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

function Game () {
    const [guess, setGuess] = useState(0);
    const [randomPlayer, setRandomPlayer] = useState(Math.floor(Math.random()*10));
    const [answerHistory, setAnswerHistory] = useState(initialAnswers);

    //let randomPlayer = Math.floor(Math.random() * 10);

    //Player guessing pool
    const playerDict = [
        { 
            playerId: 1, 
            playerName: 'Devin Booker', 
            teamId: 24,
            teamName: 'Phoenix Suns',
            playerJerseyNum: 1,
            imgSrc: '../assets/images/players/devin_booker.jpg'
        },
        { 
            playerId: 2, 
            playerName: 'Shai Gilgeous-Alexander', 
            teamId: 21,
            teamName: 'Oklahoma City Thunder',
            playerJerseyNum: 2
        },
        { 
            playerId: 3, 
            playerName: 'Lamelo Ball', 
            teamId: 4,
            teamName: 'Charlotte Hornets',
            playerJerseyNum: 1
        },
        { 
            playerId: 4, 
            playerName: 'Mikal Bridges', 
            teamId: 20,
            teamName: 'New York Knicks',
            playerJerseyNum: 25
        },
        { 
            playerId: 5, 
            playerName: 'Cameron Johnson', 
            teamId: 3,
            teamName: 'Brooklyn Nets',
            playerJerseyNum: 2
        },
        { 
            playerId: 6, 
            playerName: 'Zach Lavine', 
            teamId: 26,
            teamName: 'Sacramento Kings',
            playerJerseyNum: 8
        },
        { 
            playerId: 7, 
            playerName: 'Dyson Daniels', 
            teamId: 1,
            teamName: 'Atlanta Hawks',
            playerJerseyNum: 5
        },
        { 
            playerId: 8, 
            playerName: 'Buddy Hield', 
            teamId: 10,
            teamName: 'Golden State Warriors',
            playerJerseyNum: 7
        },
        { 
            playerId: 9, 
            playerName: 'Marcus Smart', 
            teamId: 30,
            teamName: 'Washington Wizards',
            playerJerseyNum: 36
        },
        { 
            playerId: 10, 
            playerName: 'Amen Thompson', 
            teamId: 11,
            teamName: 'Houston Rockets',
            playerJerseyNum: 1
        }
    ];

    //Check entered guess and update answer arrays with correct or incorrect result
    function submitGuess () {
        //Get user's entered and expected answers
        let userGuess = document.querySelector('#player-guess').value;
        let correctAnswer = playerDict[randomPlayer].teamName;
        let result;

        //Check guess result
        userGuess.toLowerCase() == correctAnswer.toLowerCase() ? result='C' : result='I';

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
        setRandomPlayer(Math.floor(Math.random() * 10));
    }

    //Reset game to no answer history and update to a new starting NBA player to guess
    function resetGame () {
        setGuess(0);
        setAnswerHistory([]);

        setRandomPlayer(Math.floor(Math.random() * 10));
    }

    return (
        <div className='game-content'>
            <div className='player-guesser'>
              <Player 
                name={playerDict[randomPlayer].playerName} 
                photo={playerDict[randomPlayer].imgSrc} 
                altText={playerDict[randomPlayer].playerName + ' photo'} 
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