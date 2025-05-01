import './App.css'
import React from "react";

//Component imports
import StartScreen from './components/start-screen';
import Homepage from './components/homepage';

function handleClick() {
  console.log("Click start ran");
}

function App() {
  return (
    <div>
      <StartScreen submitClicked={handleClick}/>
      <Homepage />
    </div>
  )
}

export default App