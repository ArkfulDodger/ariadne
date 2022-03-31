import React, { useState, useEffect } from "react";
import MenuPopup from "./MenuPopup";

function MenuButton ({handleToggleMenu, menuOpen, startNewGame}) {
    return (
        <div>
            <button onClick={handleToggleMenu}>≡</button>
            {menuOpen ? <MenuPopup startNewGame={startNewGame}/> : null}
        </div>
    );
}

export default MenuButton;