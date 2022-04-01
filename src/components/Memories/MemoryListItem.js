import React, { useState, useEffect } from "react";
import MemoryDetail from "./MemoryDetail";

function MemoryListItem ({memory}) {

    const [detailOpen, setDetailOpen] = useState(false)
    function toggleDetail(){
        setDetailOpen(!detailOpen)
    }

    let memoryResult =''
    let memoryURL =''
    let memoryDetailNote =''
    switch (memory.endType) {
        
        case 'win': 
        memoryResult = "You rescued Theseus from the Labyrinth"
        memoryURL = "http://www.maicar.com/GML/000Images/tim/theseus0819.jpg"
        memoryDetailNote = "good job"
        break;
        case 'leave' : 
        memoryResult = "You left Theseus to his fate."
        memoryDetailNote = "fair enough, he was pretty dumb"
        memoryURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Theseus_and_the_Minotaur.gif/170px-Theseus_and_the_Minotaur.gif"
        break;
        case 'die' :
            memoryResult = 'You were killed by the Minotaur'
            memoryDetailNote = "alas, you were met by Hermes, who took you to the underworld"
            memoryURL = "https://serenademagazine.com/wp-content/uploads/2021/07/Orpheus_and_Eurydice-header-1200x799.png"
            break;
        case 'restart' :
            memoryResult = "You gave up"
            memoryDetailNote = "you got lost and abandoned all hope"
            memoryURL = "https://www.ancient-origins.net/sites/default/files/field/image/The-Descent-of-Ariadne.jpg"
        break;
        case 'diplomacy' :
            memoryResult = "You tried to reason with the Minotaur"
            memoryDetailNote = "but you died. At least you got taken to the underworld by Hermes? He laughed at you."
            memoryURL = "https://serenademagazine.com/wp-content/uploads/2021/07/Orpheus_and_Eurydice-header-1200x799.png"
    }
    return (
        <div className="memoryItem">
            <h3 onClick={toggleDetail}>Journey {memory.id}</h3>
            <h4>{memoryResult}</h4>
            {detailOpen ? <MemoryDetail memoryURL={memoryURL} memoryDetailNote={memoryDetailNote}/> : null}
        </div>
    );
}

export default MemoryListItem;