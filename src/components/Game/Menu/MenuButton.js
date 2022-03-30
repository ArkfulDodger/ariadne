import React, { useState, useEffect } from "react";
import MenuPopup from "./MenuPopup";

function MenuButton ({handleToggleMenu, menuOpen}) {
    return (
        <div>
            <button onClick={handleToggleMenu}>≡</button>
            {menuOpen ? <MenuPopup /> : null}
        </div>
    );
}

export default MenuButton;