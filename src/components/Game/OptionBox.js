import Option from "./Option"

function OptionBox({options}) {
    const {choice0, choice0Flavor, choice1, choice1Flavor} = options
    // console.log(options)
    // const choice1 = "go left"
    // const choice2 = "go right"
    return (
        <div className="optionBox">
            <h3>OPTIONS</h3>
            <div className="option">
                <h4> {choice0Flavor}</h4>
                <Option choice={choice0} />
            </div>
            <div className="option">
                <h4>{choice1Flavor}</h4>
                <Option choice={choice1} />
            </div>
        </div>
    )
}
export default OptionBox