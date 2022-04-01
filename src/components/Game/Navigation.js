import OptionBox from "./OptionBox"

function Navigation({findTheseus, minoIsEnabled, setMinoIsHere, curGameInfo, map, updateCurRoom, setEndType, playerInfo, items, displayMessagePopup}) {

    const {curLocation, stringPath, entryDirection, itemsArray} = curGameInfo
    const curRoom = map.find(room => room.path === curLocation[0]);

    //for future: create a const for passageIcons, interpolate into each after testing player conditions etc
    // get passages and directions
    const westNav = curRoom.westPassageType
        ? {
            flavorText: curRoom.westPassageType,
            path: curRoom.path + '0'
        }
        : {}
    const eastNav = curRoom.eastPassageType
    ? {
        flavorText: curRoom.eastPassageType,
        path: curRoom.path + '1'
    }
    : {}
    
    const southNav = curRoom.southPassageType
    ? !playerInfo.hasTheseus
        ? {flavorText: curRoom.southPassageType + '🧶',
            path: curRoom.path.slice(0,-1)}
        : {flavorText: curRoom.southPassageType,
            path: curRoom.path.slice(0,-1)}
            
    : {}

    // // create nav options
    let leftNav = { choiceText : "go left" };
    let rightNav = { choiceText: "go right" };
    let backNav = { choiceText: "go back to last room" };

    // assign passage types to room options based on entryDirection
    switch (entryDirection) {
        case 'south':
            leftNav = {...leftNav, ...westNav}
            rightNav = {...rightNav, ...eastNav}
            backNav = {...backNav, ...southNav}
            break;
        
        case 'east':
            leftNav = {...leftNav, ...southNav}
            rightNav = {...rightNav, ...westNav}
            backNav = {...backNav, ...eastNav}
            break;
        
        case 'west':
            leftNav = {...leftNav, ...eastNav}
            rightNav = {...rightNav, ...southNav}
            backNav = {...backNav, ...westNav}
        default:
            break;
    }

    // set room options
    const curRoomNavOptions = [];
    if (leftNav.flavorText) {
        curRoomNavOptions.push(leftNav)
    }
    if (rightNav.flavorText) {
        curRoomNavOptions.push(rightNav)
    }
    curRoomNavOptions.push(backNav);

    function updateRoomByPath(newRoomPath){
        if (!newRoomPath) {
            if (!playerInfo.hasTheseus) {
                setEndType("leave")
            } else {
                setEndType("win")
            }
        } else {
            const newRoom = map.find(room => {
                return room.path === newRoomPath
            })
            updateCurRoom(newRoom)
        }
    }

    function handleClick(event){
        switch (event.target.innerText) {
            case "go left": updateRoomByPath(leftNav.path);
                break;
            case "go right": updateRoomByPath(rightNav.path);
                break;
            case "go back to last room": 
                updateRoomByPath(backNav.path)
                break;
        }
    }

    function checkForItem(){
        console.log("checking for item", curRoom.itemInRoom)
        if (curRoom.itemInRoom.length > 0){
            const item = curRoom.itemInRoom[0]
            console.log("ITEM from nav", curRoom.itemInRoom)
            //displayMessagePopup(item.type)
            //updateCurGameInfo({
                //itemsArray : itemsArray.push(item)
            //})
        }
    }

    checkForItem()

    let roomFlavor = "";
    if (curRoom.type === 'theseus' && !playerInfo.hasTheseus) {
        findTheseus()
    }
    else if (curRoom.path === curGameInfo.minoLocation && minoIsEnabled) {
        setMinoIsHere(true)
    }
    else {roomFlavor = curRoomNavOptions.length > 1 ? `How do you proceed?` : 'You have reached a dead end'}


    return (
        <div className="navigation">
            <h2>{roomFlavor}</h2>
            <h3>Room: {curRoom.path}</h3>
            <OptionBox handleClick={handleClick} options={curRoomNavOptions}/>
        </div>
    )
}
export default Navigation