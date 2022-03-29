import React, { useState, useEffect } from "react";
import MemoryList from "./MemoryList";
import { Link } from "react-router-dom";

function Memories ({isCurGame}) {
    //each memory will need to know if it's displaying all it's info
    //list of mems themselves pulled from db into state, they know 
    //enter or reenter labyrthin 
    //memories pulls down

    const [memories, setMemories] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/memories')
        .then(resp => resp.json())
        .then(data => setMemories(data))
    }, [])

    return (
        <div>
            <h1>Memories!!!</h1>
            <MemoryList />
            <Link to="/play">{isCurGame ? "Return to the Labyrinth" : "Enter the Labyrinth"}</Link>             
            <Link to="/home">Return to Main Menu</Link>  
        </div>
    );
}

export default Memories;