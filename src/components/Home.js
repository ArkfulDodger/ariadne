import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollTextContainer from "./SrollTextContainer"

function Home ({isCurGame}) {

    return (
        <div className="home">
            <h1>Ariadne</h1>
            <ScrollTextContainer />
            <div>
            <Link to="/play">{isCurGame ? "Return to the Labyrinth" : "Enter the Labyrinth"}</Link>  
            <Link to="/memories">Reflect on your Memories</Link>  
            </div>
        </div>
    );
}

export default Home;