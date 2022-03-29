import React, { useState, useEffect } from "react";
import Minotaur from "./Minotaur";
import Actions from "./Actions";
import Navigation from "./Navigation";
import Menu from "./Menu/Menu";
import ItemsWindow from "./Items/ItemsWindow";

function Game ({props}) {
    
    //TEMP - waiting to refactor the map logic into Game
    const curRoomNavOptions={
        choice0: "go left",
        //choice0Flavor: {curRoom.leftPassageType}
        choice0Flavor: "a dark hallway",
        choice1: "go right",
        //choice1Flavor: {curRoom.rightPassageType}
        choice1Flavor: "a shadowy corridor"
    }

    return (
        <div>
            <h1>
                This is the game
            </h1>
            {/* <Minotaur />
            <Actions /> */}
            <Navigation options={curRoomNavOptions}/>
            <Menu />
            <ItemsWindow />
        </div>
    );
}

export default Game;