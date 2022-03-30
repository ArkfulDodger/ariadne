import OptionBox from "./OptionBox"

function Navigation({curGameInfo, map, updateCurRoom, setEndType}) {

    const {curLocation, stringPath} = curGameInfo
    const curRoom = map.find(room => room.path === curLocation[0]);
    const curRoomNavOptions= [
        {
            choiceText : "go left",
            flavorText : curRoom.westPassageType
        },
        {
            choiceText: "go right",
            flavorText: curRoom.eastPassageType
        },
        {
            choiceText: "go back to last room",
            flavorText: curRoom.southPassageType + "🧶"
        }
    ]

    function updateRoomByPath(newRoomPath){
        
        const newRoom = map.find(room => {
            return room.path === newRoomPath
        })
        updateCurRoom(newRoom)
    }
    //so now, we need to update the current room to the room
    //with the consolelogged path

    function handleClick(event){
        
        switch (event.target.innerText) {
            case "go left": updateRoomByPath(curRoom.path + "0");
                break;
            case "go right": updateRoomByPath(curRoom.path + "1");
                break;
            case "go back to last room": 
                if (curRoom.path === "0"){updateRoomByPath("0")}
                else {updateRoomByPath(curLocation[1])}
                // else {updateRoomByPath(curRoom.path.slice(0, curRoom.path.length - 1))}
                break;
        }
    }

    let roomFlavor = ''
    if (curRoom.type === 'theseus') {
        roomFlavor = 'You found Theseus!'
        setEndType('win')
    }
    else {roomFlavor = `You find yourself in room ${curLocation[0]}`}
    return (
        <div className="navigation">
            <h2>{roomFlavor}</h2>
            <OptionBox handleClick={handleClick} options={curRoomNavOptions}/>
        </div>
    )
}
export default Navigation