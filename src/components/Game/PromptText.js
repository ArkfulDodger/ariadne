import { useState, useEffect } from "react";
import Minotaur from "./Minotaur";

const URL ='http://localhost:3001'

const defaultPassage = {
    'nav-text': "a passage",
    'narration-text': "passage",
    'return-narration-text': "passage",
    'initial-travel-text': [1],
    'return-travel-text': [1]
}

const defaultTTextData = {
    text: "You walk through the",
    passages: []
}

const defaultChamberData = {
    "type": "entrance",
    "default-visibility": true,
    "descriptions": {
        "initial": {
            "dark": "where you are immediately presented with a choice of two branching paths",
            "lit": "where you are immediately presented with a choice of two branching paths"
        },
        "return": {
            "dark": "the entrance to the labyrinth",
            "lit": "the entrance to the labyrinth"
        }
    }
}

const defaultConText = [
    {
        "id": 1,
        "text": "and see"
    }
]

const defaultRoom = {
    "path": "0",
    "type": "entrance",
    "roomVisited": true,
    "westPassageType": "a rickety bridge over a pit",
    "eastPassageType": "a mossy, but climbable wall",
    "southPassageType": "exit",
    "westPassageVisited": true,
    "eastPassageVisited": true,
    "southPassageVisited": true,
    "onGoalPath": true
    }

function PromptText({ map, curGameInfo, passages, getIsWithMinotaur }) {

    const {curLocation = ["0", ""], entryDirection = "south", minoLocation, minoCalmed, minoCooldownMax, minoCooldown, minoThreat, itemsArray, playerInfo, minoThreatMax} = curGameInfo;

    // TODO: comment back in when ready to integrate db.json/state
    //#region fetching data from db.json
    const [travelTextInitial, setTravelTextInitial] = useState([]);
    const [travelTextReturn, setTravelTextReturn] = useState([]);
    const [chambers, setChambers] = useState([]);
    const [conText, setConText] = useState([]);

    useEffect(() => {
        fetch(`${URL}/travel-text-initial`)
            .then( res => res.json())
            .then( tTextInitial => setTravelTextInitial(tTextInitial))
            .catch( error => alert(error.message));

        fetch(`${URL}/travel-text-return`)
            .then( res => res.json())
            .then( tTextReturn => setTravelTextReturn(tTextReturn))
            .catch( error => alert(error.message));
            
        fetch(`${URL}/chambers`)
            .then( res => res.json())
            .then( passages => setChambers(passages))
            .catch( error => alert(error.message));

        fetch(`${URL}/connecting-text`)
            .then( res => res.json())
            .then( conText => setConText(conText))
            .catch( error => alert(error.message));
    }, [])

    // console.log('passages', passages);
    // console.log('travel-initial', travelTextInitial);
    // console.log('travel-return', travelTextReturn);
    //#endregion

    const curRoom = map.length > 1 ? map.find(room => room.path === curLocation[0]) : defaultRoom;
    const { type: chamberType, roomVisited, onGoalPath } = curRoom;
    const chamberData = chambers.length > 1 ? chambers.find(chamber => chamber.type === chamberType) : defaultChamberData;
    // console.log('curRoom',curRoom);

    // conditions from currentGame
    const isPassageVisited = getIsPassageVisited();
    const isForwardTravel = curLocation[0].length > curLocation[1].length;
    const hasTorch = itemsArray.torch; // TODO: connect to Game state
    const hasHorn = true; // TODO: connect to Game state
    const isVisibility = getVisibility(); // TODO: connect to Game state

    // console.log('roomVisited', roomVisited);
    // console.log('isPassageVisited', isPassageVisited);
    // console.log('isForwardTravel', isForwardTravel);

    // passage info
    const passageType = getPassageType();
    // console.log('passages', passages);
    // console.log('passageType', passageType);
    const passageData = passages.length > 1 ? passages.filter(passage => passage['nav-text'] === passageType)[0] : defaultPassage;
    // console.log('passageData:', passageData);
    const passageText = isPassageVisited
        ? (passageData['return-narration-text'] || passageData['narration-text'])
        : passageData['narration-text'];
    const travelTextId = isPassageVisited 
        ? randomFromArray(passageData['return-travel-text']) 
        : randomFromArray(passageData['initial-travel-text'])
    // console.log('tTextId:', travelTextId);
    const travelTextData = isPassageVisited
        ? travelTextReturn.length < 1 ? defaultTTextData : (travelTextReturn.filter(tText => tText.id === travelTextId)[0])
        : travelTextInitial.length < 1 ? defaultTTextData : (travelTextInitial.filter(tText => tText.id === travelTextId)[0])

    // console.log('travelTextData', travelTextData);
    const travelText = isForwardTravel
        ? travelTextData.text[0]
        : travelTextData.text[1] || travelTextData.text[0]

    // console.log('passage text:', passageText);
    // console.log('tText options:', isPassageVisited ? passageData['return-travel-text'] : passageData['initial-travel-text']);
    // console.log('tText ID:', travelTextId);
    // console.log('tText Data:', travelTextData);
    // console.log('tText:', travelText);
    



    // text options


    // assemble narrative text
    const entryText = `${getIsWithMinotaur() && !minoCalmed ? "You flee from the minotaur via the": travelText} ${passageText}`;
    // console.log(entryText);
    const connectingText = getConnectingText();
    const chamberText = getChamberText();
    // const clueText = "Placing the listening horn to your ear, you believe you can faintly hear the heavy plodding of hooves from the passage beyond to the right."
    // const clueText = "{{visibility: " + isVisibility + "}}";
    const clueTextArray = []
    
    if(minoThreat > 0 && minoThreat < minoThreatMax) {
        clueTextArray.push('The beast still pursues you.')
    } else if (minoThreat >= minoThreatMax) {
        clueTextArray.push('The beast is now nearly upon you!')
    }

    const clueText = clueTextArray.join(" ") || "";

    // console.log(curRoom);

    const narrationText = curRoom.type === 'theseus' && !curRoom.roomVisited
        ? `${chamberText}`
        : `${entryText} ${connectingText} ${chamberText}. ${clueText}`
    // console.log(narrationText);

    const firstMinoText = `The beast towers over you, as you look for an escape. You wonder how long you can outrun him.`
    const calmedMinoText = 'Remarkably, your playing seems to have lulled the beast into a nap. Best to continue onward before he wakes!'

    function getRenderedText() {
        if (getIsWithMinotaur() && minoCalmed && minoCooldown === minoCooldownMax) {
            return calmedMinoText;
        } else if (getIsWithMinotaur() && minoThreat === 0) {
            return firstMinoText;
        } else {
            return narrationText;
        }
    }

    const renderedText = getRenderedText();

    //#region HELPER FUNCTIONS
    function randomFromArray(array) {
        return array[Math.floor(Math.random()*array.length)]
    }

    function getIsPassageVisited() {
        switch (entryDirection || 'south') {
            case 'south':
                return curRoom.southPassageVisited;
            case 'west':
                return curRoom.westPassageVisited;
            case 'east':
                return curRoom.eastPassageVisited;
            
            default:
                return false
        }
    }

    function getPassageType() {
        // console.log('entryDirection', entryDirection);
        switch (entryDirection || 'south') {
            case 'south':
                return curRoom.southPassageType;
            case 'west':
                return curRoom.westPassageType;
            case 'east':
                return curRoom.eastPassageType;
            
            default:
                return false
        }
    }

    // function getIsDeadEnd() {
    //     // get current room
    //     const curRoom = map.find(room => room.path === curLocation[0]);

    //     // if east and west are blank, return true
    //     return !curRoom.westPassageType && !curRoom.eastPassageType;
    // }

    function getConnectingText() {
        // console.log('getting connecting text');
        if (conText.length < 2) {
            return defaultConText;
        }

        if (!roomVisited && (chamberType === "thesus" || chamberType === "entrance")) {
            return "";
        }

        return isVisibility ? randomFromArray(conText.filter(cText => cText.visibility)).text : randomFromArray(conText.filter(cText => !cText.visibility)).text;
    }

    function getChamberText() {
        if (roomVisited) {
            return isVisibility ? chamberData.descriptions.return.lit : chamberData.descriptions.return.dark;
        } else {
            return isVisibility ? chamberData.descriptions.initial.lit : chamberData.descriptions.initial.dark;
        }
    }

    function getVisibility() {
        return chamberData['default-visibility'] || hasTorch
    }
    
    // function getMinotaurText() {
    //     switch (minoThreat) {
    //         case 0:
    //             return 'The minotaur stands before you, as you look for a way to escape.';
    //         case 1:
    //             return 'The minotaur stands before you, as you look for a way to escape.';
    //         case 0:
    //             return 'The minotaur stands before you, as you look for a way to escape.';

    //             break;
        
    //         default:
    //             break;
    //     }
    // }

    //#endregion


    return (
        <div className="prompText">
            <p>{renderedText}</p>
        </div>
    )
}
export default PromptText