import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import ItemsWindow from "./ItemsWindow";

function Game (props) {
    return (
        <div>
            <h1>This is the game</h1>
            <Menu />
            <ItemsWindow />
        </div>
    );
}

export default Game;