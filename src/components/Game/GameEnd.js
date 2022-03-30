import { Link } from "react-router-dom";

function GameEnd({endType}) {

    console.log("in GameEnd", endType)

    let endGameMessage = ''
    let endImgSrc = ''

    switch (endType) {
        case 'win' : 
        endGameMessage = "YOU FOUND YOUR HIMBO, good job"
        endImgSrc = "http://www.maicar.com/GML/000Images/tim/theseus0819.jpg"
        break;
        default: endGameMessage = "ok how did you get here?" 
    }
    
    return (
        <div className="gameEnd">
            <h2>{endGameMessage}</h2>
            <img src= {endImgSrc} />
            <Link to="/home">Return to Main Menu</Link>  
            {/* <Link to="/play">Go to a new Labyrinth</Link> */}
            <Link to="/memories">Reflect on your Journey</Link>  
        </div>
    )
}
export default GameEnd