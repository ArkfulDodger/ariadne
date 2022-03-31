import OptionBox from "./OptionBox"
import {useState} from 'react';

const Minotaur = ({setMinoIsHere, setEndType}) => {

    const [isOpen, setIsOpen] = useState(true)

    function closeMino(event){
        setIsOpen(false)
    }
    const minoResponseOptions= [
        {
            choiceText : "FLEE",
            flavorText : "Run away as fast as you can"
        },
        {
            choiceText: "FIGHT",
            flavorText: "Stand your ground and face the monster"
        },
        {
            choiceText: "speak",
            flavorText: "try to reach with your half-brother"
        }
    ]
    
    function handlePlayerResponse(event){
        console.log("player chose ", event.target.innerText)
        //determine end type or set is mino to false to run away
        switch (event.target.innerText) {
            case "FIGHT" : setEndType("die")
            break;
            case "speak" : setEndType("die")
            break;
            case "FLEE" : console.log("RUN AWAY")
        }
        //closeMino()
        setMinoIsHere(false)
    }
    const minotaurURL = "https://www.pcgamesn.com/wp-content/uploads/2018/10/Assassins-Creed-Odyssey-Minotaur-900x507.jpg"
    return (
        <div className="minotaur">
            {isOpen ? 
            <>
                <h3> The minotaur has found you</h3>
                <img src={minotaurURL} alt="an image of a threatening Minotaur, holding an axe"/>
                <OptionBox options={minoResponseOptions} handleClick={handlePlayerResponse}/>
            </> 
            :
            null
            }
        </div>
    )
}
export default Minotaur