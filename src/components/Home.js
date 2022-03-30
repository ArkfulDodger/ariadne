import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollTextContainer from "./SrollTextContainer"

function Home ({isCurGame, updateIsCurGameInDb }) {
    //TODO: "Enter Labyrith" should trigger start of a new game, whereas "Return to" only navigates to the Game page
        // among other things "Enter" will set isCurGame from false to true
    //TODO: create Start Over/New Game button which only appears if isCurGame
        // this button should send the current game to memories and start a new game

    function newGameClick(e) {
        console.log(isCurGame)
        if (isCurGame) {
            // TODO: find a way to ensure current game is false without reloading page
            //updateIsCurGameInDb(false);
        }
        console.log('newGameClicked');
    }


    return (
        <div className="home">
            <h1>Ariadne</h1>
            <ScrollTextContainer />
            <img src="https://www.3ammagazine.com/3am/wp-content/uploads/2020/12/Minotaur-mosaic-e1607071119551.jpg" alt="minoan mosiac" />
            <div>
                {isCurGame
                    ? <Link to="/play" >Return to the Labyrinth</Link>  
                    : <Link to="/play" onClick={newGameClick}>Enter the Labyrinth</Link> 
                }
                {isCurGame ? <Link to="/play" onClick={newGameClick}>Restart Game</Link> : null}
                <Link to="/memories">Reflect on your Memories</Link>  
            </div>
        </div>
    );
}

export default Home;