import React, { useState, useEffect } from "react";
import Minotaur from "./Minotaur";
import Actions from "./Actions";
import Navigation from "./Navigation";
import Menu from "./Menu/Menu";
import ItemsWindow from "./Items/ItemsWindow";

function Game ({props}) {
    return (
        <div>
            <h1>
                This is the game
            </h1>
            {/* <Minotaur />
            <Actions /> */}
            <Navigation />
            <Menu />
            <ItemsWindow />
        </div>
    );
}

export default Game;