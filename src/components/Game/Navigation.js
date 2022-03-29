import OptionBox from "./OptionBox"

function Navigation({props}) {

    const options = {
        choice1: "go left",
        choice1Flavor: "passage-type",
        choice2: "go right",
        choice2Flavor: "passage-type"
    }

    return (
        <div>
            <h2>navigation page</h2>
            <OptionBox options={options}/>
        </div>
    )
}
export default Navigation