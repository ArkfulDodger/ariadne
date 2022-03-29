import Option from "./Option"

function OptionBox({options, handleClick}) {
    const renderedOptions = options.map(option => {
        if (option.flavorText){
        return (
            <div className="option">
                <h4> {option.flavorText} </h4>
                <Option handleClick={handleClick} choice = {option.choiceText} />
            </div>
        )}
        else {return null}
    })

    return (
        <div className="optionBox">
            <h3>OPTIONS</h3>
            {renderedOptions}
        </div>
    )
}
export default OptionBox