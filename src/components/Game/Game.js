import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Minotaur from "./Minotaur";
import Theseus from "../Theseus";
import Actions from "./Actions";
import Navigation from "./Navigation";
import Menu from "./Menu/Menu";
import ItemsWindow from "./Items/ItemsWindow";
import PromptText from "./PromptText";
import GameEnd from "./GameEnd";

//TODO: 
//fix backwards in game navigation - kind of working: can go back but turn direction not dynamic
// styling - an ongoing process
// have narration pull from game obj
// persist narration to game obj

 // TODO: STRETCH'
    // non-goal path lengths greater than 1
    // stringPath
    // travel orientation/direction (persist to game object)

// const defaultPassages = [
//     {
//         "id": 1,
//         "nav-text": "a torchlit path",
//         "narration-text": "torchlit path",
//         "initial-travel-text": [1, 3, 4, 5],
//         "return-travel-text": [1, 2, 3, 4, 5]
//     }
// ]

function Game ({ isCurGame, updateIsCurGame, curGameInfo, map, updateCurGameInfo, updateMap, passages, restartGame, contentLoaded, displayMessagePopup }) {
    //#region CONFIRMED

    const [menuOpen, setMenuOpen] = useState(false)
    const [itemsOpen, setItemsOpen] = useState(false)
    const [endType, setEndType] = useState('');
    const [minoEngaged, setMinoEngaged] = useState(false)

    const {curLocation, goalPath, minoLocation, minoThreat, playerInfo, foundTheseus, minoThreatMax, minoCalmed, minoCooldown} = curGameInfo

    useEffect(() =>{
        if(endType){endGame()}
    }, [endType])

    function findTheseus(){
        updateCurGameInfo({
            playerInfo : {
                hasTheseus: true
            },
            foundTheseus : true
        })
    }

    function getIsWithMinotaur(path) {
        const location = path || curLocation[0];
        return minoLocation[0] === location;
    }

    function endGame(){

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
        
        updateIsCurGame(false)
    }

    //#endregion


    function handleToggleMenu(){
        setMenuOpen(!menuOpen)
    }
    
    function handleToggleItems(){
        setItemsOpen(!itemsOpen)
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
        let updatedMap = [];

        if (newRoom.path.length > curLocation[0].length) {
            console.log('update path northward');
            updatedMap = map
                .map( room => room.path === curLocation[0]
                    ? newRoom.path.endsWith("0") ? {...room, westPassageVisited: true} : {...room, eastPassageVisited: true}
                    : room);
        // if travelling southily
        } else {
            console.log('update path southward');
            updatedMap = map
                .map(room => room.path === curLocation[0]
                    ? {...room, southPassageVisited: true}
                    : room)
        }
        console.log(updatedMap);
        
        // set destination room to visited in state
        updatedMap = updatedMap.map(room => room.path === curLocation[0] ? {...room, roomVisited: true} : room)

        // update map
        updateMap(updatedMap);

        const newLocation = [
            newRoom.path,
            curLocation[0]
        ]

        const newEntryDirection = getEntryDirection(newLocation);

        let newMinoCalmed = minoCalmed;
        let newMinoCooldown = minoCooldown;
        let newMinoThreat = minoThreat;
        let newMinoLocation = minoLocation;

        // if minotaur is calmed decrement cooldown
        if (minoCalmed) {
            newMinoCooldown --;
            newMinoCalmed = newMinoCooldown > 0 ? true : false;

        } 

        // otherwise, handle movement/encounters
        if (!newMinoCalmed) {
            // if in room with Minotaur:
            if (getIsWithMinotaur(curLocation[0])) {
                // if entering room with Theseus for first time
                if (newLocation[0] === goalPath && !playerInfo.hasTheseus) {
                    // threat level resets, and minotaur does not follow you in
                    newMinoThreat = 0;
                } else {
                    // increment mino threat
                    newMinoThreat = minoThreat + 1
                    // updateCurGameInfo({minoThreat: newMinoThreat})
        
                    // if threat level is 3 or greater
                    if (newMinoThreat > minoThreatMax) {
                        // Y: you die
                        setEndType("caught")
                    } else {
                        // N: minotaur follows you & ENGAGE
                        newMinoLocation = newLocation;
                        // updateCurGameInfo({minoLocation: newLocation})
                        console.log('set minoLocation to:', newLocation);
                        // setMinoEngaged(true);
                    }
                }
            
            // if moving to room with Minotaur
            } else if (getIsWithMinotaur(newLocation[0])) {
                // ENGAGE
                setMinoEngaged(true);
                console.log('minotaur engaged because moving to his location at:', newLocation[0]);
    
                // else
            } else {
                // minotaur moves
                newMinoLocation = getNextMinoLocation();
                // updateCurGameInfo({minoLocation: newMinoLocation})
    
                // if movement puts him in room with you
                if (newLocation[0] === newMinoLocation[0]) {
                    // Y: ENGAGE
                    setMinoEngaged(true);
                    console.log('minotaur engaged because both moving to new location at:', newLocation[0]);
                }
            }
        }



        updateCurGameInfo({
            ...curGameInfo,
            curLocation : newLocation,
            entryDirection : newEntryDirection,
            minoThreat: newMinoThreat,
            minoLocation: newMinoLocation,
            minoCalmed: newMinoCalmed,
            minoCooldown: newMinoCooldown
        })
    }

    function sootheMino() {
        setMinoEngaged(false);
        updateCurGameInfo({
            ...curGameInfo,
            minoThreat: 0,
            minoCalmed: true
        })
    }

    function getNextMinoLocation() {
        // get minoLocation room
        const currentMinoRoom = map.find(room => room.path === minoLocation[0]);

        // get array of existing paths (unless goal path)
        const availablePaths = [];
        currentMinoRoom.westPassageType && availablePaths.push(currentMinoRoom.path + '0');
        currentMinoRoom.eastPassageType && availablePaths.push(currentMinoRoom.path + '1');
        currentMinoRoom.southPassageType && availablePaths.push(currentMinoRoom.path.slice(0, -1));

        const validPaths = availablePaths.filter(path => path !== goalPath);

        // pick/return random path from available
        const nextMinoPath = validPaths[Math.floor(Math.random()*validPaths.length)];

        const newMinoLocation = [nextMinoPath, minoLocation[0]];

        return newMinoLocation;
    }

    return (
        <div className="game">
            <h1>Ariadne</h1>
            {!contentLoaded
                ? <h1>Loading...</h1>
                : endType
                    ? <GameEnd endType={endType}/>
                    : foundTheseus
                        ? <Theseus curLocation={curLocation} updateCurGameInfo={updateCurGameInfo} curGameInfo={curGameInfo} displayMessagePopup={displayMessagePopup}/> 
                        : <>{minoEngaged
                            ? <Minotaur curGameInfo={curGameInfo} minoEngaged={minoEngaged} setMinoEngaged={setMinoEngaged} setEndType={setEndType} updateCurGameInfo={updateCurGameInfo} sootheMino={sootheMino} /> 
                            : <>
                                <PromptText map={map} curGameInfo={curGameInfo} passages={passages} getIsWithMinotaur={getIsWithMinotaur} />
                                {/* <Actions /> */}
                                <Navigation endGame = {endGame} updateCurRoom={updateCurRoom} curGameInfo={curGameInfo} map={map} setEndType={setEndType} playerInfo={playerInfo} findTheseus={findTheseus} setMinoEngaged={setMinoEngaged} getIsWithMinotaur={getIsWithMinotaur} />
                            </>}
                            <div className="game-buttons">
                                <Menu menuOpen={menuOpen} handleToggleMenu={handleToggleMenu} startNewGame={restartGame}/>
                                <ItemsWindow itemsOpen={itemsOpen} handleToggleItems={handleToggleItems} />
                            </div>
                        </>
            }
        </div>
    );
}

export default Game;



    //#region HIDE


    //#region State and Variable Declarations
    // const [patchAllowed, setPatchAllowed] = useState(false)

    

    // if there is no current game, start one
    // useEffect(() => {
    //     if (!isCurGame) {
    //         //console.log()
    //         startNewGame()
    //     } else {
    //         loadCurGame()
    //     }
    // }, [])
    
    // useEffect (() => {
    //     if (goalPath.length > 1)
    //     {generateMap(goalPath);}
    // }, [goalPath])
    
    // useEffect(() => {
    //     patchCurGameStatus();
    // }, [curGameInfo, map, goalPath])
    

    
    //#endregion


    //#region New Game Functions 
    
    // function startNewGame() {
    //     console.log("New Game Started!");
    //     clearCurrentGameInDb()
    //         .then(() => generateGoalPath())
    //     updateIsCurGame(true);
    //     setPatchAllowed(true)
    //     //TODO: put logic here for starting a new game
    // }

    // function loadCurGame(){
    //     console.log("loading old game!")
    //     fetch(`http://localhost:3001/current-game`)
    //     .then( res => res.json())
    //     .then( data => {
    //         const actualData = data[0]
    //         //console.log(data[0])
    //         setMap(actualData.map)
    //         setGoalPath(actualData.goalPath)
    //         setCurGameInfo({
    //             curLocation: actualData.curLocation,
    //             stringPath: actualData.stringPath,
    //             minoLocation: actualData.minoLocation,
    //             itemsArray: actualData.itemsArray,
    //             playerInfo: actualData.playerInfo,
    //         })
    //         //console.log(data)
    //         setPatchAllowed(true)
    //     })
    //     .catch( error => console.log(error.message));
    // }
    
    // function generateGoalPath() {
    //     let path = "0";
    //     for (let i = 0; i < goalPathLength; i++) {
    //         path += Math.round(Math.random());
    //     }

    //     console.log('goal path:', path)
    //     setGoalPath(path)
    // }

    // function generateMap() {

    //     const mapRooms = [];

    //     const entranceRoom = {
    //         path: '0',
    //         type: 'entrance',
    //         roomVisited: false,
    //         westPassageType: getRandomPassageType(),
    //         eastPassageType: getRandomPassageType(),
    //         southPassageType: "exit",
    //         westPassageVisited: false,
    //         eastPassageVisited: false,
    //         southPassageVisited: true,
    //         onGoalPath: true
    //     }

    //     mapRooms.push(entranceRoom);
    //     addRoomsTo(entranceRoom);

    //     setMap(mapRooms)

    //     function addRoomsTo(fromRoom) {
    //     if (fromRoom.westPassageType) {
    //         addNewRoomToMap('0');
    //     }
    //     if (fromRoom.eastPassageType) {
    //         addNewRoomToMap('1');
    //     }


    //         function addNewRoomToMap(turn) {
    //             const path = fromRoom.path + turn;
    //             let westPassage
    //             let eastPassage

    //             let roomType = ''
    //             if (path===goalPath) {
    //                 roomType = 'theseus'
    //                 westPassage = null
    //                 eastPassage = null
    //             }
    //             else {
    //                 westPassage = getPassageType(path, path+'0');
    //                 eastPassage = getPassageType(path, path+'1');
    //                 roomType="random"
    //             }

    //             const newRoom = {
    //             path: path,
    //             type: roomType,
    //             roomVisited: false,
    //             westPassageType: westPassage,
    //             eastPassageType: eastPassage,
    //             southPassageType: turn === "0" ? fromRoom.westPassageType : fromRoom.eastPassageType,
    //             westPassageVisited: false,
    //             eastPassageVisited: false,
    //             southPassageVisited: false,
    //             onGoalPath: isOnGoalPath(path)
    //             }

    //             mapRooms.push(newRoom);
    //             addRoomsTo(newRoom)
    //         }
    //     }

    //     function isOnGoalPath(path) {
    //         return goalPath.startsWith(path);
    //     }

    //     function getPassageType(currentPath, destinationPath) {
    //         if (isOnGoalPath(destinationPath)) {
    //             return getRandomPassageType();
    //         } else {
    //             if (isOnGoalPath(currentPath)) {
    //             return getRandomPassageType();
    //             } else {
    //             return "";
    //             }
    //         }
    //     }
        
    //     function getRandomPassageType() {
    //         let passageType = passageTypeArray[Math.floor(Math.random()*passageTypeArray.length)];
    //         if (passageType === "exit") {
    //             // console.log('----passage was an exit');
    //             passageType = getRandomPassageType();
    //             // console.log('----passage was changed to', passageType);
    //         }
    //         return passageType
    //     }
    // }

    //#endregion

    //#region Helper Functions

        //ENDGAME 
    //Display info to player
    //send game data to mems
    //reset game data (optional)
    //send player to memories (give choice)
    //change iscurgame to false




    // function clearCurrentGameInDb() {
    //     return (
    //     fetch(`http://localhost:3001/current-game/1`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json"
    //         },
    //         body: JSON.stringify(defaultGameObject)
    //     })
    //         .then( res => res.json())
    //         .then( data => {console.log('reset game obj in database')})
    //         .catch( error => console.log(error.message)) )
    // }

    // function patchCurGameStatus(){
    //     if (patchAllowed)
    //     {
    //     console.log('patching')
    //     const patchGameObj = {
    //         ...curGameInfo,
    //         goalPath: goalPath,
    //         map: map
    //     }
    //     fetch(`http://localhost:3001/current-game/1`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify( patchGameObj  )
    //     })
    //     .then( res => res.json())
    //     //.then( data => console.log(data))
    //     .catch( error => console.log(error.message));}
    // }

    // function updateGameInfo(newInfoObj){
    //     setCurGameInfo({
    //         ...curGameInfo,
    //         [newInfoObj.key] : newInfoObj.value
    //     })
    // }

    //#endregion

    //#endregion
