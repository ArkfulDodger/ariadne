import { Link } from "react-router-dom";

function GameEnd({endType}) {

    console.log("in GameEnd", endType)

    let endGameMessage = ''
    let endImgSrc = ''

    switch (endType) {
        case 'win' :
            endGameMessage = "You rescued Theseus and escape the Labyrinth together"
            endImgSrc = "https://ak.picdn.net/shutterstock/videos/1052179024/thumb/1.jpg?ip=x480"
        case 'slay' : 
        endGameMessage = "You defeated the mighty Minotaur"
        endImgSrc = "https://tripanthropologist.com/wp-content/uploads/2021/02/mosaic-of-theseus-and-minotaur.jpg"
        break;
        case 'leave' :
        endGameMessage = "You left Theseus to fend for himself, and escaped the maze"
        endImgSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Theseus_and_the_Minotaur.gif/170px-Theseus_and_the_Minotaur.gif"
        break;
        default: endGameMessage = "ok how did you get here?" 
    }
    
    return (
        <div className="gameEnd">
            <h2>{endGameMessage}</h2>
            <Link to="/">Return to Main Menu</Link>  
            <img src= {endImgSrc} />
            {/* <Link to="/play">Go to a new Labyrinth</Link> */}
            <Link to="/memories">Reflect on your Journey</Link>  
        </div>
    )
}
export default GameEnd