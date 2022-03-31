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

function PromptText({ map, curGameInfo, passages }) {

    const {curLocation = ["0", ""], entryDirection = "south", minoLocation, itemsArray, playerInfo} = curGameInfo;

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


    // TODO: remove from code once db.json integrated
    //#region DEV REGION until db.json in use
    // const passages = [
    //     {
    //         "id": 1,
    //         "nav-text": "a torchlit path",
    //         "narration-text": "torchlit path",
    //         "initial-travel-text": [1, 3, 4, 5],
    //         "return-travel-text": [1, 2, 3, 4, 5]
    //     },
    //     {
    //         "id": 2,
    //         "nav-text": "a dark stairwell",
    //         "narration-text": "dark stairwell",
    //         "initial-travel-text": [1, 2, 3, 4, 5, 8],
    //         "return-travel-text": [1, 2, 3, 5]
    //     },
    //     {
    //         "id": 3,
    //         "nav-text": "a dusty hallway",
    //         "narration-text": "dusty hallway",
    //         "initial-travel-text": [1, 2, 3, 4, 5],
    //         "return-travel-text": [1, 2, 3, 4, 5]
    //     },
    //     {
    //         "id": 4,
    //         "nav-text": "a heavy wooden door",
    //         "narration-text": "heavy door",
    //         "return-narration-text": "open doorway",
    //         "initial-travel-text": [6, 7],
    //         "return-travel-text": [1, 5]
    //     },
    //     {
    //         "id": 5,
    //         "nav-text": "a smooth stone cavern",
    //         "narration-text": "cavern tunnel",
    //         "initial-travel-text": [1, 2, 3, 4, 5],
    //         "return-travel-text": [1, 2, 3, 4, 5]
    //     },
    //     {
    //         "id": 6,
    //         "nav-text": "a winding corridor",
    //         "narration-text": "winding corridor",
    //         "initial-travel-text": [1, 2, 3, 4, 5],
    //         "return-travel-text": [1, 2, 3, 4, 5]
    //     },
    //     {
    //         "id": 7,
    //         "nav-text": "a mossy, but climbable wall",
    //         "narration-text": "mossy wall",
    //         "initial-travel-text": [9, 10, 11],
    //         "return-travel-text": [8, 9, 10]
    //     },
    //     {
    //         "id": 8,
    //         "nav-text": "a precarious ladder",
    //         "narration-text": "ladder",
    //         "initial-travel-text": [9, 11],
    //         "return-travel-text": [8, 9]
    //     }
    // ]

    // const travelTextInitial = [
    //     {
    //         "id": 1,
    //         "text": ["Slowly, you follow the"],
    //         "passages": [1, 2, 3, 5, 6]
    //     },
    //     {
    //         "id": 2,
    //         "text": ["Cautiously, you make your way through the"],
    //         "passages": [2, 3, 5, 6]
    //     },
    //     {
    //         "id": 3,
    //         "text": ["Stepping quietly, you pass along the"],
    //         "passages": [1, 2, 3, 5, 6]
    //     },
    //     {
    //         "id": 4,
    //         "text": ["You follow the"],
    //         "passages": [1, 2, 3, 5, 6]
    //     },
    //     {
    //         "id": 5,
    //         "text": ["You walk along the"],
    //         "passages": [1, 2, 3, 5, 6]
    //     },
    //     {
    //         "id": 6,
    //         "text": ["Slowly, you push open the"],
    //         "passages": [4]
    //     },
    //     {
    //         "id": 7,
    //         "text": ["With a momentary struggle and an angry creak, you are soon past the"],
    //         "passages": [4]
    //     },
    //     {
    //         "id": 8,
    //         "text": [
    //             "Steading yourself, you descend the",
    //             "Steading yourself, you ascend the"],
    //         "passages": [2]
    //     },        {
    //         "id": 9,
    //         "text": [
    //             "With great care, you climb up and past the", 
    //             "With great care, you climb to the bottom of the"],
    //         "passages": [7, 8]
    //     },
    //     {
    //         "id": 10,
    //         "text": [
    //             "Dirt, digging its way into your fingernails, you clamber atop the", 
    //             "Dirt, digging its way into your fingernails, you clamber down the"],
    //         "passages": [7]
    //     },
    //     {
    //         "id": 11,
    //         "text": [
    //             "You set yourself, and climb hand-over-hand to the top of the",
    //             "You set yourself, and climb hand-over-hand to the bottom of the"],
    //         "passages": [7, 8]
    //     }
    // ]

    // const travelTextReturn = [
    //     {
    //         "id": 1,
    //         "text": ["You return through the"],
    //         "passages": [1, 2, 3, 4, 5, 6]
    //     },
    //     {
    //         "id": 2,
    //         "text": ["You double back along the"],
    //         "passages": [1, 2, 3, 5, 6]
    //     },
    //     {
    //         "id": 3,
    //         "text": ["Once again, you make your way along the"],
    //         "passages": [1, 2, 3, 5, 6]
    //     },
    //     {
    //         "id": 4,
    //         "text": ["You again tread the"],
    //         "passages": [1, 3, 5, 6]
    //     },
    //     {
    //         "id": 5,
    //         "text": ["You tavel again along the"],
    //         "passages": [1, 2, 3, 5, 6]
    //     },
    //     {
    //         "id": 6,
    //         "text": ["You cross back over the threshhold of the"],
    //         "passages": [4]
    //     },
    //     {
    //         "id": 7,
    //         "text": [
    //             "You again descend the", 
    //             "You again ascend the"],
    //         "passages": [2]
    //     },
    //     {
    //         "id": 8,
    //         "text": [
    //             "You again make your way up the", 
    //             "You again make your way down the"],
    //         "passages": [7, 8]
    //     },
    //     {
    //         "id": 9,
    //         "text": [
    //             "Once again, you climb the", 
    //             "Once again, you climb down the"],
    //         "passages": [7, 8]
    //     },
    //     {
    //         "id": 10,
    //         "text": [
    //             "With a bit more ease, you climb back up the", 
    //             "Finding the same holds as before, you climb back down the"],
    //         "passages": [7]
    //     }
    // ]
    
    //#endregion


    const curRoom = map.length > 1 ? map.find(room => room.path === curLocation[0]) : defaultRoom;
    const { type: chamberType, roomVisited, onGoalPath } = curRoom;
    const chamberData = chambers.length > 1 ? chambers.find(chamber => chamber.type === chamberType) : defaultChamberData;
    // console.log('curRoom',curRoom);

    // conditions from currentGame
    const isPassageVisited = getIsPassageVisited();
    const isForwardTravel = curLocation[0].length > curLocation[1].length;
    const hasTorch = false; // TODO: connect to Game state
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
    const entryText = `${travelText} ${passageText}`;
    // console.log(entryText);
    const connectingText = getConnectingText();
    const chamberText = getChamberText();
    // const clueText = "Placing the listening horn to your ear, you believe you can faintly hear the heavy plodding of hooves from the passage beyond to the right."
    // const clueText = "{{visibility: " + isVisibility + "}}";
    const clueText = "";

    // console.log(curRoom);

    const narrationText = curRoom.type === 'theseus' && !curRoom.roomVisited
        ? `${chamberText}`
        : `${entryText} ${connectingText} ${chamberText}. ${clueText}`
    // console.log(narrationText);


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
    
    //#endregion


    return (
        <div className="prompText">
            <p>{narrationText}</p>
        </div>
    )
}
export default PromptText