import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Minotaur from "./Minotaur";
import Actions from "./Actions";
import Navigation from "./Navigation";
import Menu from "./Menu/Menu";
import ItemsWindow from "./Items/ItemsWindow";
import PromptText from "./PromptText";
import GameEnd from "./GameEnd";

//TODO: 
//fix backwards in game navigation - kind of working: can go back but turn direction not dynamic
// styling - an ongoing process
// game should load from game object if it exists
    // implement new game (resets game obj)
// have narration pull from game obj
// persist narration to game obj

 // TODO: STRETCH'
    // non-goal path lengths greater than 1
    // stringPath
    // travel orientation/direction (persist to game object)

const defaultGameInfo = {
    curLocation: ["0", ""],
    entryDirection: 'south',
    stringPath: '0',
    minoLocation: '',
    itemsArray: [],
    playerInfo: {}
};

const defaultMap = [
    {
        path: '0',
        type: 'entrance',
        roomVisited: false,
        westPassageType: "",
        eastPassageType: "",
        southPassageType: "exit",
        westPassageVisited: false,
        eastPassageVisited: false,
        southPassageVisited: true,
        onGoalPath: true
    }
];

const defaultGoalPath = "";

const defaultGameObject = {
    ... defaultGameInfo,
    goalPath: defaultGoalPath,
    map: defaultMap
}

// const defaultPassages = [
//     {
//         "id": 1,
//         "nav-text": "a torchlit path",
//         "narration-text": "torchlit path",
//         "initial-travel-text": [1, 3, 4, 5],
//         "return-travel-text": [1, 2, 3, 4, 5]
//     }
// ]

function Game ({ isCurGame, updateIsCurGameInDb }) {
    

    //#region State and Variable Declarations

    const [curGameInfo, setCurGameInfo] = useState(defaultGameInfo)
    const [map, setMap] = useState(defaultMap)
    const [goalPath, setGoalPath] = useState(defaultGoalPath)

    const {curLocation} = curGameInfo

    const [patchAllowed, setPatchAllowed] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [itemsOpen, setItemsOpen] = useState(false)
    const [passageTypeArray, setPassageTypeArray] = useState([])
    const [passages, setPassages] = useState([]);
    const [endType, setEndType] = useState('');
    
    const goalPathLength = 5;



    //fetch to set up passages and passage types, then also generate the goal path and the game map on load
    //eventually this will pull both passage types and currGame if there is one...
    useEffect(() => {
        fetch('http://localhost:3001/passages')
        .then(resp => resp.json())
        .then(data => {
            setPassages(data);
            setPassageTypeArray(data.map(passObj => passObj['nav-text']));
        })
    }, [])

    // if there is no current game, start one
    useEffect(() => {
        if (!isCurGame) {
            //console.log()
            startNewGame()
        } else {
            loadCurGame()
        }
    }, [])
    
    useEffect (() => {
        if (goalPath.length > 1)
        {generateMap(goalPath);}
    }, [goalPath])
    
    useEffect(() => {
        patchCurGameStatus();
    }, [curGameInfo, map, goalPath])
    
    useEffect(() =>{
        if(endType){endGame()}
    }, [endType])
    
    //#endregion


    //#region New Game Functions 
    
    function startNewGame() {
        console.log("New Game Started!");
        clearCurrentGameInDb()
            .then(() => generateGoalPath())
        updateIsCurGameInDb(true);
        setPatchAllowed(true)
        //TODO: put logic here for starting a new game
    }

    function loadCurGame(){
        console.log("loading old game!")
        fetch(`http://localhost:3001/current-game`)
        .then( res => res.json())
        .then( data => {
            const actualData = data[0]
            //console.log(data[0])
            setMap(actualData.map)
            setGoalPath(actualData.goalPath)
            setCurGameInfo({
                curLocation: actualData.curLocation,
                stringPath: actualData.stringPath,
                minoLocation: actualData.minoLocation,
                itemsArray: actualData.itemsArray,
                playerInfo: actualData.playerInfo,
            })
            //console.log(data)
            setPatchAllowed(true)
        })
        .catch( error => console.log(error.message));
    }
    
    function generateGoalPath() {
        let path = "0";
        for (let i = 0; i < goalPathLength; i++) {
            path += Math.round(Math.random());
        }

        console.log('goal path:', path)
        setGoalPath(path)
    }

    function generateMap() {

        const mapRooms = [];

        const entranceRoom = {
            path: '0',
            type: 'entrance',
            roomVisited: false,
            westPassageType: getRandomPassageType(),
            eastPassageType: getRandomPassageType(),
            southPassageType: "exit",
            westPassageVisited: false,
            eastPassageVisited: false,
            southPassageVisited: true,
            onGoalPath: true
        }

        mapRooms.push(entranceRoom);
        addRoomsTo(entranceRoom);

        setMap(mapRooms)

        function addRoomsTo(fromRoom) {
        if (fromRoom.westPassageType) {
            addNewRoomToMap('0');
        }
        if (fromRoom.eastPassageType) {
            addNewRoomToMap('1');
        }


            function addNewRoomToMap(turn) {
                const path = fromRoom.path + turn;
                let westPassage
                let eastPassage

                let roomType = ''
                if (path===goalPath) {
                    roomType = 'theseus'
                    westPassage = null
                    eastPassage = null
                }
                else {
                    westPassage = getPassageType(path, path+'0');
                    eastPassage = getPassageType(path, path+'1');
                    roomType="random"
                }

                const newRoom = {
                path: path,
                type: roomType,
                roomVisited: false,
                westPassageType: westPassage,
                eastPassageType: eastPassage,
                southPassageType: turn === "0" ? fromRoom.westPassageType : fromRoom.eastPassageType,
                westPassageVisited: false,
                eastPassageVisited: false,
                southPassageVisited: false,
                onGoalPath: isOnGoalPath(path)
                }

                mapRooms.push(newRoom);
                addRoomsTo(newRoom)
            }
        }

        function isOnGoalPath(path) {
            return goalPath.startsWith(path);
        }

        function getPassageType(currentPath, destinationPath) {
            if (isOnGoalPath(destinationPath)) {
                return getRandomPassageType();
            } else {
                if (isOnGoalPath(currentPath)) {
                return getRandomPassageType();
                } else {
                return "";
                }
            }
        }
        
        function getRandomPassageType() {
            let passageType = passageTypeArray[Math.floor(Math.random()*passageTypeArray.length)];
            if (passageType === "exit") {
                // console.log('----passage was an exit');
                passageType = getRandomPassageType();
                // console.log('----passage was changed to', passageType);
            }
            return passageType
        }
    }

    //#endregion

    //#region Helper Functions

        //ENDGAME 
    //Display info to player
    //send game data to mems
    //reset game data (optional)
    //send player to memories (give choice)
    //change iscurgame to false


    function endGame(){

        let endGameMessage = ''

        switch (endType) {
            case 'win' : endGameMessage = "YOU FOUND YOUR HIMBO, good job"
            break;
            default: endGameMessage = "ok how did you get here?" 
        }
        console.log(endGameMessage)
        //render a new endGame
        //(endGameMessage)

        if (endType){
            //setIsGameEnd(true)

            fetch(`http://localhost:3001/memories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    ...curGameInfo,
                    endType: endType
                })
            })
            .catch( error => console.log(error.message));
        }
        
        updateIsCurGameInDb(false)
    }

    function clearCurrentGameInDb() {
        return (
        fetch(`http://localhost:3001/current-game/1`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(defaultGameObject)
        })
            .then( res => res.json())
            .then( data => {console.log('reset game obj in database')})
            .catch( error => console.log(error.message)) )
    }

    function handleToggleMenu(){
        setMenuOpen(!menuOpen)
    }
    
    function handleToggleItems(){
        setItemsOpen(!itemsOpen)
    }

    function patchCurGameStatus(){
        if (patchAllowed)
        {
        console.log('patching')
        const patchGameObj = {
            ...curGameInfo,
            goalPath: goalPath,
            map: map
        }
        fetch(`http://localhost:3001/current-game/1`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify( patchGameObj  )
        })
        .then( res => res.json())
        //.then( data => console.log(data))
        .catch( error => console.log(error.message));}
    }

    function updateGameInfo(newInfoObj){
        setCurGameInfo({
            ...curGameInfo,
            [newInfoObj.key] : newInfoObj.value
        })
    }


    function printAsTurns(binaryPath) {
        let turnPath = "entrance";
        for (let i = 1; i < binaryPath.length; i++) {
        console.log(binaryPath[i]);
        turnPath += binaryPath[i] === '0' ? " left" : " right";
        }
        return turnPath;
    }
    
    function findRoomByPath(path) {
        return map.find(room => {
            return room.path === path
        })
    }

    function getEntryDirection(curLocation) {
        if (curLocation[0].length > curLocation[1].length) {
            return 'south';
        } else if (curLocation[1].endsWith('0')) {
            return 'west';
        } else {
            return 'east';
        }
    }

    function updateCurRoom(newRoom){
        // update path visited status in origin and destination rooms in map state
        // if travelling northerly
        if (newRoom.path.length > curLocation[0].length) {
            setMap(map => map
                // .map( room => room.path === newRoom.path ? {...room, southPassageVisited: room.southPassageVisited + 1} : room)
                .map( room => room.path === curLocation[0]
                    ? newRoom.path.endsWith("0") ? {...room, westPassageVisited: true} : {...room, eastPassageVisited: true}
                    : room));
        // if travelling southily
        } else {
            setMap(map => map
                .map(room => room.path === curLocation[0]
                    ? {...room, southPassageVisited: true}
                    : room))
            // TODO: fix bug here once non-linear progression is possible
            // TODO: will need to rework to increment instead of setting to true
            // setMap(map => map
            //     .map( room => 
            //         { console.log('map test:', map)
            //         console.log('room test:', room)
            //         console.log('curLoc test:', curLocation)
            //         console.log('newRoom test:', newRoom);
            //         return room.path === newRoom.path
            //         ? curLocation[0].endsWith("0") ? {...room, westPassageVisited: true} : {...room, eastPassageVisited: true}
            //         : room}))
            //     .map( room => room.path === curLocation[0] ? {...room, southPassageVisited: true} : room);
        }
        
        

        // set destination room to visited in state
        setMap(mapInState => mapInState.map(room => room.path === curLocation[0] ? {...room, roomVisited: true} : room))
        

        // const updatedNewRoom = {...newRoom, roomVisited: true};
        // console.log(updatedNewRoom);

        const newLocation = [
            newRoom.path,
            curLocation[0]
        ]

        const newEntryDirection = getEntryDirection(newLocation);

        setCurGameInfo(curGameInfo => ({
            ...curGameInfo,
            curLocation : newLocation,
            entryDirection : newEntryDirection
        }))
    }

    //#endregion


    return (
        <div className="game">
            <h1>
                Ariadne
            </h1>
            {(map.length > 1 && passages.length > 1)
                ? <PromptText map={map} curGameInfo={curGameInfo} passages={passages}/>
                : null}
            {endType ? <GameEnd endType={endType}/> : 
            <>
            {/* <Minotaur /> */}
            {/* <Actions /> */}
            <Navigation 
                patchCurGameStatus={patchCurGameStatus}
                endGame = {endGame}
                updateCurRoom={updateCurRoom} 
                curGameInfo={curGameInfo} 
                map={map}
                setEndType={setEndType}
            />
            <div className="game-buttons">
                <Menu menuOpen={menuOpen} handleToggleMenu={handleToggleMenu} startNewGame={startNewGame}/>
                <ItemsWindow itemsOpen={itemsOpen} handleToggleItems={handleToggleItems} />
            </div>
            </>
            }
        </div>
    );
}

export default Game;