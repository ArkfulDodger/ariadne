import { Link } from "react-router-dom";

function GameEnd({endType}) {

    console.log("in GameEnd", endType)

    let endGameMessage = ''
    let endImgSrc = ''

    switch (endType) {
        case 'win' :
            endGameMessage = "You rescued Theseus and escape the Labyrinth together"
            endImgSrc = "https://ak.picdn.net/shutterstock/videos/1052179024/thumb/1.jpg?ip=x480"
            break;
        case 'slay' : 
        endGameMessage = "You defeated the mighty Minotaur"
        endImgSrc = "https://tripanthropologist.com/wp-content/uploads/2021/02/mosaic-of-theseus-and-minotaur.jpg"
        break;
        case 'leave' :
        endGameMessage = "You left Theseus to fend for himself, and escaped the maze"
        endImgSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Theseus_and_the_Minotaur.gif/170px-Theseus_and_the_Minotaur.gif"
        break;
        case 'die' :
            endGameMessage = `You are gored to death by the minotaur... It's not all bad - Hermes showed up to take you to the underworld`
            endImgSrc="https://serenademagazine.com/wp-content/uploads/2021/07/Orpheus_and_Eurydice-header-1200x799.png"
            break;
        default: endGameMessage = "ok how did you get here?" 
    }
    
    return (
        <div className="gameEnd">
            <h2>{endGameMessage}</h2>
            <img src= {endImgSrc} />
            <div className="gameEndButtons">
                <Link to="/">Return to Main Menu</Link>  
                {/* <Link to="/play">Go to a new Labyrinth</Link> */}
                <Link to="/memories">Reflect on your Journey</Link>  
            </div>
        </div>
    )
}
export default GameEnd