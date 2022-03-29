import OptionBox from "./OptionBox"

function Navigation({curGameInfo, options}) {

    console.log(curGameInfo)

    //options.choice0 = "go left"
    //options.choice1 = "go right"
    //go back

    return (
        <div>
            <h2>navigation page</h2>
            <OptionBox options={options}/>
        </div>
    )
}
export default Navigation