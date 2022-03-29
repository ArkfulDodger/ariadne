import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollTextContainer from "./SrollTextContainer"

function Home ({isCurGame}) {
    //needs to know if there is a current game in progress to render enter button
    return (
        <div>
            <h1>Home Page</h1>
            <ScrollTextContainer />
            <Link to="/play">Enter the Labyrinth</Link>  
        </div>
    );
}

export default Home;