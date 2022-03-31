import React, { useState, useEffect } from "react";
import MemoryDetail from "./MemoryDetail";

function MemoryListItem ({memory}) {
    //state for if displaying all info or short
    const [detailOpen, setDetailOpen] = useState(false)
    function toggleDetail(){
        setDetailOpen(!detailOpen)
    }

    let memoryResult =''
    let memoryURL =''
    switch (memory.endType) {
        
        case 'win': 
        memoryResult = "You rescued Theseus from the Labyrinth"
        memoryURL = "http://www.maicar.com/GML/000Images/tim/theseus0819.jpg"
        break;
        case 'leave' : 
        memoryResult = "You left Theseus to his fate."
        memoryURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Theseus_and_the_Minotaur.gif/170px-Theseus_and_the_Minotaur.gif"
        break;
    }
    return (
        <div className="memoryItem">
            <h3 onClick={toggleDetail}>Journey {memory.id}</h3>
            <h4>{memoryResult}</h4>
            {detailOpen ? <MemoryDetail memoryURL={memoryURL}/> : null}
        </div>
    );
}

export default MemoryListItem;