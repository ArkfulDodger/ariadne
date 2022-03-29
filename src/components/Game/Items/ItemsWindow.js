import React, { useState, useEffect } from "react";
import IconList from "./IconList";
import FocusImage from "./FocusImage";
import ItemDetail from "./ItemDetail";

function ItemsWindow ({itemsOpen, handleToggleItems}) {
    return (
        <div>
            {/* <h2>Items Window!</h2> */}
            <button onClick={handleToggleItems}>🎒</button>
            {itemsOpen ? 
                <><IconList />
                <FocusImage />
                <ItemDetail /> </>
                : null
            }
        </div>
    );
}

export default ItemsWindow;