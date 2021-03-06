import {useState} from "react"

function Theseus({updateCurGameInfo, curLocation, curGameInfo, displayMessagePopup}) {
    const [isOpen, setIsOpen] = useState(true)

    function closeTheseus(event){
        setIsOpen(false)
        updateCurGameInfo({
            foundTheseus: false
        })
        displayMessagePopup('broken-string')
    }

    //const returnPassageType = curGameInfo.map.find(room => room.path === curLocation[0]).southPassageType
        const imgSrc = "http://www.maicar.com/GML/000Images/tim/theseus0819.jpg"
    //cur game state, current chamber - entry direction, grab passage type
        return (
        <>
            
            { isOpen ? 
                <div className="theseus">
                    <h3>YOU FOUND YOUR HIMBO!</h3>
                    <img src={imgSrc} alt="a statue of Theseus and Ariadne" />
                    <p>You make your way into a dark chamber.</p>
                    <p>It takes a moment for your eyes to adjust, but even before you can take a look around, you hear something incredible.</p>
                    <p>"ARIADNE", Theseus cries, "I'm so glad to see you."</p>
                    <p>He tells you how he lost his way in the maze, after the string you gave him somehow became tangled and then torn, how he lost is sword in a tussle with the Minotaur, and has been hiding in the passageways ever since.</p>
                    <p>Having found your beloved, you happily tell him that you have brought a string of your own to guide you both back out of the maze.</p>
                    <p>You move together, still scared by your surrounds, but greatly relieved to have each other and a guideline out of this place.</p>
                    <button onClick={closeTheseus}>Turn back to find your way out</button> 
                </div> :
                null}
        </>
    )
}
export default Theseus