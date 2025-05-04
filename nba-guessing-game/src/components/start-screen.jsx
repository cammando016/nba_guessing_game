import React from "react";

function StartScreen({submitClicked}) {
    return (
        <div id="startscreen">
            <div id="start-screen-heading">
                <h3>Who He Play For?</h3>
            </div>

            <div id="start-game-config">
                <form id="game-config">
                    <fieldset id="game-mode">
                        <legend>Select Game Mode</legend>
                        <input type="radio" id="shootout_mode" name="game_mode" value="Shootout" defaultChecked/>
                        <label htmlFor="shootout_mode">Shootout</label>

                        <input type="radio" id="overtime_mode" name="game_mode" value="Overtime" />
                        <label htmlFor="overtime_mode">Overtime</label>

                        <input type="radio" id="foul_mode" name="game_mode" value="Foul Out" />
                        <label htmlFor="foul_mode">Foul Out</label>
                    </fieldset>

                    <fieldset id="shootout-config">
                        <legend>Shootout mode Shots</legend>
                        <label htmlFor="player_guess_count">Guesses Per Player</label>
                        <input type="number" id="player_guess_count" name="player_guess_count" max="99" defaultValue={10} />
                    </fieldset>

                    <fieldset id="foulout-config">
                        <legend>Foul-Out mode foul limit</legend>
    
                        <input type="radio" id="one_foul" name="foul_limit" value="One Foul" />
                        <label htmlFor="one_foul">1 Foul</label>

                        <input type="radio" id="two_foul" name="foul_limit" value="Two Fouls" />
                        <label htmlFor="two_foul">2 Fouls</label>

                        <input type="radio" id="three_foul" name="foul_limit" value="Three Fouls" defaultChecked/>
                        <label htmlFor="three_foul">3 Fouls</label>

                        <input type="radio" id="four_foul" name="foul_limit" value="Four Fouls" />
                        <label htmlFor="four_foul">4 Fouls</label>

                        <input type="radio" id="five_foul" name="foul_limit" value="Five Fouls" />
                        <label htmlFor="five_foul">5 Fouls</label>

                        <input type="radio" id="six_foul" name="foul_limit" value="Six Fouls" />
                        <label htmlFor="six_foul">6 Fouls</label>
                    </fieldset>

                    <button type="submit" onClick={submitClicked}>Start Game</button>

                </form>
            </div>

        </div>
    )
}

export default StartScreen;