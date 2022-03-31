import {useState} from "react"

function Theseus({updateCurGameInfo, displayMessagePopup}) {
    const [isOpen, setIsOpen] = useState(true)

    function closeTheseus(event){
        setIsOpen(false)
        updateCurGameInfo({
            foundTheseus: false
        })
        displayMessagePopup('broken-string')
    }
        const imgSrc = "http://www.maicar.com/GML/000Images/tim/theseus0819.jpg"
    return (
        <>
            
            { isOpen ? 
                <div className="theseus">
                    <h3>YOU FOUND YOUR HIMBO, good job</h3>
                    <img src={imgSrc} alt="a statue of Theseus and Ariadne" />
                    <p>fun story</p>
                    <button onClick={closeTheseus}>Turn back to find your way out</button> 
                </div> :
                null}
        </>
    )
}
export default Theseus