import React, { useState, useEffect } from "react";
import Minotaur from "./Minotaur";
import Actions from "./Actions";
import Navigation from "./Navigation";
import Menu from "./Menu/Menu";
import ItemsWindow from "./Items/ItemsWindow";
import PromptText from "./PromptText";

//TODO for 3/29:
//have current game post whenever curGame updates
//win conditions (new component?) - get to end point - kinda done (game tells you if theseus is there, and he is in a dead end but does not trigger end game)
//instantly post to memories and take you to memories
//memories does a new fetch and renders (added fetch language)
//then backwards in game navigation - kind of working: can go back but turn direction not dynamic
//then add a bit of styling - an ongoing process


//get navigation buttons going - DONE
//move app to game - done
//setup game state -done?
//(set up options as taking an array that you iterate over) done
//comment out items, mino, etc done
//site navigation buttons done
//menu and memories should conditional render nav buttons done


//add't notes:
//state - currentGame should persist/update (ie post/patch for each option select (?) or plot point)
//for mems: push full current game + end result to db, mem page will pull from there and take what it wants
function Game ({props}) {

    const [curGameInfo, setCurGameInfo] = useState({
        curLocation: ['0', 'prevRoom'],
        curRoom: {}, //need room obj to access passagetypes
        //map: [], //also taking this out cause rendering loops
        stringPath: '0', 
        minoLocation: "00",
        itemsArray: [],
        //goalPath: '', //need separate from rest so we can generate map 
        playerInfo: {
            hasTheseus: false,
            statusEffects: {}
        }
    })

    const {curLocation} = curGameInfo

    const [goalPath, setGoalPath] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)
    const [itemsOpen, setItemsOpen] = useState(false)
    const [passageTypeArray, setPassageTypeArray] = useState([])
    const [map, setMap] = useState([])
    
    //fetch to set up passage types, then also generate the goal path and the game map on load
    //eventually this will pull both passage types and currGame if there is one...
    useEffect(() => {
        fetch('http://localhost:3000/passage-types')
        .then(resp => resp.json())
        .then(data => {
            setPassageTypeArray(data)
        })
        .then ( () => {
            generateGoalPath()})
    }, [])

    useEffect (() => generateMap(goalPath), [goalPath])

    function handleToggleMenu(){
        setMenuOpen(!menuOpen)
    }
    function handleToggleItems(){
        setItemsOpen(!itemsOpen)
    }

    function patchCurGameStatus(){
        const patchGameObj = {
            ...curGameInfo,
            goalPath: goalPath,
            map: map
        }
        fetch(`http://localhost:3000/current-game`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                patchGameObj 
            })
        })
        .then( res => res.json())
        .then( data => console.log(data))
        .catch( error => console.log(error.message));
    }

    function updateGameInfo(newInfoObj){
        setCurGameInfo({
            ...curGameInfo,
            [newInfoObj.key] : newInfoObj.value
        })
    }

    const goalPathLength = 5;

    function generateGoalPath() {
        let path = "0";
        for (let i = 0; i < goalPathLength; i++) {
            path += Math.round(Math.random());
        }

        // const goalPathObj ={
        //     key: "goalPath",
        //     value: "0101" //path
        // }
        console.log(path)
        setGoalPath(path)
    }

    function printAsTurns(binaryPath) {
        let turnPath = "entrance";
        for (let i = 1; i < binaryPath.length; i++) {
        console.log(binaryPath[i]);
        turnPath += binaryPath[i] === '0' ? " left" : " right";
        }
        return turnPath;
    }

    function generateMap() {

        const mapRooms = [];

        const entranceRoom = {
            path: '0',
            type: 'entrance',
            leftPassageType: getRandomPassageType(),
            rightPassageType: getRandomPassageType(),
            returnPassageType: "exit",
            onGoalPath: true
        }

        updateGameInfo({
            key: "curRoom",
            value: entranceRoom
        })

        mapRooms.push(entranceRoom);
        addRoomsTo(entranceRoom);

        console.log("generating map", mapRooms);
        setMap(mapRooms)

        function addRoomsTo(fromRoom) {
        if (fromRoom.leftPassageType) {
            addNewRoomToMap('0');
        }
        if (fromRoom.rightPassageType) {
            addNewRoomToMap('1');
        }


            function addNewRoomToMap(turn) {
                const path = fromRoom.path + turn;
                let leftPassage
                let rightPassage

                let roomType = ''
                if (path===goalPath) {
                    roomType = 'theseus'
                    leftPassage = null
                    rightPassage = null
                }
                else {
                    leftPassage = getPassageType(path, path+'0');
                    rightPassage = getPassageType(path, path+'1');
                    roomType="random"
                }

                const newRoom = {
                path: path,
                type: roomType,
                leftPassageType: leftPassage,
                rightPassageType: rightPassage,
                returnPassageType: turn === "0" ? fromRoom.leftPassageType : fromRoom.rightPassageType,
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
        const passageType = passageTypeArray[Math.floor(Math.random()*passageTypeArray.length)]
        return passageType
        }

    }

    function updateCurRoom(newRoom){
        setCurGameInfo({
            ...curGameInfo,
            curLocation : [
                newRoom.path,
                curLocation[1]
            ],
            curRoom : newRoom,
        })
    }

    return (
        <div>
            <h1>
                This is the game
            </h1>
            <PromptText />
            {/* <Minotaur />
            <Actions /> */}
            <Navigation updateCurRoom={updateCurRoom} curGameInfo={curGameInfo} map={map}/>
            <div className="buttons">
                <Menu menuOpen={menuOpen} handleToggleMenu={handleToggleMenu}/>
                <ItemsWindow itemsOpen={itemsOpen} handleToggleItems={handleToggleItems} />
            </div>
        </div>
    );
}

export default Game;