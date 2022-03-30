import OptionBox from "./OptionBox"

function Navigation({curGameInfo, map, updateCurRoom, patchCurGameStatus}) {

    const {curRoom, curLocation, stringPath} = curGameInfo
    const curRoomNavOptions= [
        {
            choiceText : "go left",
            flavorText : curRoom.leftPassageType
        },
        {
            choiceText: "go right",
            flavorText: curRoom.rightPassageType
        },
        {
            choiceText: "go back to last room",
            flavorText: curRoom.returnPassageType + "🧶"
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
            else {updateRoomByPath(curRoom.path.slice(0, curRoom.path.length - 1))}
            break;
        }
        patchCurGameStatus() //always one room behind
    }

    let roomFlavor = ''
    if (curRoom.type === 'theseus') {roomFlavor = 'You found Theseus!'}
    else {roomFlavor = `You find yourself in room ${curLocation[0]}`}
    return (
        <div>
            <h2>{roomFlavor}</h2>
            <OptionBox handleClick={handleClick} options={curRoomNavOptions}/>
        </div>
    )
}
export default Navigation