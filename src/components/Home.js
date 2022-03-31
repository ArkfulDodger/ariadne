import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollTextContainer from "./SrollTextContainer"

function Home ({ isCurGame, startNewGame, restartGame, resumeGame }) {
    return (
        <div className="home">
            <h1>Ariadne</h1>
            <ScrollTextContainer />
            <img src="https://www.3ammagazine.com/3am/wp-content/uploads/2020/12/Minotaur-mosaic-e1607071119551.jpg" alt="minoan mosiac" />
            <div>
                {isCurGame
                    ? (<>
                        <button className="linklike" onClick={resumeGame}>Return to the Labyrinth</button>
                        <button className="linklike" onClick={restartGame}>Restart Game</button>
                    </>)
                    : <button className="linklike" onClick={startNewGame}>Enter the Labyrinth</button> 
                }
                <Link to="/memories">Reflect on your Memories</Link>  
            </div>
        </div>
    );
}

export default Home;