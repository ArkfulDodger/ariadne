import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollTextContainer from "./SrollTextContainer"

function Home ({isCurGame}) {
    //TODO: "Enter Labyrith" should trigger start of a new game, whereas "Return to" only navigates to the Game page
        // among other things "Enter" will set isCurGame from false to true
    //TODO: create Start Over/New Game button which only appears if isCurGame
        // this button should send the current game to memories and start a new game

    return (
        <div className="home">
            <h1>Ariadne</h1>
            <ScrollTextContainer />
            <div>
                <Link to="/play">{isCurGame ? "Return to the Labyrinth" : "Enter the Labyrinth"}</Link>  
                <Link to="/memories">Reflect on your Memories</Link>  
            </div>
        </div>
    );
}

export default Home;