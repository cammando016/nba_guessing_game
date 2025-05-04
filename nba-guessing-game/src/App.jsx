import './App.css'
import React from "react";
import { useState, useEffect } from 'react';

//Component imports
import StartScreen from './components/start-screen';
import Homepage from './components/homepage';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [filteredPlayerData, setFilteredPlayerData] = useState([]);
  const [randPlayerIndex, setRandPlayerIndex] = useState(0);

  const updateRandPlayerIndex = (array) => setRandPlayerIndex(Math.floor(Math.random()*array.length));

  //Read player data returned from generateFilteredPlayers.js
  useEffect(() => {
    async function fetchFilteredPlayers() {
      try {
        const response = await fetch("/filtered-players.json");
        const data = await response.json();

        setFilteredPlayerData(data);
        setRandPlayerIndex(Math.floor(Math.random() * data.length));
      }
      catch (err) {
        console.error("Failed to load filtered players. Error: ", err)
      }
    }

    fetchFilteredPlayers();
  }, []);

  function handleClick() {
    setGameStarted(true);
    console.log("Click start ran");
  }

  return (
    gameStarted ? 
      <Homepage  
        updateRandPlayerIndex={updateRandPlayerIndex} 
        randPlayerIndex={randPlayerIndex}
        playersDict={filteredPlayerData}
      /> 
      : 
      <StartScreen submitClicked={handleClick}/> 
  )
}

export default App