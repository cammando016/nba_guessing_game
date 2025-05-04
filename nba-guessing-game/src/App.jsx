import './App.css'
import React from "react";
import { useState } from 'react';

//Component imports
import StartScreen from './components/start-screen';
import Homepage from './components/homepage';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  function handleClick() {
    setGameStarted(true);
    console.log("Click start ran");
  }

  return (
    gameStarted ? <Homepage /> : <StartScreen submitClicked={handleClick}/> 
  )
}

export default App