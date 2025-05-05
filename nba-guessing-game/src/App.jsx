import './App.css'
import React from "react";
import { useState, useEffect } from 'react';

//Component imports
import StartScreen from './components/start-screen';
import Homepage from './components/homepage';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState('');
  const [foulLimit, setFoulLimit] = useState(0);
  const [shotLimit, setShotLimit] = useState(0);

  const [filteredPlayerData, setFilteredPlayerData] = useState([]);
  const [randPlayerIndex, setRandPlayerIndex] = useState(0);

  const updateRandPlayerIndex = (array) => setRandPlayerIndex(Math.floor(Math.random()*array.length));
  const falsifyGameStarted = () => setGameStarted(false);

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

  //Start game button for game settings form
  function startGame({gameMode, shotLimit, foulLimit}) {
    setGameMode(gameMode);
    setShotLimit(shotLimit);
    setFoulLimit(foulLimit);
    setGameStarted(true);
  }

  return (
    gameStarted ? 
      <Homepage  
        updateRandPlayerIndex={updateRandPlayerIndex} 
        randPlayerIndex={randPlayerIndex}
        playersDict={filteredPlayerData}
        gameMode={gameMode}
        shotLimit={shotLimit}
        foulLimit={foulLimit}
        falsifyGameStarted={falsifyGameStarted}
      /> 
      : 
      <StartScreen 
        startGame={startGame}
      /> 
  )
}

export default App