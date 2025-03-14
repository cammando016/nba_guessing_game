import React from "react";
import photo from '../assets/images/players/devin_booker.jpg'

function Player({ name }) {
    return (
        <>
            <div className="player-name">
                <p>{name}</p>
            </div>
            <div className="player-photo-div">
                <img className="player-photo" src={photo} alt="Devin Booker Photo" />
            </div>
        </>
    )
}

export default Player