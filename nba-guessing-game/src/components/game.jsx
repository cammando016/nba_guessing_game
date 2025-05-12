import React from "react";
import { useState, useEffect } from "react";
//import components
import Player from './player';
import GuessInput from './guess-input'
import PlayerStats from './player-stats'
import Gameover from './game-over'
import FiveGuesses from "./five-guesses";
import SubmitGuess from "./submit-guess";
import GameModeButtons from "./game-mode-buttons";
//import data
import teamNames from "../data/nba-teams";
import useIsMobile from '../hooks/useIsMobile';

function Game ({children, setCorrectCount, setIncorrectCount, setRandPlayerIndex, randPlayerIndex, playersDict, setGuessResultHistory, clearGuessHistory, gameMode, foulLimit, shotLimit, falsifyGameStarted}) {
    const [guess, setGuess] = useState(0);
    const [answerHistory, setAnswerHistory] = useState(() => clearAnswersArray());
    const [removeablePlayerDict, setRemoveablePlayerDict] = useState(playersDict);
    const [gameOver, setGameOver] = useState(false);

    //State for guess field input 
    const [guessInput, setGuessInput] = useState("");

    //Data for mobile display layout
    const isMobile = useIsMobile();
    const [firstChild, secondChild] = React.Children.toArray(children);

    const isGuessValid = teamNames.some(team =>
        team.toLowerCase() === guessInput.trim().toLowerCase()
    );

    const updateGuessInput = (newInput) => setGuessInput(newInput);
    const falsifyGameOver = () => setGameOver(false);

    const restartGame = () => resetGame();

    function clearAnswersArray () {
        return Array.from({length: 5}, () => ({
            enteredAnswer: '',
            expectedAnswer: '',
            answerResult: '-'
        }));
    }

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
        console.log(updatedPlayerDict.length)
    }

    //Reset game to no answer history
    //Update to a new starting NBA player to guess
    function resetGame () {
        setGuess(0);
        setCorrectCount(0);
        setIncorrectCount(0);
        setAnswerHistory(clearAnswersArray());
        clearGuessHistory();
        setRemoveablePlayerDict(playersDict);
        setRandPlayerIndex(playersDict);
        setGuessInput("");
    }

    function endGame() {
        setGameOver(true);
    }

    function changeGameSettings() {
        resetGame();
        falsifyGameStarted();
    }

    function checkGameOver(mode) {
        switch (mode) {
            case 'Shootout':
                if(guess >= shotLimit){
                    setGameOver(true);
                }
                break;
            case 'Foulout':
                if(answerHistory.filter(answer => answer.answerResult === 'I').length >= foulLimit){
                    setGameOver(true);
                }
                break;
            case 'Overtime':
                if(removeablePlayerDict.length === 0){
                    setGameOver(true);
                }
                break;
        }
    }

    useEffect(() => {
        checkGameOver(gameMode);
    }, [guess, answerHistory, removeablePlayerDict, gameMode]);

    return (
        !gameOver ? (
            !isMobile ? (
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

                        <SubmitGuess 
                            submitGuess={submitGuess}
                            isGuessValid={isGuessValid}
                        />

                        <PlayerStats 
                            playerArray={playersDict}
                            playerIndex={randPlayerIndex}
                        />
                    
                        {/* On screen feedback for last 5 guesses */}
                        <FiveGuesses answerHistory={answerHistory}/>
                    </div>

                    <GameModeButtons 
                        resetGame={resetGame}
                        endGame={endGame}
                        changeGameSettings={changeGameSettings}
                    />
                </div>
            ) : (
                <div className='game-content-mobile'>
                    <div className='player-display-mobile'>
                        <Player 
                            playersDict={playersDict}
                            playerIndex={randPlayerIndex}
                        />

                        <PlayerStats
                            playerArray={playersDict}
                            playerIndex={randPlayerIndex}
                        />
                    </div>

                    <div className='submit-guess-mobile'>
                        <GuessInput
                            guessInput={guessInput}
                            setGuessInput={updateGuessInput}
                        />
                        <SubmitGuess
                            submitGuess={submitGuess}
                            isGuessValid={isGuessValid}
                        />
                    </div>

                    <div className='guess-history-mobile'>
                        <FiveGuesses
                            answerHistory={answerHistory}
                        />

                        <div className="full-guess-history">
                            {firstChild}
                        </div>
                    </div>

                    <div className='mode-display-mobile'>
                        {secondChild}
                    </div>

                    <div className=''>
                        <GameModeButtons 
                            resetGame={resetGame}
                            endGame={endGame}
                            changeGameSettings={changeGameSettings}
                        />
                    </div>
                </div>
            )
        ) :
        (
            <Gameover
                restartGame={restartGame}
                falsifyGameOver={falsifyGameOver}
                falsifyGameStarted={falsifyGameStarted}
                gameMode={gameMode} 
                guessHistory={answerHistory}
            />
        )    
    )
}

export default Game