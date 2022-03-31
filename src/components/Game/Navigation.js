import OptionBox from "./OptionBox"

function Navigation({curGameInfo, map, updateCurRoom, setEndType}) {
    const {curLocation, stringPath, entryDirection} = curGameInfo
    const curRoom = map.find(room => room.path === curLocation[0]);

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
    ? {
        flavorText: curRoom.southPassageType + '🧶',
        path: curRoom.path.slice(0,-1)
    }
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
            alert('trying to leave labyrinth!')
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

    let roomFlavor = ''
    if (curRoom.type === 'theseus') {
        roomFlavor = 'You found Theseus!'
        setEndType('win')
    }
    // else {roomFlavor = `You find yourself in room ${curLocation[0]}`}
    else {roomFlavor = curRoomNavOptions.length > 1 ? `How do you proceed?` : 'You have reached a dead end'}


    return (
        <div className="navigation">
            <h2>{roomFlavor}</h2>
            <OptionBox handleClick={handleClick} options={curRoomNavOptions}/>
        </div>
    )
}
export default Navigation