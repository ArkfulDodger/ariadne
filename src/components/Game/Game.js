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
//then make her pretty


//move app to game - done
//setup game state -done?
//(set up options as taking an array that you iterate over) done
//comment out items, mino, etc done
//site navigation buttons done
//menu and memories should conditional render nav buttons done

function Game ({props}) {

    const [curGameInfo, setCurGameInfo] = useState({
        curLocation: ['0', undefined],
        map: [],
        minoLocation: "00",
        itemsArray: [],
        goalPath: '0101',
        playerInfo: {
            hasTheseus: false,
            statusEffects: null
        }
    })

    const [menuOpen, setMenuOpen] = useState(false)
    const [itemsOpen, setItemsOpen] = useState(false)
    const [passageTypeArray, setPassageTypeArray] = useState([])


    function handleToggleMenu(){
        setMenuOpen(!menuOpen)
    }
    function handleToggleItems(){
        setItemsOpen(!itemsOpen)
    }
    useEffect(() => {
        fetch('http://localhost:3000/passage-types')
        .then(resp => resp.json())
        .then(data => setPassageTypeArray(data))
        generateGoalPath()
    }, [])

    //getPassageTypeArray()

    function updateGoalPath(newGoal){
        console.log("hi")
        setCurGameInfo({
            ...curGameInfo,
            goalPath : newGoal
        })
    }

    //state - curLocation is the [curIndex and prevIndex] and where you came from, map(has chamber info), minotaur location, itemsArray, 
    //state cont - playerInfo - is theseus, aid objects, injuries etc
    //state - currentGame that persists/updates, goalPath
    //state curGame cont - string path, map 
    //for mems: items collected, rooms visited (action taken there/result), found theseus?, minotaurencountersarray
    //for mems: success? (theseus)
    //currgame needs basically anything in state other than isItemWindow 
    //post to json like all the time
    

    const goalPathLength = 5;

    function generateGoalPath() {
        // let path = "0";
        // for (let i = 0; i < goalPathLength; i++) {
        //   path += Math.round(Math.random());
        // }
        // return path;

        // const goalPathObj ={
        //     key: "goalPath",
        //     value: "0101" //path
        // }
        updateGoalPath("0101")

        //return "0101";
    }

    function printAsTurns(binaryPath) {
        let turnPath = "entrance";
        for (let i = 1; i < binaryPath.length; i++) {
        console.log(binaryPath[i]);
        turnPath += binaryPath[i] === '0' ? " left" : " right";
        }
        return turnPath;
    }

    generateMap(curGameInfo.goalPath);

    function generateMap(goalPath) {
        //TODO: account for goal path end.
        // if path to room is goal path, make dead end and set type 
        console.log(goalPath);

        const mapRooms = [];

        const entranceRoom = {
        path: '0',
        type: 'entrance',
        leftPassageType: getRandomPassageType(),
        rightPassageType: getRandomPassageType(),
        returnPassageType: "exit",
        onGoalPath: true
        }

        mapRooms.push(entranceRoom);
        addRoomsTo(entranceRoom);
        console.log(mapRooms);

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
        //TEMP - my db was acting funky so this is here an in db.json
        // const passageTypeArray = [
        //     "a torchlit path",
        //     "a dark stairwell",
        //     "a dusty hallway",
        //     "a heavy wooden door",
        //     "a smooth stone cavern",
        //     "a twisting corridor",
        //     "a mossy, but climbable wall",
        //     "an eerie open room"
        // ]
        //console.log(passageTypeArray)
        const passageType = passageTypeArray[Math.floor(Math.random()*passageTypeArray.length)]
        return passageType
        }

    }

    const curRoomNavOptions= [
        {
            choiceText : "go left",
            flavorText : "a dark hallway"
        },
        {
            choiceText: "go right",
            flavorText: "a shadowy corridor"
        }
    ]

    return (
        <div>
            <h1>
                This is the game
            </h1>
            {/* <Minotaur />
            <Actions /> */}
            <Navigation options={curRoomNavOptions}/>
            <Menu menuOpen={menuOpen} handleToggleMenu={handleToggleMenu}/>
            {/* <ItemsWindow itemsOpen={itemsOpen} handleToggleItems={handleToggleItems} /> */}
        </div>
    );
}

export default Game;