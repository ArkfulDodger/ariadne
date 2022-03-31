import Option from "./Option"
import { v4 as uuid } from "uuid";

function OptionBox({options, handleClick}) {
    const renderedOptions = options.map(option => {
        return (
            <div key={uuid()} className="option">
                <h4> {option.flavorText} </h4>
                <Option handleClick={handleClick} choice = {option.choiceText} />
            </div>
        )
    })

    return (
        <div className="optionBox">
            {renderedOptions}
        </div>
    )
}
export default OptionBox