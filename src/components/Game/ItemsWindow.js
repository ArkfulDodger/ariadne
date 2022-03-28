import React, { useState, useEffect } from "react";
import IconList from "./IconList";
import FocusImage from "./Items/FocusImage";
import ItemDetail from "./Items/ItemDetail";

function ItemsWindow (props) {
    return (
        <div>
            <h2>Items Window!</h2>
            <IconList />
            <FocusImage />
            <ItemDetail />
        </div>
    );
}

export default ItemsWindow;