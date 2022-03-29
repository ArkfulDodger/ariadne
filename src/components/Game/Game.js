import React, { useState, useEffect } from "react";
import Minotaur from "./Minotaur";
import Actions from "./Actions";
import Navigation from "./Navigation";
import Menu from "./Menu/Menu";
import ItemsWindow from "./Items/ItemsWindow";
//TODO for 3/29:
//get navigation buttons going
//have current game post whenever curGame updates
//win conditions (new component?) - get to end point
//instantly post to memories and take you to memories
//memories does a new fetch and renders (added fetch language)
//then backwards in game navigation
//then add a bit of styling


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
        map: [],
        stringPath: '0', 
        minoLocation: "00",
        itemsArray: [],
        //goalPath: '', //need separate from rest so we can generate map 
        playerInfo: {
            hasTheseus: false,
            statusEffects: {}
        }
    })

    const [goalPath, setGoalPath] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)
    const [itemsOpen, setItemsOpen] = useState(false)
    const [passageTypeArray, setPassageTypeArray] = useState([])
    
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

    function updateGameInfo(newInfoObj){
        setCurGameInfo({
            ...curGameInfo,
            [newInfoObj.key] : newInfoObj.value
        })
    }

    const goalPathLength = 5;

    function generateGoalPath() {
        // let path = "0";
        // for (let i = 0; i < goalPathLength; i++) {
        //   path += Math.round(Math.random());
        // }

        // const goalPathObj ={
        //     key: "goalPath",
        //     value: "0101" //path
        // }
        setGoalPath("0101")
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
        //TODO: account for goal path end.
        // if path to room is goal path, make dead end and set type 

        const mapRooms = [];

        const entranceRoom = {
            path: '0',
            type: 'entrance',
            leftPassageType: getRandomPassageType(),
            rightPassageType: getRandomPassageType(),
            returnPassageType: "exit",
            onGoalPath: true
        }

        // console.log(goalPath)
        // console.log("in generate", entranceRoom.rightPassageType)

        updateGameInfo({
            key: "curRoom",
            value: entranceRoom
        })

        mapRooms.push(entranceRoom);
        addRoomsTo(entranceRoom);
        console.log("generating map", mapRooms);

        function addRoomsTo(fromRoom) {
        if (fromRoom.leftPassageType) {
            addNewRoomToMap('0');
        }
        if (fromRoom.rightPassageType) {
            addNewRoomToMap('1');
        }


        function addNewRoomToMap(turn) {
            const path = fromRoom.path + turn;
            const leftPassage = getPassageType(path, path+'0');
            const rightPassage = getPassageType(path, path+'1');

            const newRoom = {
            path: path,
            type: 'random',
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

    return (
        <div>
            <h1>
                This is the game
            </h1>
            {/* <Minotaur />
            <Actions /> */}
            <Navigation curGameInfo={curGameInfo} />
            <Menu menuOpen={menuOpen} handleToggleMenu={handleToggleMenu}/>
            {/* <ItemsWindow itemsOpen={itemsOpen} handleToggleItems={handleToggleItems} /> */}
        </div>
    );
}

export default Game;