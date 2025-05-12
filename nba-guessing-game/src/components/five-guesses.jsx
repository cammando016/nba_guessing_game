import React from "react";
import Guess from "./recent-guess";

function FiveGuesses({answerHistory}) {
    return (
        <>
            {
                answerHistory.filter(answer => answer.answerResult !== '-').length > 0 ? (
                    <h4 id="five-guesses">Recent Guesses:</h4>
                ) : <></>
            }

            <div className="guesses">
                {answerHistory
                    .slice(-5)
                    .reverse()
                    .map((answer, index) => (
                        <Guess key={index} correctResult={answer.answerResult} />
                    ))
                }
            </div>
        </>
    )
}  

export default FiveGuesses;