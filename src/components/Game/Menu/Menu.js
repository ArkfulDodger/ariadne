import React, { useState, useEffect } from "react";
import MenuButton from "./MenuButton";

function Menu ({handleToggleMenu, menuOpen, startNewGame}) {

    return (
        <div className="menu">
            {/* <h2>Menu</h2> */}

            <MenuButton menuOpen={menuOpen} handleToggleMenu={handleToggleMenu} startNewGame={startNewGame} />
        </div>
    );
}

export default Menu;