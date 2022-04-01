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
        memoryDetailNote = "You decided to leave the maze without Theseus. Fair enough, he was pretty dumb"
        memoryURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Theseus_and_the_Minotaur.gif/170px-Theseus_and_the_Minotaur.gif"
        break;
        case 'die' :
            memoryResult = 'You were gored by the Minotaur'
            memoryDetailNote = "Alas! You were met by Hermes, who took you to the underworld"
            memoryURL = "https://serenademagazine.com/wp-content/uploads/2021/07/Orpheus_and_Eurydice-header-1200x799.png"
            break;
        case 'restart' :
            memoryResult = "You gave up"
            memoryDetailNote = "you got lost and abandoned all hope"
            memoryURL = "https://www.ancient-origins.net/sites/default/files/field/image/The-Descent-of-Ariadne.jpg"
        break;
        case 'diplomacy' :
            memoryResult = "You tried to reason with the Minotaur"
            memoryDetailNote = "You died. At least you got taken to the underworld by Hermes? He laughed at you."
            memoryURL = "https://serenademagazine.com/wp-content/uploads/2021/07/Orpheus_and_Eurydice-header-1200x799.png"
            break;
        case 'slay' :
            memoryResult = "You slew the Minotaur"
            memoryDetailNote = "Sword in hand, you were able to defeat the beast and escape the maze"
            memoryURL = "https://tripanthropologist.com/wp-content/uploads/2021/02/mosaic-of-theseus-and-minotaur.jpg"
        break;
        case 'survival' :
            memoryResult = "You fed Theseus to the Minotaur"
            memoryDetailNote="You did what you had to do to survive, dropped the whole man, and escaped"
            memoryURL="https://mir-s3-cdn-cf.behance.net/project_modules/fs/d70eef17796593.56225cb5ecf35.jpg"
            break;
        case 'bothdie' :
            memoryResult ="You and Theseus both died"
            memoryDetailNote="You both fought valiently, but in the beast got you in the end. At least you're in Hades together?"
            memoryURL="https://i.ytimg.com/vi/ltewSdCdAjM/hqdefault.jpg"
            break;
        case 'caught' :
            memoryResult="The Minotaur caught up with you"
            memoryDetailNote="You tried to run, but were gored in the end. Hermes took you the the underworld"
            memoryURL="https://serenademagazine.com/wp-content/uploads/2021/07/Orpheus_and_Eurydice-header-1200x799.png"
            break;
        case 'musicfail':
            memoryResult="Your music stopped working"
            memoryDetailNote="You kept playing soothing music for the Minotaur, but he didn't stay soothed. Hermes laughs at you as he guides you to the underworld"
            memoryURL="http://blogs.getty.edu/iris/files/2016/11/orpheus.jpg?x45884"
            break;
        case "swordfail":
            memoryResult = "You slew the Minotaur"
            memoryDetailNote = "Sword in hand, you were able to defeat the beast and escape the maze"
            memoryURL = "https://tripanthropologist.com/wp-content/uploads/2021/02/mosaic-of-theseus-and-minotaur.jpg"
        break;
        case "sacrifice":
            memoryResult="You sacrificed yourself for a dumb man"
            memoryDetailNote="How's that working out for you?"
            memoryURL="https://serenademagazine.com/wp-content/uploads/2021/07/Orpheus_and_Eurydice-header-1200x799.png"
            break;
        default : memoryResult="The Game ended"


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