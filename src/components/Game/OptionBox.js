import Option from "./Option"

function OptionBox(props) {
    const {options} = props
    const {choice1, choice1Flavor, choice2, choice2Flavor} = options
    console.log(options)
    // const choice1 = "go left"
    // const choice2 = "go right"
    return (
        <div>
            <h3>OPTIONS</h3>
            <h4> {choice1Flavor}</h4>
            <Option choice={choice1} />
            <h4>{choice2Flavor}</h4>
            <Option choice={choice2} />
        </div>
    )
}
export default OptionBox