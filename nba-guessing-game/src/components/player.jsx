import React from "react";
//import photo from '../assets/images/players/devin_booker.jpg'

function Player({ name, photo, altText }) {
    return (
        <>
            <div className="player-name">
                <h3>{name}</h3>
            </div>
            <div className="player-photo-div">
                <img className="player-photo" src={photo} alt={altText} />
            </div>
        </>
    )
}

export default Player