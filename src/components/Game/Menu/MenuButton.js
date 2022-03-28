import React, { useState, useEffect } from "react";
import MenuPopup from "./MenuPopup";

function MenuButton (props) {
    return (
        <div>
            <button>Menu Button</button>
            <MenuPopup />
        </div>
    );
}

export default MenuButton;