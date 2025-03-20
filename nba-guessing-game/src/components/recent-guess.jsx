import React from "react";

function Guess ( {correctResult} ) {
    return (
        <>
            <p className={`guess-${correctResult} guess`}>{correctResult}</p>
        </>
    )
}

export default Guess