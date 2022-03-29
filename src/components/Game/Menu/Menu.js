import React, { useState, useEffect } from "react";
import MenuButton from "./MenuButton";

function Menu ({handleToggleMenu, menuOpen}) {
    return (
        <div>
            <h2>Menu</h2>
            <MenuButton menuOpen={menuOpen} handleToggleMenu={handleToggleMenu} />
        </div>
    );
}

export default Menu;