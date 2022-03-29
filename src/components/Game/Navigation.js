import OptionBox from "./OptionBox"

function Navigation({options}) {

    //options.choice0 = "go left"
    //options.choice1 = "go right"

    return (
        <div>
            <h2>navigation page</h2>
            <OptionBox options={options}/>
        </div>
    )
}
export default Navigation