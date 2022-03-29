import OptionBox from "./OptionBox"

function Navigation({curGameInfo, options}) {

    const {curRoom, map, stringPath} = curGameInfo
    console.log("in Nav: ", curGameInfo)

    return (
        <div>
            <h2>{stringPath}</h2>
            <OptionBox options={options}/>
        </div>
    )
}
export default Navigation