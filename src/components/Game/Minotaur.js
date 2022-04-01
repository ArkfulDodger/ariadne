import OptionBox from "./OptionBox"
import {useState} from 'react';

const Minotaur = ({ curGameInfo, minoEngaged, setMinoEngaged, updateCurGameInfo, setEndType, sootheMino }) => {
    const {playerInfo: { hasTheseus }, itemsArray, minoCooldown} = curGameInfo;

    const hasSword = itemsArray.includes('sword');
    const hasLyre = itemsArray.includes('lyre');
    const hasTorch = itemsArray.includes('torch');

    const minoResponseOptions= [
        {
            choiceText : "FLEE",
            flavorText : "Run away as fast as you can"
        },
        {
            choiceText: "FIGHT",
            flavorText: `Stand your ground and face the monster${hasSword && ' with your sword'}`
        },
        {
            choiceText: `${hasLyre ? 'SOOTHE' : 'SPEAK'}`,
            flavorText: `${hasLyre ? 'play your lyre to calm your raging half-brother' : 'try to reason with your half-brother'}`
        }
    ]
    
    function handlePlayerResponse(event){
        console.log("player chose ", event.target.innerText)
        //determine end type or set is mino to false to run away
        switch (event.target.innerText) {
            case "FIGHT" :
                hasSword ? setEndType("swordfail") : setEndType("die");
                break;
            case "SPEAK" : setEndType("diplomacy")
                break;
            case "FLEE" : setMinoEngaged(false)
                break;
            case "SOOTHE" : 
                minoCooldown > 0 ? sootheMino() : setEndType("musicfail");
                break;
        }
        console.log("out of the switch")
        //setMinoIsHere(false)
        //setIsOpen(false)
    }
    const minotaurURL = "https://www.pcgamesn.com/wp-content/uploads/2018/10/Assassins-Creed-Odyssey-Minotaur-900x507.jpg"
    return (
        <div className="minotaur">
            <h3> The minotaur found you</h3>
            <img src={minotaurURL} alt="an image of a threatening Minotaur, holding an axe"/>
            <OptionBox options={minoResponseOptions} handleClick={handlePlayerResponse}/>
        </div>
    )
}
export default Minotaur