import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollTextContainer from "./SrollTextContainer"

function Home ({ isCurGame, startNewGame, restartGame, resumeGame }) {
    return (
        <div className="home">
            <h1>Ariadne</h1>
            <ScrollTextContainer />
            <img src="https://t4.ftcdn.net/jpg/00/59/78/51/240_F_59785107_UlYF1ot0wghZM62hYeKHT9Kuh1uE78zS.jpg" alt="ariadne at the labyrinth entrance" />
            <div className="homeButtons">
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