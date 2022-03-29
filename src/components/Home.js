import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollTextContainer from "./SrollTextContainer"

function Home ({isCurGame}) {

    return (
        <div>
            <h1>Home Page</h1>
            <ScrollTextContainer />
            <Link to="/play">{isCurGame ? "Return to the Labyrinth" : "Enter the Labyrinth"}</Link>  
            <Link to="/memories">Reflect on your Memories</Link>  

        </div>
    );
}

export default Home;