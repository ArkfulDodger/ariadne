import OptionBox from "./OptionBox"

function Navigation({curGameInfo, map}) {

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
            flavorText: "🧶"
        }
    ]

    function searchForRoomByPath(newRoomPath){
        const newRoom = map.filter(room => {
            console.log(room)
            return room.path === newRoomPath
        })
        console.log(newRoom)
    }
    //so now, we need to update the current room to the room
    //with the consolelogged path

    function handleClick(event){
        switch (event.target.innerText) {
            case "go left": searchForRoomByPath(curRoom.path + "0");
            break;
            case "go right": searchForRoomByPath(curRoom.path + "1");
            break;
            case "go back to last room": console.log("go back")
            break;
        }
    }

    return (
        <div>
            <h2>{curLocation[0]}</h2>
            <OptionBox handleClick={handleClick} options={curRoomNavOptions}/>
        </div>
    )
}
export default Navigation