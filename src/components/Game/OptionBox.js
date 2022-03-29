import Option from "./Option"

function OptionBox({options, handleClick}) {
    let renderCount = 0;
    const renderedOptions = options.map(option => {
        if (option.flavorText){
            ++ renderCount
        return (
            <div className="option">
                <h4> {option.flavorText} </h4>
                <Option handleClick={handleClick} choice = {option.choiceText} />
            </div>
        )}
        else {return null}
    })

    let roomFlavor = ''

    if (renderCount === 1) {roomFlavor = 'You have reached a dead end'}
    else {roomFlavor = `You see ${renderCount} ways to leave the room:`}

    return (
        <div className="optionBox">
            <h3>{roomFlavor}</h3>
            {renderedOptions}
        </div>
    )
}
export default OptionBox