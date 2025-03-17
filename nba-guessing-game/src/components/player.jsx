import React from "react";
import photo from '../assets/images/players/devin_booker.jpg'

function Player({ name }) {
    return (
        <>
            <div className="player-name">
                <h3>{name}</h3>
            </div>
            <div className="player-photo-div">
                <img className="player-photo" src={photo} alt="Devin Booker Photo" />
            </div>
        </>
    )
}

export default Player