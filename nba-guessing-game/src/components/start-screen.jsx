import React from "react";
import { useState } from "react";

function StartScreen({startGame}) {
    const [gameMode, setGameMode] = useState('Shootout');
    const [shotLimit, setShotLimit] = useState(10);
    const [foulLimit, setFoulLimit] = useState(3);

    const handleSubmit = () => {
        startGame({gameMode, shotLimit, foulLimit})
    }

    return (
        <div id="startscreen">
            <div id="start-screen-heading">
                <h3>Who He Play For?</h3>
            </div>

            <div id="start-game-config">
                <form id="game-config">
                    <fieldset id="game-mode">
                        <legend>Select Game Mode</legend>
                        <input type="radio" id="foul_mode" name="game_mode" value="Foul Out" checked={gameMode === 'Foulout'} onChange={() => setGameMode('Foulout')} />
                        <label htmlFor="foul_mode">Foul Out</label>

                        <input type="radio" id="overtime_mode" name="game_mode" value="Overtime" checked={gameMode === 'Overtime'} onChange={() => setGameMode('Overtime')}/>
                        <label htmlFor="overtime_mode">Overtime</label>

                        <input type="radio" id="shootout_mode" name="game_mode" value="Shootout" checked={gameMode === 'Shootout'} onChange={() => setGameMode('Shootout')}/>
                        <label htmlFor="shootout_mode">Shootout</label>
                    </fieldset>

                    {
                        gameMode === 'Shootout' ? (
                            <fieldset id="shootout-config">
                                <legend>Shootout mode Shots</legend>
                                <label htmlFor="player_guess_count">Guesses Per Player</label>
                                <input type="number" id="player_guess_count" name="player_guess_count" max={99} defaultValue={10} onChange={(e) => setShotLimit(e.target.value)}/>
                            </fieldset>
                        ) : <></>
                    }

                    {
                        gameMode === 'Foulout' ? (
                            <fieldset id="foulout-config">
                                <legend>Foul-Out mode foul limit</legend>
            
                                <input type="radio" id="one_foul" name="foul_limit" value={1} checked={foulLimit === 1} onChange={() => setFoulLimit(1)}/>
                                <label htmlFor="one_foul">1 Foul</label>

                                <input type="radio" id="two_foul" name="foul_limit" value={2} checked={foulLimit === 2} onChange={() => setFoulLimit(2)} />
                                <label htmlFor="two_foul">2 Fouls</label>

                                <input type="radio" id="three_foul" name="foul_limit" value={3} checked={foulLimit === 3} onChange={() => setFoulLimit(3)}/>
                                <label htmlFor="three_foul">3 Fouls</label>

                                <input type="radio" id="four_foul" name="foul_limit" value={4} checked={foulLimit === 4} onChange={() => setFoulLimit(4)} />
                                <label htmlFor="four_foul">4 Fouls</label>

                                <input type="radio" id="five_foul" name="foul_limit" vvalue={5} checked={foulLimit === 5} onChange={() => setFoulLimit(5)} />
                                <label htmlFor="five_foul">5 Fouls</label>

                                <input type="radio" id="six_foul" name="foul_limit" value={6} checked={foulLimit === 6} onChange={() => setFoulLimit(6)} />
                                <label htmlFor="six_foul">6 Fouls</label>
                            </fieldset>
                        ) : <></>
                    }

                    <button type="button" onClick={handleSubmit}>Start Game</button>

                </form>
            </div>

        </div>
    )
}

export default StartScreen;