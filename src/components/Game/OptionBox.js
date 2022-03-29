import Option from "./Option"

function OptionBox({options}) {
    const renderedOptions = options.map(option => {
        return (
            <div className="option">
                <h4> {option.flavorText} </h4>
                <Option choice = {option.choiceText} />
            </div>
        )
    })

    return (
        <div className="optionBox">
            <h3>OPTIONS</h3>
            {renderedOptions}
        </div>
    )
}
export default OptionBox