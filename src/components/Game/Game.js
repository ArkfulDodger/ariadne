import React, { useState, useEffect } from "react";
import Minotaur from "./Minotaur";
import Actions from "./Actions";
import Navigation from "./Navigation";
import Menu from "./Menu/Menu";
import ItemsWindow from "./Items/ItemsWindow";

function Game ({props}) {
    //move app to game
    //setup game state
    //get navigation buttons going
    //(set up options as taking an array that you iterate over)
    //comment out items, mino, etc
    //site navigation buttons
    //have current game post whenever curGame updates
    //win conditions (new component?) - get to end point
    //instantly post to memories and take you to memories
    //memories does a new fetch
    //menu and memories should conditional render nav buttons
    //then backwards in game navigation

    //state - curLocation is the [curIndex and prevIndex] and where you came from, map(has chamber info), minotaur location, itemsArray, 
    //state cont - playerInfo - is theseus, aid objects, injuries etc
    //state - currentGame that persists/updates, goalPath
    //state curGame cont - string path, map 
    //for mems: items collected, rooms visited (action taken there/result), found theseus?, minotaurencountersarray
    //for mems: success? (theseus)
    //currgame needs basically anything in state other than isItemWindow 
    //state - isItemWindow, ismenuopen
    //post to json like all the time
    
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