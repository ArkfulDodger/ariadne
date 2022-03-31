import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MenuPopup ({ startNewGame }) {
    function handleClick(e) {
        startNewGame();
    }
    return (
        <div>
            {/* <h4>I'm a lil menu popup!</h4> */}
            <Link to="/home">Return to Main Menu</Link>
            <button onClick={handleClick} >Restart Game</button>
            <Link to="/memories">Reflect on your Memories</Link>  
            {/*link to refresh*/}

        </div>
    );
}

export default MenuPopup;