import OptionBox from "./OptionBox"

function Navigation({curGameInfo}) {

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

    function handleClick(event){
        //console.log(event.target.innerText)
        switch (event.target.innerText) {
            case "go left": console.log(curRoom.path + "0");
            break;
            case "go right": console.log(curRoom.path + "1");
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