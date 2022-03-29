import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MenuPopup () {
    return (
        <div>
            {/* <h4>I'm a lil menu popup!</h4> */}
            <Link to="/home">Return to Main Menu</Link>  
            <Link to="/memories">Reflect on your Memories</Link>  

        </div>
    );
}

export default MenuPopup;