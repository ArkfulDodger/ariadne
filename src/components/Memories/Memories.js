import React, { useState, useEffect } from "react";
import MemoryList from "./MemoryList";
import { Link } from "react-router-dom";

function Memories ({isCurGame, resumeGame, startNewGame}) {

    const [memories, setMemories] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/memories')
        .then(resp => resp.json())
        .then(data => setMemories(data))
    }, [])

    return (
        <div className="memoryPage">
            <h1>Memories of the Past</h1>
            <button className="linklike" onClick={isCurGame ? resumeGame : startNewGame}>{isCurGame ? "Return to the Labyrinth" : "Enter the Labyrinth"}</button>             
            <Link to="/">Return to Main Menu</Link>  
            <MemoryList memories={memories}/>
        </div>
    );
}

export default Memories;